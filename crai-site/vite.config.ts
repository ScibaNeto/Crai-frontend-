import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { normalizarSiteUrl, ROTAS } from './src/lib/site.ts'

/** Produção de verdade: na Vercel/Netlify só o deploy de produção; fora delas, qualquer `vite build`. */
function ehProducao(mode: string): boolean {
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === 'production'
  if (process.env.CONTEXT) return process.env.CONTEXT === 'production'
  return mode === 'production'
}

function robotsTxt(siteUrl: string, indexar: boolean): string {
  // Preview/staging e dev: nada indexado.
  if (!indexar) return 'User-agent: *\nDisallow: /\n'
  // As rotas privadas não vão como Disallow: o Google não lê o `noindex` de uma URL bloqueada no robots
  // e podia indexá-las só pelo link (ex.: /painel no menu). Elas ficam de fora pelo `noindex` (lib/seo.ts).
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}

function sitemapXml(siteUrl: string): string {
  const hoje = new Date().toISOString().slice(0, 10)
  const urls = Object.entries(ROTAS)
    .filter(([, r]) => r.indexar)
    .map(
      ([caminho, r]) =>
        `  <url>\n    <loc>${siteUrl}${caminho === '/' ? '/' : caminho}</loc>\n    <lastmod>${hoje}</lastmod>\n` +
        `    <changefreq>${r.frequencia}</changefreq>\n    <priority>${r.prioridade?.toFixed(1)}</priority>\n  </url>\n`,
    )
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`
}

/** Troca %SITE_URL% no index.html (tags OG precisam de URL absoluta) e gera robots.txt e sitemap.xml. */
function seoEstatico(siteUrl: string, indexar: boolean): Plugin {
  return {
    name: 'crai-seo-estatico',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(robotsTxt(siteUrl, false))
        } else if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          res.end(sitemapXml(siteUrl))
        } else next()
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(siteUrl, indexar) })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(siteUrl) })
    },
  }
}

/** Pré-carrega o único subconjunto de Inter que o site usa em pt/en (latin): a fonte deixa de esperar o CSS. */
function preloadFonte(): Plugin {
  return {
    name: 'crai-preload-fonte',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const arquivo = Object.keys(ctx.bundle ?? {}).find((f) => /inter-latin-opsz-normal-[\w-]+\.woff2$/.test(f))
        if (!arquivo) return []
        return [{ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${arquivo}`, crossorigin: '' }, injectTo: 'head-prepend' }]
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const siteUrl = normalizarSiteUrl(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL)
  return {
    plugins: [react(), tailwindcss(), seoEstatico(siteUrl, command === 'build' && ehProducao(mode)), preloadFonte()],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|@remix-run|scheduler)[\\/]/, priority: 20 },
              { name: 'motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/, priority: 20 },
              { name: 'site', test: /src[\\/](components|lib|sections|data)[\\/]/, minShareCount: 3, priority: 10 },
            ],
          },
        },
      },
    },
  }
})
