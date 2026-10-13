-- =====================================================================
-- CRAI — A assinatura no token, com uma chave para exigi-la (10/10/2026)
--
-- Até o lançamento (início de 2027), o dashboard (/app) abre para quem fez login e cadastrou a
-- empresa, sem pagamento: o plano escolhido no cadastro decide o que aparece. No lançamento, a
-- chave `assinatura_obrigatoria` é ligada, e só empresa com `status = 'ativa'` entra.
--
-- O que muda:
--   • tabela `config_plataforma`, com a chave `assinatura_obrigatoria` (começa desligada). Só o
--     banco e o hook leem; o site e os usuários não leem nem gravam;
--   • o token ganha a claim `assinatura`:
--       - `dispensada`: a chave está desligada (como até o lançamento);
--       - `ativa`: a chave está ligada e a empresa tem `status = 'ativa'`;
--       - `pendente`: a chave está ligada e a empresa ainda não está ativa.
--     O backend responde 403 `assinatura_pendente` para `pendente`, e o site manda a pessoa para
--     a página de pagamento.
--
-- Aplicada no projeto em 10/10/2026 (versão 20261010030011).
--
-- Para ligar no lançamento:
--   update public.config_plataforma set valor = 'true'::jsonb, atualizado_em = now()
--    where chave = 'assinatura_obrigatoria';
-- Quem já estava logado recebe a claim nova quando o token renova (até 1 hora) ou no próximo login.
-- =====================================================================

create table if not exists public.config_plataforma (
  chave         text primary key,
  valor         jsonb not null,
  atualizado_em timestamptz not null default now()
);

alter table public.config_plataforma enable row level security;
revoke all on public.config_plataforma from anon, authenticated;

insert into public.config_plataforma (chave, valor)
values ('assinatura_obrigatoria', 'false'::jsonb)
on conflict (chave) do nothing;

-- O hook roda como supabase_auth_admin: precisa ler a chave e o status da empresa.
grant select on public.config_plataforma to supabase_auth_admin;
create policy "config_plataforma: leitura do auth hook" on public.config_plataforma
  for select to supabase_auth_admin using (true);
grant select (status) on public.empresas to supabase_auth_admin;

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb language plpgsql stable set search_path = '' as $$
declare
  v_claims      jsonb := coalesce(event -> 'claims', '{}'::jsonb);
  v_empresa     uuid;
  v_papel       public.papel_membro;
  v_plano       public.plano_crai;
  v_status      public.status_empresa;
  v_obrigatoria boolean;
begin
  select p.empresa_ativa_id, m.papel, e.plano, e.status
    into v_empresa, v_papel, v_plano, v_status
    from public.perfis p
    join public.membros_empresa m
      on m.empresa_id = p.empresa_ativa_id and m.usuario_id = p.id
    join public.empresas e
      on e.id = p.empresa_ativa_id
   where p.id = (event ->> 'user_id')::uuid;

  select coalesce((c.valor)::text = 'true', false)
    into v_obrigatoria
    from public.config_plataforma c
   where c.chave = 'assinatura_obrigatoria';

  if v_empresa is not null then
    v_claims := v_claims || jsonb_build_object(
      'empresa_id', v_empresa,
      -- O backend da CRAI lê a empresa em tenant_id (mesmo valor de empresa_id).
      'tenant_id',  v_empresa,
      'papel',      v_papel,
      -- O backend chama o plano básico de "essencial"; o site, de "standard".
      'plano',      case when v_plano = 'premium' then 'premium' else 'essencial' end,
      'assinatura', case
                      when not coalesce(v_obrigatoria, false) then 'dispensada'
                      when v_status = 'ativa' then 'ativa'
                      else 'pendente'
                    end);
  else
    v_claims := v_claims - 'empresa_id' - 'tenant_id' - 'papel' - 'plano' - 'assinatura';
  end if;

  return jsonb_set(event, '{claims}', v_claims);
end;
$$;

-- Para desfazer (volta ao hook de 06/10, sem a claim `assinatura`):
--   1. recrie a função como está em 20261006224158_crai_token_tenant_plano.sql;
--   2. drop policy "config_plataforma: leitura do auth hook" on public.config_plataforma;
--   3. revoke select (status) on public.empresas from supabase_auth_admin;
--   4. drop table public.config_plataforma;
