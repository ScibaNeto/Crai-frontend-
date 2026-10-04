-- =====================================================================
-- CRAI — Reforço de segurança do cadastro (04/10/2026)
-- Não muda nenhum fluxo do site; só fecha o que estava mais aberto que o necessário.
-- =====================================================================

-- 1. Privilégios de tabela que o app não usa.
--    O padrão do Supabase dá TRUNCATE/TRIGGER/REFERENCES ao usuário logado; a migration
--    inicial só tinha tirado INSERT/UPDATE/DELETE.
revoke truncate, trigger, references
  on public.perfis, public.empresas, public.membros_empresa, public.convites
  from authenticated;

-- 2. Convites: o usuário só informa empresa, e-mail e papel.
--    Antes dava para inserir escolhendo o próprio token, a validade e os campos de aceite.
revoke insert on public.convites from authenticated;
grant insert (empresa_id, email, papel, convidado_por) on public.convites to authenticated;

-- 3. Formato dos campos de texto livre que podem virar link ou destinatário de e-mail.
--    Sem isto, um "site" como javascript:... ficaria gravado e viraria XSS no dia em que
--    alguma tela o exibisse como link.
alter table public.empresas
  add constraint empresas_site_check check (
    site is null or (
      char_length(site) <= 255
      and site !~ '[\s<>"'']'
      and site !~* '^(javascript|data|vbscript):'
    )
  );

alter table public.empresas
  add constraint empresas_email_financeiro_check check (
    email_financeiro is null or (
      char_length(email_financeiro::text) <= 254
      and email_financeiro::text ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
    )
  );

alter table public.perfis
  add constraint perfis_avatar_url_check check (
    avatar_url is null or (
      char_length(avatar_url) <= 500
      and avatar_url ~* '^https://[^\s<>"'']+$'
    )
  );

alter table public.convites
  add constraint convites_email_check check (
    char_length(email::text) <= 254
    and email::text ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
  );

-- 4. Aceites (LGPD): a data é a do servidor e o aceite de Termos/Privacidade não pode ser
--    apagado nem retrodatado pelo próprio usuário. O aceite de comunicação pode ser revogado
--    (null) e refeito. Vale só para o usuário logado; o backend (service_role) não é afetado.
create or replace function private.proteger_aceites()
returns trigger language plpgsql set search_path = '' as $$
begin
  if coalesce((select auth.role()), '') <> 'authenticated' then
    return new;
  end if;

  if old.aceite_termos_em is not null then
    new.aceite_termos_em := old.aceite_termos_em;
  elsif new.aceite_termos_em is not null then
    new.aceite_termos_em := now();
  end if;

  if old.aceite_privacidade_em is not null then
    new.aceite_privacidade_em := old.aceite_privacidade_em;
  elsif new.aceite_privacidade_em is not null then
    new.aceite_privacidade_em := now();
  end if;

  if new.aceite_comunicacao_em is not null then
    new.aceite_comunicacao_em := coalesce(old.aceite_comunicacao_em, now());
  end if;

  return new;
end;
$$;
revoke all on function private.proteger_aceites() from public, anon, authenticated;

create trigger perfis_proteger_aceites before update on public.perfis
  for each row execute function private.proteger_aceites();

-- 5. criar_empresa: no máximo 3 empresas criadas por usuário.
--    O fluxo do site cria 1. Sem limite, uma única conta podia registrar CNPJs válidos em
--    massa e bloquear o cadastro das empresas verdadeiras ("CNPJ já cadastrado").
create or replace function public.criar_empresa(
  p_razao_social        text,
  p_cnpj                text,
  p_nome_fantasia       text              default null,
  p_segmento            text              default null,
  p_faixa_mrr           public.faixa_mrr  default null,
  p_qtd_clientes_ativos integer           default null,
  p_site                text              default null,
  p_email_financeiro    text              default null,
  p_plano               public.plano_crai default 'standard',
  p_inicio_previsto     date              default null
)
returns public.empresas language plpgsql security definer set search_path = '' as $$
declare
  v_uid     uuid := auth.uid();
  v_empresa public.empresas;
begin
  if v_uid is null then
    raise exception 'Usuário não autenticado' using errcode = '28000';
  end if;
  if not public.cnpj_valido(p_cnpj) then
    raise exception 'CNPJ inválido' using errcode = '22023';
  end if;
  if (select count(*) from public.empresas e where e.criado_por = v_uid) >= 3 then
    raise exception 'Limite de empresas por usuário atingido. Fale com a CRAI.' using errcode = 'P0001';
  end if;

  begin
    insert into public.empresas (razao_social, cnpj, nome_fantasia, segmento, faixa_mrr,
                                 qtd_clientes_ativos, site, email_financeiro, plano,
                                 inicio_previsto, criado_por)
    values (p_razao_social, p_cnpj, nullif(p_nome_fantasia, ''), nullif(p_segmento, ''), p_faixa_mrr,
            p_qtd_clientes_ativos, nullif(p_site, ''), nullif(p_email_financeiro, ''),
            coalesce(p_plano, 'standard'), p_inicio_previsto, v_uid)
    returning * into v_empresa;
  exception when unique_violation then
    raise exception 'Já existe uma empresa cadastrada com este CNPJ' using errcode = '23505';
  end;

  insert into public.membros_empresa (empresa_id, usuario_id, papel)
  values (v_empresa.id, v_uid, 'owner');

  update public.perfis set empresa_ativa_id = v_empresa.id where id = v_uid;

  return v_empresa;
end;
$$;

revoke execute on function public.criar_empresa(text, text, text, text, public.faixa_mrr, integer, text, text, public.plano_crai, date) from public, anon;
grant  execute on function public.criar_empresa(text, text, text, text, public.faixa_mrr, integer, text, text, public.plano_crai, date) to authenticated;
