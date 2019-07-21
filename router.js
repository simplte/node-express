var fs = require('fs')
var express = require('express');
var md5 = require('blueimp-md5');
var assert = require('assert');
var router = express.Router();
var jwt = require('jsonwebtoken')
var token = require('./lib/token')

// MongoDB
// var MongoClient = require('mongodb').MongoClient;
// var dbUrl = 'mongodb://localhost:27017';

// mongoose
// var dbUrl = 'mongodb://localhost:27017/userlist';
// var mongoose = require('mongoose');
// mongoose.connect(dbUrl);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.on('open', function() {
// 	console.log("数据库连接成功");
// 	router.get('/addFruit',(req,res) => {
// 		let Schema = mongoose.Schema({
// 			name:String,
// 			count:Number
// 		});
// 		Schema.methods.eat = function() {
// 			console.log('我喜欢吃' + this.name);
// 		}
// 		let Model = mongoose.model('fruit',Schema);
// 		let apple = new Model({
// 			name:'香蕉',
// 			count:10
// 		});
// 		apple.save((err,apple)=>{
// 			if(err) return console.log(err);
// 			apple.eat();
// 			Model.find({name:'香蕉'},(err,data) => {
// 				console.log(data)
// 				res.send(data)
// 			})
// 		})
// 	})
// 	router.get('/changeFruitName',(req, res) => {

// 	})

// });
// var PersonSchema = new mongoose.Schema({
// 	name : { type:String },
// 	age : { type:String },
// 	gender  : { type:Number, default:0 },
// 	hobbies : { type:String },
// });
// //创建模型，可以用它来操作数据库中的person集合，指的是整体
// var PersonModel = db.model("userList", PersonSchema); 


// 创建一个路由容器

// router.get('/insert', function (req, res) {
// 	//根据模型创建实体，是指的个体对象
// 	var personEntity = new PersonModel({
// 	    name : "bqc",
// 	    age  : '16',
// 	    gender: "1",
// 	    hobbies:'看黄片'
// 	});
// 	personEntity.save(function(error,doc){
// 		if(error){
// 			console.log("error :" + error);
// 		}else{
// 			res.send(doc)
// 			console.log(doc,1);
// 		}
// 	});
// })

// router.get('/insert', function (req, res) {
// 	MongoClient.connect(dbUrl, {useNewUrlParser:true},function (err, client) {
// 		assert.equal(err, null);
// 		const gomall = client.db('gomall');
// 		const userList = gomall.collection('userList');
// 		userList.insertOne(
// 			{
// 				"name": "张成",
// 				"gender": "0",
// 				"age": "18",
// 				"hobbies": "打飞机",
// 				"id": 4
// 			}
// 		,function(error, result) {
// 			console.log(33333333)
// 			var re = JSON.parse(result);
// 			console.log(re)

// 			if(re.n == 1) {
// 				res.send('插入成功');
// 			}else {
// 				res.send('插入失败,error:' + error);
// 			}
// 			res.end();
// 			client.close();
// 		})
// 	})
// })

// router.get('/query',function(req, res) {
//     MongoClient.connect(dbUrl,function(err, db) {
//         assert.equal(err,null);
        
//         const person = db.db('gomall');
//         const student = person.collection('userList');

//         student.find({}).toArray(function(error, docs) {
//             res.send(docs);         
//             res.end();
//             db.close();
//         })
//     })
// })

var Studens = require('./students.js')
router.get('/students', function(req, res){
	Studens.find(function(err, students) {
	 	if(err) {
	 		return res.status(500).send('error')
		 }
		 if(req.query && req.query.from == 'vue') {
			let tokenVal = req.headers.authorization;
			let tokenCheck = token.verifyToken(tokenVal);
			console.log(tokenCheck);
			if(tokenCheck && tokenCheck.status != 401) {
				 res.send(students)
			}else {
				res.send(tokenCheck)
			}
			
		 }else {
			 if(req.cookies.user) {
				res.render('index', {
					students: students,
					user : req.cookies.user
				});
			 }else {
				if(req.session && req.session.user) {
					res.cookie('user', req.session.user);
					res.render('index', {
						students: students,
						user : req.session.user
					});
				 }else {
					res.render('index', {
						students: students,
					});
				 }
			 }
		 }

	 })
})




