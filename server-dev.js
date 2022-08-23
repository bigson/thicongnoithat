import express from 'express'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './src/app.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const server = express();
const PORT   = 3000

let root = process.cwd(),
	vite = await (await import('vite'))
		.createServer({
            base: '/test/',
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

server.get('/', (req, res) => {
  const app = createApp();

  renderToString(app).then((html) => {
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
});

// use vite's connect instance as middleware
server.use(vite.middlewares)
server.use('/static', express.static(path.resolve(__dirname, './public')));

server.listen(3000, () => {
  console.log('ready');
});