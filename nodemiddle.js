var http = require('http');
var url = require('url');

var query = require('./middleware/query.js')

var server = http.createServer(function(req, res) {
	// 解析表单get请求
	// 解析表单post请求
	// 解析表单cookie
	// 解析表单Session
	// 原生模块是不提供这些中间件的
	
	// 解析请求地址中的get参数 
	// var urlObj = url.parse(req.url, true);
	// req.query = urlObj.query;
	query(req, res);  // 这个就相当于使用express中封装好的插件


	// 解析请求地址中的post参数
	// req.body = {}
	// 解析cookie
	// req.cookie = {}
	// 配置session
	// req.session = {}

	// 中间件处理完参数之后 开始业务逻辑
	if(req.url == 'xxxx') {
		// 现在直接能直接使用 req.query
	}

})

server.listen(3000, function() {
	console.log('服务器运行了')
})