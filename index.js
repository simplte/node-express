var express = require('express');
var cookieParser = require('cookie-parser');
var router = require('./router')
var bodyParser = require('body-parser')
var md5 = require('blueimp-md5')
var session = require('express-session')
const http            = require('http');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://localhost:27017';


app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'));
app.set('view engine', 'html');
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

process.env.PORT = 3110;

app.set('port', process.env.PORT || 3000);


app.all('*', function(req, res, next) {
 
  res.header("Access-Control-Allow-Origin", "*");//一般用法（* 项目上线后改成页面的地址，指定域，动态设置），3是因为*不允许携带认证头和cookies
  //是否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回
  res.header("Access-Control-Allow-Credentials", "true");
   
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
   
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   
  next();
   
})
// 把路由容器挂载到app服务中
app.use(router);

// app.listen(app.get('port'), function() {
// 	console.log('服务器已经启动了')
// })
http.createServer(app).listen(app.get('port'), () => {
  console.log(console.log('2'))
})