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

// const renderPage = createPageRenderer({ viteDevServer, isProduction, root })

server.get('*', async (req, res) => {

    const html = htmlEntryServer(req);

    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
        <script type="importmap">
          {
            "imports": {
              "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
          }
        </script>
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `);
});

// use vite's connect instance as middleware
server.use(vite.middlewares)
server.use('/static', express.static(path.resolve(__dirname, './public')));

server.listen(3000, () => {
  console.log('ready');
});