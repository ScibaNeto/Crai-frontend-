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
  const bloqueadas = Object.entries(ROTAS)
    .filter(([, r]) => !r.indexar)
    .map(([caminho]) => `Disallow: ${caminho}\n`)
    .join('')
  return `User-agent: *\nAllow: /\n${bloqueadas}\nSitemap: ${siteUrl}/sitemap.xml\n`
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

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const siteUrl = normalizarSiteUrl(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL)
  return {
    plugins: [react(), tailwindcss(), seoEstatico(siteUrl, command === 'build' && ehProducao(mode))],
  }
})