router.get('/students/new', function (req, res) {
	res.render('new')
})

router.post('/students/new', function (req, res) {
	Studens.save(req.body, function (err) {
		if (err) {
			return res.status(500).send('error')
		}
		res.redirect('/students')
	})

})

router.get('/students/edit', function (req, res) {
	Studens.findById(req.query.id, function (err, student) {
		if (err) {
			return res.status(500).send('error')
		}
		res.render('edit', {
			student: student
		});

	})

})

router.post('/students/edit', function (req, res) {
	Studens.update(req.body, function (err) {
		if (err) {
			return res.status(500).send('error')
		}
		res.redirect('/students')
	})
})

router.get('/students/delete', function (req, res) {
	Studens.deleteById(req.query, function (err) {
		if (err) {
			return res.status(500).send('error')
		}
		res.redirect('/students')
	})
})

router.post('/students/delete', function (req, res) {

})

// 用户登录注册
router.get('/login', function (req, res) {
	res.render('login')
})
// router.post('/login', function (req, res) {
// 	// 处理登录信息
// 	let body = req.body;
// 	body.password = md5(md5(body.password));
// 	Studens.login(body, function (message, data) {
// 		if (message == 'loginSuccess') {
// 			req.session.user = data;
// 			console.log(req.session.user)
// 			res.redirect('/students')
// 		} else {
// 			let mess = '用户名或者密码错误'
// 			res.render('login', {
// 				err: mess
// 			})
// 		}

// 	})
// })
router.post('/login', async (req, res) => {
	// 处理登录信息
	let body = req.body;
	let resObj = {
		code: 3500,
		data: {},
		message: "",
		success: false
	}
	console.log(body,"222222")
	body.password = body.password ? md5(md5(body.password)) : 0;
	if(body && body.isVue) {
		if(!body.email || !body.password)  res.send(resObj);
		//生成token
		const tokenval = token.getToken(body.password,"qianceng")
        // const token = jwt.sign(
        //     {
        //         name: body.password //需要放到token的参数
        //     },
        //     'qiancheng', //随便一点内容，加密的密文，私钥对应着公钥
        //     {
        //         expiresIn: 60 * 1 //60分钟到期时间
        //     }
		// )
		console.log(tokenval)
		await Studens.login(body, function (message, data) {
			console.log(message)
			if (message == 'loginSuccess') {
				resObj = {
					code: 4000,
					data: data,
					message: "登录成功",
					success: true,
					token:tokenval
				}
			} else {
				resObj = {
					code: 3800,
					data: null,
					message: "登录失败",
					success: false
				}
			}
			res.send(resObj)
		})
	}else {
		Studens.login(body, function (message, data) {
			if (message == 'loginSuccess') {
				req.session.user = data;
				console.log(req.session.user)
				res.redirect('/students')
			} else {
				let mess = '用户名或者密码错误'
				res.render('login', {
					err: mess
				})
			}
		})
	}
})
router.get('/zhuce', function (req, res) {
	res.render('zhuce')
})
router.post('/zhuce', function (req, res) {
	// 处理注册信息
	let body = req.body;
	body.password = md5(md5(body.password));
	Studens.zhuce(body, function (err) {
		if (err) {
			res.render('zhuce', {
				err: err,
				form: body
			})
		} else {
			req.session.user = body;
			res.redirect('/students')
		}

	})
})
router.get('/saveFruits', function (req, res) {
	Studens.saveFruits(function (err) {
		if(err) {
			console.log('有问题')
		}else {
			res.send('成功了')
		}
	})
})
router.get('/getFruits', function (req, res) {
	console.log(req)
	Studens.getFruits(function (err,data) {
		if(err) {
			console.log('有问题')
		}else {
			res.send(data)
		}
	})
})
module.exports = router;