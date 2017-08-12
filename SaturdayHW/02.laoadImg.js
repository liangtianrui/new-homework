/**
 * Created by dllo on 17/8/11.
 */
var fs = require('fs');
var download = require('./download');


fs.readFile('./05.contentImg.txt','utf-8',function (error,data) {
    var arr  = data.split(',');
    arr.forEach(function (item,index) {
        download(item,'mainImg',index + '.jpg')
    })


})

