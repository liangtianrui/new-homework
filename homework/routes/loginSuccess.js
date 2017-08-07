/**
 * Created by dllo on 17/8/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var handlerError = require('../public/javascripts/handlerError');

var options = {
    host: "localhost",
    port: 3306,
    user: 'root',
    password: '',
    database: 'newB'

};

var pool = mysql.createPool(options);



router.post('/', function (req, res) {
    console.dir(req.body);
    console.log(req.body.username);
    console.log(req.body.password);


    pool.getConnection(function (error, conection) {
        var selectUer = `select * from user where username = '${req.body.username}'`;

        conection.query(selectUer,function (error,result) {

            if(!handlerError('查询',error)) return;

            if(result.length !== 0){
            var user = result[0];
                if(req.body.password == user.password){
                    res.send('登录成功');
                } else  {
                    res.send('密码错误');
                }
            } else {
                res.send('账号不存在');
            }


        })
    })


});


module.exports = router;
