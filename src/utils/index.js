/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {
                    [key]: {}
                });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {
                    [key]: source[key]
                });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

export function generateNewsContent(html){
    let getHead     = /<h(\d)([^\>]+)*\>(((?!\<\/h).)+)<\/h\d>(((?!\<h).)*)/g, // /<h(\d)([^\>]+)\>(((?!\<\/h).)+)/g,
        getText     = /<\/?((?!\/?>).)+>/g,
        getTeaser   = /((?!\<h\d).)+/,
        list        = [],
        preList     = {},
        tOC         = [],
        teaser      = '',
        description = [],
        m

    teaser = getTeaser.exec(html)
    if(teaser){
        teaser = getTextFromHtml(teaser[0])
    }else{
        teaser = ''
    }

    while((m = getHead.exec(html))){
        let h       = m[1],
            attrs   = m[2],
            text    = m[3],
            next    = m[5],
            v       = getTextFromHtml(text),
            hash    = createlinkHash(v),
            htag    = '<h' + h + ' id="' + hash + '" ' + attrs + '>'
                        + text
                        + '</h' + h + '>',
            childs  = next.split(/(\<img [^>]+>)/)

        childs = childs.map(x => {
            if(x.startsWith('<img')){
                let miMatch   = x.match(/(\w+)\=\"([^\"]+)\"/g),
                    imgTag    = {}

                if(!miMatch){
                    return x
                }

                let map   = miMatch.forEach(y => {
                        let param = y.replace(/\"/g, ''),
                            s     = param.split('='),
                            nameMatch = ''

                        if(s[0] == 'src' && s[1].startsWith('https://cdn.vatgia.vn/')){
                            // nếu mà từ cdn vật giá thì add name
                            if(nameMatch = s[1].match(/\d+\-\w\w\w\.\w{3,4}/)){
                                imgTag.name = nameMatch[0]
                            }
                        }

                        imgTag[s[0]] = s[1]
                    })

                return imgTag
            }

            return x
        })

        list.push({h: h, value : v, href : hash})
        description = description.concat([htag], childs)
    }

    if(list.length){
        for(let i = 0; i < list.length; i++){
            let e       = Object.assign({}, list[i]),
                root    = tOC[tOC.length - 1]

            if(e.h == 2){
                e.h3 = []
                tOC.push(e)
                continue
            }

            for(let j = 3; j <= e.h-1; j++){
                // console.log('root, rooth', root, root['h'+j])
                if(!root['h'+j]){
                    root['h'+j] = []
                    break
                }
                root = root['h' + j][root['h' + j].length-1]
            }
            // console.log('root,e', root, e)
            root['h' + e.h].push(e)
        }
    }

    return [teaser, tOC, description]
}

function createTOC(list, item){

}

export function getTextFromHtml(html){
    return html.replace(/<\/?((?!\/?>).)+>/g, '')
}

export function createlinkHash(text){
    text = removeAccent(text)
    text = text.replace(/[\W|\s]+/g, '_')

    return text
}

export function removeAccent(text){
    text = text.toLocaleLowerCase()
    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    text = text.replace(/đ/g, "d")

    return text
}

/**
 * Tạo url ảnh từ tên ảnh
 * @param  {[type]}  name [description]
 * @param  {Boolean} size [description]
 * @return {[type]}       [description]
 */
export function pictureSource(name, size = false){
    let time
    if(time = /^\d+/.exec(name)){
        let tz      = 25200000, // 7 * 60 * 60 * 1000
            date    = new Date(time * 1000 + tz)

        if(size){
            // 100x100
            // 100
            // w100
            // h100
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

/**
 * Create new object from exist object with deep direct
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export function clone(obj) {
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    if (obj instanceof Date)
        var temp = new obj.constructor(); //or new Date(obj);
    else
        var temp = obj.constructor();

    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }
    return temp;
}

/**
 * [intToRGB(hashCode(''))]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function colorFromText(text){
    return intToHex(hashCode(text))
}

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToHex(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

/**
 * [niceColor description]
 * @param  {[type]} clr [description]
 * @return {[type]}     [description]
 */
export function niceColor(clr) {

    let hsl, type, color
    if(/^rgb/.test(clr)){
        hsl  = rgb2hsl(clr)
        type = 'rgb'
    }else if(/^#/.test(clr)){
        hsl  = Object.values(hexToHSL(clr))
        type = 'hex'
    }else if(/^hsl/.test(clr)){
        hsl  = clr.substring(4, clr.length-1).replace(/ /g, '').split(',')
        type = 'hsl'
    }else{
        return false
    }

    hsl[0] = (hsl[0]+0.5) % 1;
    hsl[1] = (hsl[1]+0.5) % 1;
    hsl[2] = (hsl[2]+0.5) % 1;

    color = 'hsl('+(hsl[0]*360)+','+(hsl[1]*100)+'%,'+(hsl[2]*100)+'%)';

    switch(type){
        case 'rgb':
            return hsl2Rgb(color)
            break;
        case 'hex':
            return hsl2Hex(color)
            break;
        case 'hsl':
            return color
            break;
    }
}
// random borrowed from https://codepen.io/rhymes/pen/VXJabv
function randomColorVal() {
    // Should be 0 to 255 inclusive
    return Math.floor((Math.random() * 256));
}
function toHex(intVal) {
    let hex = intVal.toString(16);
    if (hex.length === 1){
      hex = '0' + hex;
    }
    return hex;
}
function hexFromInts(r, g, b){
    return '#' + toHex(r) + toHex(g) + toHex(b);
}
function randomHex() {
    let r = randomColorVal();
    let g = randomColorVal();
    let b = randomColorVal();
    return hexFromInts(r, g, b);
}

function rgb2hsl(clr) {
    let rgb = clr.substring(4, clr.length-1).replace(/ /g, '').split(',');
    return rgbToHsl(rgb[0],rgb[1],rgb[2]);
}

// https://gist.github.com/mjackson/5311256
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [ h, s, l ];
}
function RGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
    r = "0" + r;
    if (g.length == 1)
    g = "0" + g;
    if (b.length == 1)
    b = "0" + b;

    return "#" + r + g + b;
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
        r      = parseInt(result[1], 16),
        g      = parseInt(result[2], 16),
        b      = parseInt(result[3], 16)

    // return `rgb(${r}, ${g}, ${b})`

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToHSL(hex) {
    let result  = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
        r       = parseInt(result[1], 16),
        g       = parseInt(result[2], 16),
        b       = parseInt(result[3], 16)

    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        h,
        s,
        l = (max + min) / 2

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    var HSL = new Object();
    HSL['h']=h;
    HSL['s']=s;
    HSL['l']=l;
    return HSL;
}

function hsl2Hex(hsl){
    let _hsl = hsl.substring(4, hsl.length-1).replace(/ /g, '').split(',')

    return hslToHex(_hsl[0], _hsl[1], _hsl[2])
}
function hslToHex(h, s, l) {
    h /= 360;

    if(s.endsWith('%')){
        s = s.replace('%', '') / 100
    }

    if(l.endsWith('%')){
        l = l.replace('%', '') / 100
    }

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hsl2Rgb (clr){
    let _hsl = hsl.substring(4, hsl.length-1).replace(/ /g, '').split(',')

    return hslToRgb(_hsl[0], _hsl[1], _hsl[2])
}

function hslToRgb (h, s, l) {

    var r, g, b, m, c, x

    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0

    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6

    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))

    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))

    if (h < 1) {
        r = c
        g = x
        b = 0
    } else if (h < 2) {
        r = x
        g = c
        b = 0
    } else if (h < 3) {
        r = 0
        g = c
        b = x
    } else if (h < 4) {
        r = 0
        g = x
        b = c
    } else if (h < 5) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }

    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return { r: r, g: g, b: b }

}
/*export function getPictureCDN(name, size = false){
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
}*/
