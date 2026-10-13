// Painel (/app): o tema escolhido é aplicado antes da primeira pintura, para a tela não piscar
// escura ao abrir no claro. A chave e os valores espelham src/painel/lib/tema.ts: a escolha
// feita no painel (localStorage, chave crai_tema) vale primeiro; sem ela, vale a que a pessoa
// fez no site nesta sessão (sessionStorage, chave crai:tema). O escuro é o padrão.
// Fica num arquivo (e não dentro do app/index.html) porque a política de segurança de
// conteúdo (CSP) do site proíbe scripts embutidos na página.
try {
  var guardado = localStorage.getItem('crai_tema')
  if (guardado !== 'claro' && guardado !== 'escuro') guardado = sessionStorage.getItem('crai:tema')
  if (guardado === 'claro') document.documentElement.setAttribute('data-tema', 'claro')
} catch (e) {}
