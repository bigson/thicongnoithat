const {pictureSource} = require('@/utils/index.js')

export default {
    methods : {
        pictureSource(name, size = false){
            return pictureSource(name, size)
        }
    }
}