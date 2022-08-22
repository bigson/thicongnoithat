import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glob from 'glob'
import fs from 'fs'
import htmlPlugin from './build/htmlPlugin'

var all = glob.sync('./src/**/*.scss'),
    style = [],
    head = []

all.forEach(function(e, i){
    // console.log(e)
    if(e.match((/.*\.head\.scss/))){
        head.push(path.resolve(__dirname, e))
    }else{
        style.push(path.resolve(__dirname, e))
    }
})


console.log(head, style)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), htmlPlugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        // manifest: true,
        // lib:{
        //   head : {
        //     entry : path.resolve(__dirname, "src/views/abc.head.scss"),
        //     fileName : 'head_css'
        //   },
        //   style : {
        //     entry: path.resolve(__dirname, "src/views/abc.scss"),
        //     fileName : 'style_css'
        //   }
        // },
        // rollupOptions: {
        //     input:{
        //         main: path.resolve(__dirname, 'index.html'),
        //         head_css: path.resolve(__dirname, "src/assets/head.scss"),
        //         style_css: path.resolve(__dirname, "src/assets/style.scss"),
        //     }
        // }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "@/assets/variables.scss";
                `
            }
        }
    },
})
