/**
 * Created by dllo on 17/8/9.
 */
var download = require('./download');
var fs = require('fs');

fs.readFile('./img.txt', 'utf-8', function (error, data) {
    var array = data.split(',');
    var arrImg = [];
    array.forEach(function (item, index) {
        var a = item.replace('url(', '').replace(')','');
        download(a,'dounjdImg', 'douban' + index + '.jpg');



    })
})
fs.readFile('./.dounjdImg', 'utf-8', function (error, data) {
    var array = data.split(',');
    array.forEach(function (item, index) {
        console.log(item);
        
        download(item,'dounjdImg', 'jd' + index + '.jpg');



    })
})