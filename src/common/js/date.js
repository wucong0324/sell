/**
 * Created by thinkpad on 2017/5/20.
 */
export function formatDate(date,fmt) {
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length))
    }
    var o = {
        'M+': date.getMonth()+1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for(var key in o){
        if(new RegExp('('+ key + ')').test(fmt)){
            var str = o[key]+'';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : reset(str));
        }
    }
    return fmt
}

function reset(str) {
    return ('00'+str).substr(str.length)
}