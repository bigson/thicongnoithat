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
