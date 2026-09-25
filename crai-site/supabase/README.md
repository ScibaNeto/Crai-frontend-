# Banco de dados (Supabase)

Projeto Supabase: **CRAI** (`pbpphsnwlfsstoqdeuhr`)

---

## 1. Tabelas

| Tabela | O que guarda |
|---|---|
| `perfis` | Uma linha por usuário, criada **automaticamente** no cadastro. Nome, e-mail, telefone, cargo, aceite dos termos e da privacidade (LGPD) e a empresa ativa (`empresa_ativa_id`). |
| `empresas` | A empresa cliente: razão social, CNPJ (aceita o novo formato alfanumérico), segmento, faixa de MRR, nº de clientes, `plano` (`standard` / `premium`) e `status` (`onboarding` / `ativa` / `suspensa` / `cancelada`). |
| `membros_empresa` | Quem faz parte de qual empresa, com papel `owner`, `admin` ou `membro`. |
| `convites` | Convite por e-mail, com token, papel e validade de 7 dias. |

O SQL completo está em [`migrations/`](migrations/).

## 2. Quem pode ver e mexer em quê (RLS)

- Visitante não logado: **não vê nada**.
- **Perfis:** cada um vê o próprio e os de quem está na mesma empresa.
- **Empresa:** membros veem; `owner` e `admin` editam os dados cadastrais.
  `plano`, `status` e `cnpj` **só mudam pelo backend** (chave `service_role`).
- **Membros:** só o `owner` muda papéis. O `owner` remove qualquer um, o `admin` remove `membro`, e qualquer um pode sair.
  A empresa nunca fica sem `owner` (o banco bloqueia).
- **Convites:** só `owner` / `admin` veem, criam, revogam e apagam. Só aceita quem estiver logado com o e-mail convidado.

## 3. Fluxo de cadastro

O site faz isso em `src/lib/cadastro.ts`. Resumo:

```ts
// 1. Cria a conta. O perfil nasce sozinho.
await supabase.auth.signUp({ email, password, options: { data: { nome_completo: 'Ana Souza' } } })

// 2. Cria a empresa. Quem chamou vira owner e ela vira a empresa ativa.
await supabase.rpc('criar_empresa', {
  p_razao_social: 'Exemplo SaaS Ltda',
  p_cnpj: '11.222.333/0001-81',   // pode vir com máscara
  p_segmento: 'educacional',
  p_faixa_mrr: '25k_75k',
  p_qtd_clientes_ativos: 800,
})

// 3. Renova o token para ele trazer a empresa (empresa_id e papel).
await supabase.auth.refreshSession()
```

Convites (ainda sem tela no site):

```ts
await supabase.from('convites').insert({ empresa_id, email: 'bruno@exemplo.com', papel: 'admin', convidado_por: user.id })
await supabase.rpc('aceitar_convite', { p_token: tokenDoLink })   // o convidado, logado com o mesmo e-mail
```

**Valores aceitos**

| Campo | Valores |
|---|---|
| Segmento | `gestao_clinicas`, `gestao_financeira`, `educacional`, `varejo`, `outro` |
| Faixa de MRR | `ate_25k`, `25k_75k`, `75k_200k`, `200k_500k`, `acima_500k` |
| Telefone | formato internacional: `+55…` |

## 4. Token de login (JWT)

Todo token de login traz `empresa_id` e `papel` da empresa ativa. Quem coloca esses dados no token é a função
`public.custom_access_token_hook`. O backend (FastAPI) lê a empresa direto do token.

> Se o backend esperar outro nome (ex.: `tenant_id`), basta trocar a chave dentro dessa função.

## 5. Configuração no painel do Supabase

Feita em 24/09/2026:

| Onde | O que está configurado |
|---|---|
| Authentication → Hooks → Customize Access Token | `public.custom_access_token_hook` **ativo** |
| Authentication → URL Configuration | Site URL `http://localhost:5173` · Redirect URL `http://localhost:5173/**` |
| Authentication → Providers → Email | Confirmação de e-mail **desligada** durante o beta |

⚠️ **Antes de abrir para clientes:**

1. Adicionar o domínio publicado em Site URL e Redirect URLs.
2. Configurar um SMTP próprio e **religar a confirmação de e-mail**. O e-mail padrão do Supabase só entrega para
   membros da organização e tem limite baixo por hora.

## 6. Mudou o banco?

1. Crie uma nova migration em `migrations/` (nunca edite uma que já foi aplicada).
2. Aplique no projeto.
3. Regenere os tipos em `src/lib/database.types.ts`:
   ```bash
   npx supabase gen types typescript --project-id pbpphsnwlfsstoqdeuhr > src/lib/database.types.ts
   ```

## 7. Testes já feitos

Todos com dados de teste apagados depois.

- ✔ Perfil criado no cadastro
- ✔ Criar empresa torna o usuário `owner`
- ✔ CNPJ duplicado ou inválido é recusado
- ✔ Usuário de outra empresa não vê nem edita
- ✔ Convite só aceito pelo e-mail certo
- ✔ `admin` não muda o plano nem se promove a `owner`
- ✔ Último `owner` não consegue sair
- ✔ Visitante não logado bloqueado
- ✔ Token sai com `empresa_id` e `papel`
- ✔ Ponta a ponta pelo site (localhost): usuário, perfil, empresa e vínculo gravados

## 8. Próximos passos

- Painel com números reais (hoje só nome e plano são reais).
- Cobrança real no `/pagamento` (hoje simulada, sem provedor de pagamento).
- Tela para convidar membros da equipe.
- Backend FastAPI validando o token e usando `empresa_id` como tenant.
