/**
 * Created by dllo on 17/8/9.
 */
var webpage = require('webpage');
var page = webpage.create();
var fs = require('fs');
phantom.outputEncoding = 'utf-8';


page.onConsoleMessage = function (msg, lineNum, sourceId) {
    console.log(msg);
}

page.open('https://www.jd.com/', function (status) {
    if (status === 'success') {
        console.log('加载成功');
        page.includeJs('https://unpkg.com/jquery@3.2.1/dist/jquery.js', function () {

            setTimeout(function () {

                var a = page.evaluate(function () {
                    var arr = [];
                    $('.sk_item_pic_lk img').each(function (index, element) {
                        console.log($(element).attr('src'));
                        arr.push( 'http:' +  $(element).attr('src'))
                    })
                    return   arr
                    
                })
                console.log(a);
                fs.write('.dounjdImg',a,'w');
                phantom.exit(0);


            }, 5000)



        })


    } else {
        console.log('加载失败')
    }

})