-- =====================================================================
-- CRAI — Banco de cadastro (Supabase / Postgres 17)
-- Tabelas: perfis, empresas, membros_empresa, convites
-- Multi-tenant: cada empresa cliente é um tenant; RLS isola os dados.
-- =====================================================================

create extension if not exists citext with schema extensions;

-- Schema interno: funções auxiliares que NÃO ficam expostas na API REST
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

-- ---------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------
create type public.plano_crai     as enum ('standard', 'premium');
create type public.status_empresa as enum ('onboarding', 'ativa', 'suspensa', 'cancelada');
create type public.papel_membro   as enum ('owner', 'admin', 'membro');
create type public.status_convite as enum ('pendente', 'aceito', 'revogado');
create type public.faixa_mrr      as enum ('ate_25k', '25k_100k', '100k_250k', '250k_500k', 'acima_500k');

-- ---------------------------------------------------------------------
-- Utilitários
-- ---------------------------------------------------------------------
create or replace function private.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Valida CNPJ numérico e o novo CNPJ alfanumérico (Receita, a partir de jul/2026).
-- Cada caractere vale ascii(c) - 48, então dígitos continuam valendo 0..9.
create or replace function public.cnpj_valido(p_cnpj text)
returns boolean language plpgsql immutable set search_path = '' as $$
declare
  d      text := upper(regexp_replace(coalesce(p_cnpj, ''), '[^A-Za-z0-9]', '', 'g'));
  pesos1 int[] := array[5,4,3,2,9,8,7,6,5,4,3,2];
  pesos2 int[] := array[6,5,4,3,2,9,8,7,6,5,4,3,2];
  soma   int;
  dv     int;
  i      int;
begin
  if d !~ '^[A-Z0-9]{12}[0-9]{2}$' or d ~ '^(.)\1{13}$' then
    return false;
  end if;

  soma := 0;
  for i in 1..12 loop
    soma := soma + (ascii(substr(d, i, 1)) - 48) * pesos1[i];
  end loop;
  dv := case when soma % 11 < 2 then 0 else 11 - soma % 11 end;
  if dv <> substr(d, 13, 1)::int then
    return false;
  end if;

  soma := 0;
  for i in 1..13 loop
    soma := soma + (ascii(substr(d, i, 1)) - 48) * pesos2[i];
  end loop;
  dv := case when soma % 11 < 2 then 0 else 11 - soma % 11 end;
  return dv = substr(d, 14, 1)::int;
end;
$$;

-- ---------------------------------------------------------------------
-- Tabelas
-- ---------------------------------------------------------------------

