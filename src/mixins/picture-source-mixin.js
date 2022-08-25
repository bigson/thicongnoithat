export default {
    methods : {
        pictureSource(name, size = false){
            let time
            if(time = /^\d+/.exec(name)){
                let tz      = 25200000, // 7 * 60 * 60 * 1000
                    date    = new Date(time * 1000 + tz)

                if(size){
                    return 'https://cdn.vatgia.vn/pictures/thumb'
                            + '/' + size
                            + '/' + date.getUTCFullYear() + '/' + ('0' + (date.getUTCMonth() + 1)).slice(-2)
                            + '/' + name;
                }
                return 'https://cdn.vatgia.vn/pictures/thicongtot'
                            + '/' + date.getUTCFullYear()
                            + '/' + ('0' + (date.getUTCMonth() + 1)).slice(-2)
                            + '/' + ('0' + date.getUTCDate()).slice(-2)
                            + '/' + name;
            }else{
                return name
            }
        }
    }
}