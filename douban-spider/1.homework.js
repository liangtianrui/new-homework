/**
 * Created by dllo on 17/8/8.
 */


var request = require('request');

var cheerio = require('cheerio');

var download = require('./download');

//var url = "https://www.douban.com/";

var options = {
    url: 'https://www.douban.com/',
    headers: {
        'Host': 'www.douban.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
}
request.get(options, function (error, response, body) {
    var $ = cheerio.load(body);

    var dbArray = [];//存放所有数据数组

    var hotcontent = [];//存放热点内容的数组
    //热点内容图片
    $('.albums .pic a img').each(function (index, element) {
        //console.log(element);

        var hot = {
            img: $(element).attr('data-origin')
        }
        hotcontent.push(hot);
        download(hot.img, 'doubanImg', 'hot' + index + '.jpg');
    })
//console.log(hotcontent);
    //热点内容title
    $('.albums ul li > a').each(function (index, element) {

        hotcontent[index].titlie = $(element).text();
    })
    //console.log(hotcontent);
    dbArray.push(hotcontent);

    //console.log(dbArray);

    var dbtime = [];//存放豆瓣时间的数组
    //豆瓣时间图片
    $('.time-list li .cover img').each(function (index, element) {
        var time = {

            img: $(element).attr('src')
        }
        download(time.img, 'doubanImg', 'time' + index + '.jpg');
        dbtime.push(time);

    })

    //豆瓣时间 title
    $('.time-list li .title').each(function (index, element) {

        dbtime[index].title = $(element).text();
    })
    dbArray.push(dbtime);
    //console.log(dbArray);

    //视频
    var videoArray = [];//存放视频的数组
    //视频图片
    // $('.video-list li .video-title').each(function (index,element) {
    //
    //     console.log($(element).text());
    //
    // })

    var movieArray = [];//存放电影的数组
    //电影图片
    $('.movie-list .pic a img').each(function (index, element) {

        var movie = {
            img: $(element).attr('data-origin')
        }
        download(movie.img, 'doubanImg', 'movie' + index + '.jpg');

        movieArray.push(movie);

    })

    //电影名
    $('.movie-list ul li .title a').each(function (index, element) {

        movieArray[index].title = $(element).text();

    })
    //电影评分
    $('.movie-list ul li .rating i').each(function (index, element) {
        // console.log();
        movieArray[index].rate = $(element).text();

    })
    dbArray.push(movieArray);
    // console.log(dbArray);

    //热门小组
    var groupArray = []; //存放热门小组数组
    //热门小组图片
    $('.group-list ul li .pic a img').each(function (index, element) {
        var group = {
            img: $(element).attr('data-origin')
        }
        download(group.img, 'doubanImg', 'group' + index + '.jpg');
        groupArray.push(group);
    })
    //热门小组title
    $('.group-list ul li .info .title a').each(function (index, element) {

        groupArray[index].title = $(element).text();

    })
    dbArray.push(groupArray);

    //新书速递
    var newBook = [];
    //新书速递图片
    $('.book-list ul li .pic a img').each(function (index, element) {
        var book = {
            img: $(element).attr('data-origin')
        }
        download(book.img, 'doubanImg', 'book' + index + '.jpg');
        newBook.push(book);
    })
    //新书速递名
    $('.book-list ul li .title a').each(function (index, element) {
        newBook[index].tltle = $(element).text();
    })
    //新书作者
    $('.book-list ul li .author').each(function (index, element) {
        newBook[index].name = $(element).text();

    })
    dbArray.push(newBook);
//console.log(newBook);
    //音乐
    var musicArray = [];

    //豆瓣新碟榜
    var dbNewMusic = [];
    //新碟榜图片
    $('.album-list ul li .pic a img').each(function (index, element) {

        var newMusic = {
            img: $(element).attr('data-origin')
        }
        download(newMusic.img, 'doubanImg', 'newMusic' + index + '.jpg');
        dbNewMusic.push(newMusic);

    })

    //新碟榜名字
    $('.album-list ul li .title a').each(function (index, element) {

        dbNewMusic[index].title = $(element).text();

    })
    //新碟榜作者
    $('.album-list ul li .artist a').each(function (index, element) {

        dbNewMusic[index].name = $(element).text();

    })
    //新碟评分
    $('.album-list ul li .rating i').each(function (index, element) {

        dbNewMusic[index].rate = $(element).text();

    })
    dbArray.push(dbNewMusic);


    //热门歌单
    var dbHotMusic = [];

    //热门歌单图片
    $('.programme-list ul li .pic img').each(function (index, element) {
        var hotMusic = {
            img: $(element).attr('src')
        }
        download(hotMusic.img, 'doubanImg', 'hotMusic' + index + '.jpg')
        dbHotMusic.push(hotMusic);

    })
    //热门歌单title
    $('.programme-list ul li .title').each(function (index, element) {
        dbHotMusic[index].title = $(element).text();
    })
    dbArray.push(dbHotMusic);

    console.log(dbArray);
})

