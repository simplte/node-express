var fs= require('fs')
var dbPath = './db.json'
let loginPath = './login.json';
var dbUrl = 'mongodb://localhost:27017/userlist';
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
mongoose.connect(dbUrl);
var db = mongoose.connection;
let Schema = mongoose.Schema({
	name:String,
	gender:Number,
	age:Number,
	habbies:String
});
let admin = mongoose.Schema({
	name:String,
	password:String,
	email:String
})
let fruits = mongoose.Schema({
	name:String,
	price:Number,
	intros:String
})
let Model = mongoose.model('user',Schema);
let loginModel = mongoose.model('adminList',admin);
let fruitsModel = mongoose.model('fruits',fruits);

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
	console.log("数据库连接成功");
	exports.find = function(callback) {
		
		// let user = new Model({
		// 	name:'王是吧',
		// 	gender:10,
		// 	age:18,
		// 	habbies:'健身'
		// });
		// user.save((err,userData)=>{
			// if(err) return console.log(err);
			
			Model.find({},(err,data) => {
				console.log(data)
				callback(null, data);
			})
		// })
	}
	exports.save =function(student, callback) {
		let user = new Model({
			name: student.name,
			gender:student.gender,
			age:student.age,
			habbies:student.hobbies
		});
		user.save((err,userData)=>{
			if(err) return callback(err);
			callback(null)
		})
	};
	exports.findById = function(id, callback) {
		Model.find({"_id":ObjectID(id)},(err,data) => {
			if(err) callback(err);
			callback(null, data[0]);
		})
	}
	exports.update =function(student, callback) {
		if(student && student.id) {
			let  id = student.id;
			let  changeData = {
				name: student.name,
				gender: student.gender,
				age: student.age,
				habbies: student.hobbies
			}
			Model.update({"_id":ObjectID(id)},changeData,(err,data) => {
				if(err) callback(err);
				callback(null);
			})
		}
		
	}
	exports.deleteById =function(student, callback) {
		if(student && student.id) {
			Model.remove({"_id": ObjectID(student.id)}, (err,data) => {
				if (err) callback(err);
				callback(null);
			})
		}
	}
	exports.login =function(username, callback) {
		loginModel.findOne({'password':username.password,'email':username.email},(err,userData)=>{
			if(err){
				return callback('noUser');
			} 
			console.log(userData,'ssssssss')
			if(userData) {
				callback('loginSuccess', userData)
			}else {
				callback('passwordError')
			}
		})
	}
	exports.zhuce =function(username, callback) {
		let admin = new loginModel({
			name: username.name,
			password:username.password,
			email:username.email
		});
		admin.save((err,admin)=>{
			if(err){
				console.log('33333ddddddd')
			} 
			console.log('3333333')
			callback(null)
		})
	}
	exports.saveFruits =function(callback) {
		let _fruit = new fruitsModel({
			name: '香蕉',
			price: '20',
			intros: '这是一个大香蕉'
		});
		_fruit.save((err,admin)=>{
			if(err){
				console.log('33333ddddddd')
			} 
			callback(null)
		})
	}
	exports.getFruits =function(callback) {
		fruitsModel.find({},(err,data) => {
			callback(null, data);
		})
	}
});
// exports.save= function(student, callback) {
// 	fs.readFile(dbPath, function(err, data) {
// 			if(err) {
// 				return callback(err);
// 			}
// 			var students = JSON.parse(data).students;
// 			student.id = parseInt(students[students.length - 1].id)+1;
// 			students.push(student);
// 			var fileData = JSON.stringify({
// 				students:students
// 			})
// 			fs.writeFile(dbPath, fileData, function(err) {
// 				if(err) {
// 					return callback(err);
// 				}
// 				callback(null)
// 			})
// 		})
// }
// exports.find = function(callback) {
// 	fs.readFile(dbPath, function(err, data) {
// 		if(err) {
// 			return callback(err);
// 		}
// 		callback(null, JSON.parse(data).students);
// 	})
// }

// exports.findById = function(id, callback) {
// 	fs.readFile(dbPath, function(err, data) {
// 		if(err) {
// 			return callback(err);
// 		}
// 		var students1 = JSON.parse(data).students;
// 		var ret = students1.find(item => {
// 			return item.id == parseInt(id);
// 		})
// 		callback(null, ret)
// 	})
// }

// exports.update =function(student, callback) {
// 	fs.readFile(dbPath, function(err, data) {
// 		if(err) {
// 			return callback(err);
// 		}
// 		var students = JSON.parse(data).students;
// 		if(student.id) {
// 			var studentUpdate = students.find(item => {
// 				return item.id == student.id;
// 			})
// 			for(var key in student) {
// 				studentUpdate[key] = student[key];
// 			}
// 			var fileData = JSON.stringify({
// 				students:students
// 			})
// 			fs.writeFile(dbPath, fileData, function(err) {
// 				if(err) {
// 					return callback(err);
// 				}
// 				callback(null)
// 			})

// 		}
		
		
// 	})
// }
// exports.deleteById =function(id, callback) {
// 	fs.readFile(dbPath, function(err, data) {
// 		if(err) {
// 			return callback(err);
// 		}
// 		var students = JSON.parse(data).students;
// 		var index = students.findIndex(item => {
// 			return item.id = id;
// 		})
// 		students.splice(index,1)
// 		var fileData = JSON.stringify({
// 				students:students
// 			})
// 			fs.writeFile(dbPath, fileData, function(err) {
// 				if(err) {
// 					return callback(err);
// 				}
// 				callback(null)
// 			})
// 	})
// }
// exports.login =function(username, callback) {
// 	fs.readFile(loginPath, function(err, data) {
// 		if(err) {
// 			return callback(err);
// 		}
// 		var users = JSON.parse(data).users;
// 		var userObj = users.find(item => {
// 			return item.email == username.email;
// 		})
// 		console.log('33')
// 		if(userObj) {
// 			if(userObj.password == username.password) {
// 				callback('loginSuccess', userObj)
// 			}else {
// 				callback('passwordError')
// 			}
// 		}else {
// 			callback('noUser')
// 		}
		
// 	})
// }
// exports.zhuce =function(username, callback) {
// 	fs.readFile(loginPath, function(err, data) {
// 		if(err) {
// 			return callback(err);
// 		}
// 		var users = JSON.parse(data).users;
// 		var index = users.find(item => {
// 			return item.email == username.email;
// 		})
// 		console.log(index,'123')
// 		if(index) {
// 			return callback('当前用户已经存在！')
// 		}else {
// 			console.log('323')
// 			users.push(username);
// 			var fileData = JSON.stringify({
// 				users:users
// 			})
// 			fs.writeFile(loginPath, fileData, function(err) {
// 				if(err) {
// 					return callback(err);
// 				}
// 				callback(null)
// 			})
// 		}
		
// 	})
// }