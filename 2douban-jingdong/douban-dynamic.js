/**
 * Created by dllo on 17/8/9.
 */
var webpage = require('webpage');
var page = webpage.create();

phantom.outputEncoding = 'utf-8';


var fs = require('fs');

page.onConsoleMessage = function (msg, lineNum, sourceId) {
    console.log(msg);

}

page.open('https://www.douban.com/', function (status) {
    if (status === 'success') {
        console.log('加载成功');

        page.includeJs('https://unpkg.com/jquery@3.2.1/dist/jquery.js', function () {

            setTimeout(function () {
                var a = page.evaluate(function () {
                    var arr = [];
                    $('.video-rushi .video-cover>a').each(function (index, element) {
                        // console.log();
                        arr.push($(element).css('background-image'));
                        //return arr;
                    })


                    $('.video-banzui .video-cover>a').each(function (index, element) {
                        // console.log();
                        arr.push($(element).css('background-image'));

                    })
                    return arr;
                })
                //console.log(a);
                fs.write('./img.txt', a, 'w');

                phantom.exit(0);

            }, 5000)


        })


    } else {
        console.log('加载失败');
    }


})
