export default () => {
    return {
        name: 'html-transform',
        transformIndexHtml: async function(html, {bundle}){
            // console.log(context, process.argv)

            // html = html.replace(
            //             /<title>(.*?)<\/title>/,
            //             `<title>bigson</title>`)

            // Nếu mà build thì mới gắn CSS vào file index
            if(process.argv.includes('build')){
                let bundles = Object.values(bundle),
                head = bundles.find(x => x.name == 'src/assets/head.scss')
                if(head){
                    // let css = await fs.readFile(path.resolve(__dirname, 'dist/assets/'), 'utf8')
                    html = html.replace(
                      '</head>',
                      `<style>\t${head.source}\t\t</style>\n</head>`
                    )
                }
            }

            return html
        }
    }
}