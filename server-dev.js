import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { renderToString } from 'vue/server-renderer'
// import { createPageRenderer } from 'vite-plugin-ssr'
import * as vite from 'vite'
import vue from '@vitejs/plugin-vue'
// import htmlEntryServer from './src/entry-server.js'

const server = express();
const PORT   = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const isProduction = process.env.NODE_ENV === 'production'

let root = process.cwd(),
    viteDevServer = await vite.createServer({
            // root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: true,
                watch: {
                    // During tests we edit the files too fast and sometimes chokidar
                    // misses change events, so enforce polling for consistency
                    usePolling: true,
                    interval: 100
                },
                // hmr: {
                //     port: hmrPort
                // }
            },
            appType: 'custom',
            publicDir : false
        })

// const renderPage = createPageRenderer({ viteDevServer, isProduction, root })

// use vite's connect instance as middleware
server.use(viteDevServer.middlewares)
server.use('/public', express.static(path.resolve(__dirname, './public')));
server.use('/favicon.svg', express.static(path.resolve(__dirname, './public/favicon.svg')));

server.use('*', async (req, res) => {
    try {
        const url = req.originalUrl
        // always read fresh template in dev
        let template = fs.readFileSync(path.resolve(__dirname, './src/index.template.html'), 'utf-8'),
            context = {
                req,
                url   : `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                title : '',
                meta  : ''
            }

        template = await viteDevServer.transformIndexHtml(url, template)

        const entryServer = await viteDevServer.ssrLoadModule('/src/entry-server.js')
        const appHtml = await entryServer.render(context)

        let html = template.replace(`<!--app-html-->`, appHtml)

        if(context.pinia){
            html = html.replace('</body>', `<script>window.__pinia=${context.pinia}</script>`)
        }

        if(context.title){
            html = html.replace('{{ title }}', context.title)
        }

        if(context.meta){
            html = html.replace('<!--meta-->', context.meta)
        }

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

    } catch (e) {
        // vite && vite.ssrFixStacktrace(e)
        console.log(e)
        res.status(500).end(e.stack)
    }
});


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})