-- =====================================================================
-- CRAI — O token de login passa a levar tenant_id e plano (06/10/2026)
-- Integração com o backend da CRAI (FastAPI). Não remove nada: empresa_id e papel continuam
-- no token, e nenhum fluxo do site muda.
--
-- Por quê:
--   • o backend lê a empresa em `tenant_id` (mesmo valor de `empresa_id`); sem essa claim ele
--     recusa o token com 401 `sem_tenant`;
--   • o backend lê o plano em `plano`, com o vocabulário dele: `essencial` (o `standard` do site)
--     ou `premium`. Sem a claim, toda empresa seria tratada como plano básico.
--
-- Aplicada no projeto em 06/10/2026 (versão 20261006224158). Quem já estava logado só recebe as
-- claims novas quando o token renova ou no próximo login.
-- =====================================================================

-- O hook não roda como dono do banco: para ler o plano, ele precisa de permissão e de política de
-- leitura em `empresas`, como já tem em `perfis` e em `membros_empresa`. Só as duas colunas que usa.
grant select (id, plano) on public.empresas to supabase_auth_admin;

create policy "empresas: leitura do auth hook" on public.empresas
  for select to supabase_auth_admin using (true);

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb language plpgsql stable set search_path = '' as $$
declare
  v_claims  jsonb := coalesce(event -> 'claims', '{}'::jsonb);
  v_empresa uuid;
  v_papel   public.papel_membro;
  v_plano   public.plano_crai;
begin
  select p.empresa_ativa_id, m.papel, e.plano
    into v_empresa, v_papel, v_plano
    from public.perfis p
    join public.membros_empresa m
      on m.empresa_id = p.empresa_ativa_id and m.usuario_id = p.id
    join public.empresas e
      on e.id = p.empresa_ativa_id
   where p.id = (event ->> 'user_id')::uuid;

  if v_empresa is not null then
    v_claims := v_claims || jsonb_build_object(
      'empresa_id', v_empresa,
      -- O backend da CRAI lê a empresa em tenant_id (mesmo valor de empresa_id).
      'tenant_id',  v_empresa,
      'papel',      v_papel,
      -- O backend chama o plano básico de "essencial"; o site, de "standard".
      'plano',      case when v_plano = 'premium' then 'premium' else 'essencial' end);
  else
    v_claims := v_claims - 'empresa_id' - 'tenant_id' - 'papel' - 'plano';
  end if;

  return jsonb_set(event, '{claims}', v_claims);
end;
$$;

-- Para desfazer (volta ao hook de 24/09, sem tenant_id nem plano):
--   1. recrie a função como está em 20260924000000_crai_cadastro.sql;
--   2. drop policy "empresas: leitura do auth hook" on public.empresas;
--   3. revoke select (id, plano) on public.empresas from supabase_auth_admin;
