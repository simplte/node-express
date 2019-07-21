var express = require('express');
var fs = require('fs');
var app = express();
// 中间件的本质就是一个函数方法
// 中间件接受三个参数
// 		request 请求对象
// 		response 相应对象
// 		next 下一个中间件
// 		当一个请求进入一个中间件之后，如果不调用next 则会停留在当前中间中
// 		所以next是一个方法， 用来调用下一个中间件的
// 		
//匹配规则是：
//	如果匹配了，则进来
//		进来执行完了：有next就执行一下匹配成功的中间件
//					没有next就停留在当前中间件中
//					

// express中，对中间件件的分类
//   1:任何请求都会进入的中间件（任何请求方法和路径都可以）
//   
// app.use(function(req, res, next) {
// 	console.log('随便进2');
// 	next();
// }) 
// app.use(function(req, res, next) {
// 	console.log('随便进1')
// }) 

// app.use(function(req, res, next) {
// 	console.log('随便进3')
// }) 

// 关心请求路径的中间件
// app.use('/a', function(req, res, next) {
// 	console.log(req.url);
// 	next();
// })
// app.use(function(req, res, next) {
// console.log('随便进3')
// }) 

// 最最常用的中间件  路由级别中间件
// 严格匹配请求方法和请求路径的中间件
// app.get
// app.post
// 
// app.get('/', function(req, res, next) {
// 	console.log('111');
// 	req.foo = '11'
// 	next()
// })
//配置错误处理中间件
//
app.get('/', function(req, res, next) {
	fs.readFile('./sdfsdf', function(err, data) {
		if(err) {
			console.log(err)
			// return res.status(500).send('server error')
			// 当调用next的时候，如果传递了参数 直接到四个参数的中间件
			next(err)
		}
	})
})

app.use(function(req, res, next) {
	res.send('404')
})

app.use(function(err, req, res, next) {
	res.status(500).send(err.message);
})

app.listen(3000, function() {
	console.log('服务器走起来来')
})