-- Perfil do usuário (1:1 com auth.users, criado automaticamente no signup)
create table public.perfis (
  id                    uuid primary key references auth.users (id) on delete cascade,
  nome_completo         text not null default '' check (char_length(nome_completo) <= 150),
  email                 extensions.citext,
  telefone              text check (telefone is null or telefone ~ '^\+?[0-9]{10,15}$'),
  cargo                 text check (char_length(cargo) <= 100),
  avatar_url            text,
  empresa_ativa_id      uuid,
  aceite_termos_em      timestamptz,
  aceite_privacidade_em timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
comment on table public.perfis is 'Dados do usuário da plataforma CRAI (1:1 com auth.users).';
comment on column public.perfis.empresa_ativa_id is 'Empresa selecionada no momento; vai para o JWT como claim empresa_id.';

-- Empresa cliente da CRAI (tenant)
create table public.empresas (
  id                  uuid primary key default gen_random_uuid(),
  razao_social        text not null check (char_length(razao_social) between 2 and 200),
  nome_fantasia       text check (char_length(nome_fantasia) <= 200),
  cnpj                text not null unique
                        check (cnpj ~ '^[A-Z0-9]{12}[0-9]{2}$' and public.cnpj_valido(cnpj)),
  site                text,
  segmento            text check (char_length(segmento) <= 80),
  faixa_mrr           public.faixa_mrr,
  qtd_clientes_ativos integer check (qtd_clientes_ativos >= 0),
  email_financeiro    extensions.citext,
  plano               public.plano_crai     not null default 'standard',
  status              public.status_empresa not null default 'onboarding',
  criado_por          uuid references public.perfis (id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
comment on table public.empresas is 'Empresas SaaS clientes da CRAI (tenants). CNPJ salvo sem máscara.';
comment on column public.empresas.plano is 'Standard (recuperação) ou Premium (recuperação + retenção). Alterado só pelo backend.';

alter table public.perfis
  add constraint perfis_empresa_ativa_fk
  foreign key (empresa_ativa_id) references public.empresas (id) on delete set null;

-- Vínculo usuário <-> empresa com papel
create table public.membros_empresa (
  empresa_id uuid not null references public.empresas (id) on delete cascade,
  usuario_id uuid not null references public.perfis (id)   on delete cascade,
  papel      public.papel_membro not null default 'membro',
  created_at timestamptz not null default now(),
  primary key (empresa_id, usuario_id)
);
comment on table public.membros_empresa is 'Quem pertence a qual empresa e com qual papel (owner/admin/membro).';

-- Convites para entrar numa empresa
create table public.convites (
  id            uuid primary key default gen_random_uuid(),
  empresa_id    uuid not null references public.empresas (id) on delete cascade,
  email         extensions.citext not null,
  papel         public.papel_membro not null default 'membro' check (papel <> 'owner'),
  token         uuid not null unique default gen_random_uuid(),
  status        public.status_convite not null default 'pendente',
  convidado_por uuid references public.perfis (id) on delete set null,
  aceito_por    uuid references public.perfis (id) on delete set null,
  aceito_em     timestamptz,
  expira_em     timestamptz not null default now() + interval '7 days',
  created_at    timestamptz not null default now()
);
comment on table public.convites is 'Convites por e-mail; aceitos pela função aceitar_convite(token).';

-- Índices (FKs e consultas frequentes)
create index membros_empresa_usuario_idx on public.membros_empresa (usuario_id);
create index perfis_empresa_ativa_idx    on public.perfis (empresa_ativa_id);
create index empresas_criado_por_idx     on public.empresas (criado_por);
create index convites_empresa_idx        on public.convites (empresa_id);
create index convites_convidado_por_idx  on public.convites (convidado_por);
create index convites_aceito_por_idx     on public.convites (aceito_por);
create unique index convites_pendente_unico_idx
  on public.convites (empresa_id, email) where status = 'pendente';

-- ---------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------
create trigger perfis_updated_at   before update on public.perfis
  for each row execute function private.set_updated_at();
create trigger empresas_updated_at before update on public.empresas
  for each row execute function private.set_updated_at();

-- CNPJ sempre salvo sem máscara e em maiúsculas
create or replace function private.normalizar_cnpj()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.cnpj := upper(regexp_replace(coalesce(new.cnpj, ''), '[^A-Za-z0-9]', '', 'g'));
  return new;
end;
$$;
create trigger empresas_normalizar_cnpj before insert or update of cnpj on public.empresas
  for each row execute function private.normalizar_cnpj();

-- Signup: cria o perfil automaticamente
create or replace function private.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.perfis (id, email, nome_completo)
  values (
    new.id,
    new.email,
    left(coalesce(
      new.raw_user_meta_data ->> 'nome_completo',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      ''), 150)
  );
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function private.handle_new_user();

-- Troca de e-mail no Auth reflete no perfil
create or replace function private.handle_user_email_change()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  update public.perfis set email = new.email where id = new.id;
  return new;
end;
$$;
create trigger on_auth_user_email_changed after update of email on auth.users
  for each row when (old.email is distinct from new.email)
  execute function private.handle_user_email_change();

-- Toda empresa precisa manter pelo menos um owner
create or replace function private.garantir_owner()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if old.papel = 'owner'
     and (tg_op = 'DELETE' or new.papel <> 'owner')
     and exists (select 1 from public.empresas e where e.id = old.empresa_id)
     and exists (select 1 from public.perfis p where p.id = old.usuario_id)
     and not exists (
       select 1 from public.membros_empresa m
       where m.empresa_id = old.empresa_id and m.papel = 'owner' and m.usuario_id <> old.usuario_id)
  then
    raise exception 'A empresa precisa ter pelo menos um owner. Transfira a propriedade antes.'
      using errcode = 'P0001';
  end if;
  return coalesce(new, old);
end;
$$;
create trigger membros_garantir_owner before update of papel or delete on public.membros_empresa
  for each row execute function private.garantir_owner();

-- ---------------------------------------------------------------------
-- Funções auxiliares de autorização (security definer, fora da API)
-- ---------------------------------------------------------------------
create or replace function private.papel_em(p_empresa uuid)
returns public.papel_membro language sql stable security definer set search_path = '' as $$
  select m.papel from public.membros_empresa m
  where m.empresa_id = p_empresa and m.usuario_id = (select auth.uid());
$$;

create or replace function private.eh_membro(p_empresa uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.membros_empresa m
    where m.empresa_id = p_empresa and m.usuario_id = (select auth.uid()));
$$;

create or replace function private.eh_admin(p_empresa uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.membros_empresa m
    where m.empresa_id = p_empresa and m.usuario_id = (select auth.uid())
      and m.papel in ('owner', 'admin'));
$$;

create or replace function private.compartilha_empresa(p_usuario uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from public.membros_empresa eu
    join public.membros_empresa outro on outro.empresa_id = eu.empresa_id
    where eu.usuario_id = (select auth.uid()) and outro.usuario_id = p_usuario);
$$;

revoke all on all functions in schema private from public, anon;
grant execute on function private.papel_em(uuid), private.eh_membro(uuid),
  private.eh_admin(uuid), private.compartilha_empresa(uuid) to authenticated;

-- ---------------------------------------------------------------------
-- RPCs (chamadas pelo app via supabase.rpc)
-- ---------------------------------------------------------------------

-- Cria a empresa e torna o usuário logado owner dela
create or replace function public.criar_empresa(
  p_razao_social        text,
  p_cnpj                text,
  p_nome_fantasia       text             default null,
  p_segmento            text             default null,
  p_faixa_mrr           public.faixa_mrr default null,
  p_qtd_clientes_ativos integer          default null,
  p_site                text             default null,
  p_email_financeiro    text             default null
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

  begin
    insert into public.empresas (razao_social, cnpj, nome_fantasia, segmento, faixa_mrr,
                                 qtd_clientes_ativos, site, email_financeiro, criado_por)
    values (p_razao_social, p_cnpj, p_nome_fantasia, p_segmento, p_faixa_mrr,
            p_qtd_clientes_ativos, p_site, p_email_financeiro, v_uid)
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

-- Aceita um convite pelo token (o e-mail do usuário precisa bater com o convite)
create or replace function public.aceitar_convite(p_token uuid)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  v_uid     uuid := auth.uid();
  v_email   text;
  v_convite public.convites;
begin
  if v_uid is null then
    raise exception 'Usuário não autenticado' using errcode = '28000';
  end if;

  select * into v_convite from public.convites where token = p_token for update;
  if not found or v_convite.status <> 'pendente' then
    raise exception 'Convite inválido ou já utilizado' using errcode = 'P0002';
  end if;
  if v_convite.expira_em < now() then
    raise exception 'Convite expirado' using errcode = 'P0001';
  end if;

  select email into v_email from auth.users where id = v_uid;
  if v_email is null or lower(v_email) <> lower(v_convite.email::text) then
    raise exception 'Este convite foi enviado para outro e-mail' using errcode = '42501';
  end if;

  insert into public.membros_empresa (empresa_id, usuario_id, papel)
  values (v_convite.empresa_id, v_uid, v_convite.papel)
  on conflict (empresa_id, usuario_id) do nothing;

  update public.convites
     set status = 'aceito', aceito_por = v_uid, aceito_em = now()
   where id = v_convite.id;

  update public.perfis
     set empresa_ativa_id = coalesce(empresa_ativa_id, v_convite.empresa_id)
   where id = v_uid;

  return v_convite.empresa_id;
end;
$$;

revoke execute on function public.criar_empresa(text, text, text, text, public.faixa_mrr, integer, text, text),
                           public.aceitar_convite(uuid)
  from public, anon;
grant execute on function public.criar_empresa(text, text, text, text, public.faixa_mrr, integer, text, text),
                          public.aceitar_convite(uuid)
  to authenticated;

-- ---------------------------------------------------------------------
-- Custom Access Token Hook: coloca empresa_id e papel no JWT
-- (ativar em Authentication > Hooks no painel do Supabase)
-- ---------------------------------------------------------------------
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb language plpgsql stable set search_path = '' as $$
declare
  v_claims  jsonb := coalesce(event -> 'claims', '{}'::jsonb);
  v_empresa uuid;
  v_papel   public.papel_membro;
begin
  select p.empresa_ativa_id, m.papel
    into v_empresa, v_papel
    from public.perfis p
    join public.membros_empresa m
      on m.empresa_id = p.empresa_ativa_id and m.usuario_id = p.id
   where p.id = (event ->> 'user_id')::uuid;

  if v_empresa is not null then
    v_claims := v_claims || jsonb_build_object('empresa_id', v_empresa, 'papel', v_papel);
  else
    v_claims := v_claims - 'empresa_id' - 'papel';
  end if;

  return jsonb_set(event, '{claims}', v_claims);
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook(jsonb) from public, anon, authenticated;
grant select on public.perfis, public.membros_empresa to supabase_auth_admin;

-- ---------------------------------------------------------------------
-- Permissões e RLS
-- ---------------------------------------------------------------------
alter table public.perfis          enable row level security;
alter table public.empresas        enable row level security;
alter table public.membros_empresa enable row level security;
alter table public.convites        enable row level security;

-- Visitante anônimo não acessa nada do cadastro
revoke all on public.perfis, public.empresas, public.membros_empresa, public.convites from anon;

-- Colunas que o usuário pode alterar diretamente (o resto só via RPC ou backend/service_role)
revoke insert, update, delete on public.perfis from authenticated;
grant update (nome_completo, telefone, cargo, avatar_url, empresa_ativa_id,
              aceite_termos_em, aceite_privacidade_em) on public.perfis to authenticated;

revoke insert, update, delete on public.empresas from authenticated;
grant update (razao_social, nome_fantasia, site, segmento, faixa_mrr,
              qtd_clientes_ativos, email_financeiro) on public.empresas to authenticated;

revoke insert, update on public.membros_empresa from authenticated;
grant update (papel) on public.membros_empresa to authenticated;

revoke update on public.convites from authenticated;
grant update (status) on public.convites to authenticated;

-- perfis
create policy "perfis: ver o próprio e colegas de empresa" on public.perfis
  for select to authenticated
  using (id = (select auth.uid()) or private.compartilha_empresa(id));

create policy "perfis: editar o próprio" on public.perfis
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid())
              and (empresa_ativa_id is null or private.eh_membro(empresa_ativa_id)));

create policy "perfis: leitura do auth hook" on public.perfis
  for select to supabase_auth_admin using (true);

-- empresas
create policy "empresas: membros veem" on public.empresas
  for select to authenticated
  using (private.eh_membro(id));

create policy "empresas: owner/admin editam" on public.empresas
  for update to authenticated
  using (private.eh_admin(id))
  with check (private.eh_admin(id));

-- membros_empresa
create policy "membros: membros da empresa veem" on public.membros_empresa
  for select to authenticated
  using (private.eh_membro(empresa_id));

create policy "membros: owner altera papel" on public.membros_empresa
  for update to authenticated
  using (private.papel_em(empresa_id) = 'owner')
  with check (private.papel_em(empresa_id) = 'owner');

create policy "membros: sair, ou remover conforme papel" on public.membros_empresa
  for delete to authenticated
  using (
    usuario_id = (select auth.uid())
    or private.papel_em(empresa_id) = 'owner'
    or (private.papel_em(empresa_id) = 'admin' and papel = 'membro')
  );

create policy "membros: leitura do auth hook" on public.membros_empresa
  for select to supabase_auth_admin using (true);

-- convites
create policy "convites: owner/admin veem" on public.convites
  for select to authenticated
  using (private.eh_admin(empresa_id));

create policy "convites: owner/admin criam" on public.convites
  for insert to authenticated
  with check (private.eh_admin(empresa_id)
              and convidado_por = (select auth.uid())
              and status = 'pendente');

create policy "convites: owner/admin revogam" on public.convites
  for update to authenticated
  using (private.eh_admin(empresa_id) and status = 'pendente')
  with check (private.eh_admin(empresa_id) and status = 'revogado');

create policy "convites: owner/admin apagam" on public.convites
  for delete to authenticated
  using (private.eh_admin(empresa_id));

-- =====================================================================
-- Migration 2 — crai_cadastro_alinha_site
-- Alinha o banco ao formulário /cadastro do site
-- =====================================================================
alter type public.faixa_mrr rename value '25k_100k'  to '25k_75k';
alter type public.faixa_mrr rename value '100k_250k' to '75k_200k';
alter type public.faixa_mrr rename value '250k_500k' to '200k_500k';

alter table public.empresas add column inicio_previsto date;
alter table public.perfis add column aceite_comunicacao_em timestamptz;
grant update (aceite_comunicacao_em) on public.perfis to authenticated;

drop function public.criar_empresa(text, text, text, text, public.faixa_mrr, integer, text, text);

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
