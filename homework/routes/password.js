/**
 * Created by dllo on 17/8/7.
 */

var express = require('express');

var router = express.Router();
var mysql = require('mysql');
var handlerError = require('../public/javascripts/handlerError');

var option = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'newB'
}
var pool = mysql.createPool(option);


router.get('/', function (req, res) {

    res.render('password')


})
module.exports = router;


router.post('/', function (req, res) {
    // console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;
    var password1 = req.body.password1;
    var password2 = req.body.password2;


    pool.getConnection(function (error, conection) {

        var select = `select * from user where username= '${username}'`;
        conection.query(select, function (error, result) {
            if (!handlerError('查询', error)) return;


            if (result.length !== 0) {
                var user = result[0];

                if(user.password == password){
                    var update = `update user set password = '${password1}' where username = '${username}'`;
                    conection.query(update,function (error) {
                        handlerError('修改',error);
                        res.send('修改成功');
                    })

                }else {
                    res.send('原密码不对');
                }


            } else {
                res.send('用户不存在');
            }

            console.log(result);
        })

    })


})
