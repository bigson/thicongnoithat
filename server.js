import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { renderToString } from 'vue/server-renderer'
// import { createPageRenderer } from 'vite-plugin-ssr'
import * as vite from 'vite'

const server = express();
const PORT   = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

export async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === 'production',
    hmrPort
) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const resolve = (p) => path.resolve(__dirname, p)

    const indexProd = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    // const manifest = (await import('./dist/client/ssr-manifest.json')).default
    const cssHead = fs.readFileSync(resolve('dist/client/assets/head.css'), 'utf-8')
    // const cssStyle = fs.readFileSync(resolve('dist/client/assets/style.css'), 'utf-8')
    const styleUrl = '/assets/style.css'

    const app = express()

    server.use('/public', express.static(resolve('dist/client')));
    server.use('/favicon.svg', express.static(resolve('dist/favicon.svg')));
    app.use((await import('compression')).default())
    app.use(
      '/',
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    )

    app.use('*', async (req, res, next) => {
        try {
            let url      = req.originalUrl,
                template = indexProd,
                context  = {
                            req,
                            url   : `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                            title : '',
                            meta  : ''
                        },
                render = (await import('./dist/server/entry-server.js')).render,
                appHtml = await render(context)

            let html = template.replace(`<!--app-html-->`, appHtml)

            if(context.pinia){
                html = html.replace('</body>', `<script>window.__pinia=${context.pinia}</script>`)
            }

            if(context.title){
                html = html.replace('{{ title }}', context.title)
            }

            if(context.meta){
                html = html.replace('{{meta}}', context.meta)
            }

            html = html.replace('{{style_head}}', '<style>' + cssHead + '</style>')
            html = html.replace('{{style}}', `<link rel="stylesheet" href="${styleUrl}">`)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            vite && vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}

createServer().then(({ app }) =>
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
)