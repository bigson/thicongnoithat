import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { renderToString } from 'vue/server-renderer'
// import { createPageRenderer } from 'vite-plugin-ssr'
import * as vite from 'vite'
import htmlEntryServer from './src/entry-server.js'

const server = express();
const PORT   = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const isProduction = process.env.NODE_ENV === 'production'

let root = process.cwd(),
    indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : '',
    manifest = isProd ? /*// @ts-ignore*/ (await import('./dist/client/ssr-manifest.json')).default : {}
    viteDevServer = await vite.createServer({
            // base: '/test/',
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, '/src'),
                },
            },
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: 'ssr',
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
            appType: 'custom'
        })

/**
 * @type {import('vite').ViteDevServer}
 */
    let vite
    if (!isProd) {
        vite = await (
            await import('vite')
        ).createServer({
            root,
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
            appType: 'custom'
        })
        // use vite's connect instance as middleware
        app.use(vite.middlewares)
    } else {
        app.use((await import('compression')).default())
        app.use(
            (await import('serve-static'))
                .default(resolve('dist/client'), {
                                                    index: false
                                                })
        )
    }

server.get('*', async (req, res) => {
try {
      const url = req.originalUrl.replace('/test/', '/')

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('./dist/server/entry-server.js')).render
      }

      const [appHtml, preloadLinks] = await render(url, manifest)

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
});

// use vite's connect instance as middleware
server.use(vite.middlewares)
server.use('/static', express.static(path.resolve(__dirname, './public')));

server.listen(3000, () => {
  console.log('ready');
});