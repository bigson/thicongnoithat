import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { resolve } from 'path'
import { createHtmlPlugin } from "vite-plugin-html"

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glob from 'glob'
import fs from 'fs'
import htmlPlugin from './build/htmlPlugin'

// var all = glob.sync('./src/(views|components)/**/*.scss'),
//     style = [],
//     head = []

// all.forEach(function(e, i){
//     console.log(e)
//     if(e.match((/.*\.head\.scss/))){
//         head.push(path.resolve(__dirname, e))
//     }else{
//         style.push(path.resolve(__dirname, e))
//     }
// })

// await fs.truncate('./src/assets/head.scss', 0, function(){console.log('head clear done')})
// await fs.appendFile('./src/assets/head.scss', head.map(e => {
//                                                                 let arr = e.split('src'),
//                                                                     fileName = arr.length == 2 ? arr[1] : arr.splice(1).join(',')
//                                                                 return `@import "@${fileName}"`
//                                                             }).join('\n'), () => {console.log('append done 1')});


// await fs.truncate('./src/assets/style.scss', 0, function(){console.log('style clear done')})
// await fs.appendFile('./src/assets/style.scss', style.map(e => {
//                                                                 let arr = e.split('src'),
//                                                                     fileName = arr.length == 2 ? arr[1] : arr.splice(1).join(',')
//                                                                 return `@import "@${fileName}"`
//                                                             }).join('\n'), () => {console.log('append done 2')});
// console.log(style.map(e => {
//                             let arr = e.split('src'),
//                                 fileName = arr.length == 2 ? arr[1] : arr.splice(1).join(',')
//                             return `@import "@${fileName}"`
//                         }).join('\n'))

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), htmlPlugin(), createHtmlPlugin ()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
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
