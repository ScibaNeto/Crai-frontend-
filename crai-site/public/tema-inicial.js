// Tema escolhido (claro/escuro): aplicado antes da primeira pintura, para a página não piscar no escuro.
// A chave e as cores espelham src/lib/tema.ts. Fica num arquivo (e não dentro do index.html) para a
// política de segurança de conteúdo (CSP) poder proibir scripts embutidos na página.
try {
  if (sessionStorage.getItem('crai:tema') === 'claro') {
    document.documentElement.dataset.theme = 'light'
    document.querySelector('meta[name="theme-color"]').content = '#FAF6EF'
  }
} catch (e) {}
