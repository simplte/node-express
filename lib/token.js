const jwt = require('jsonwebtoken')
const secret = "qiancheng";
const time = '2h'

exports.getToken = function(password) {
    const payload ={
        name:'bqc',
        admin:true,
        password: password,
        loginAt: +new Date
    }
	const token = jwt.sign(payload , secret, {expiresIn:time})
    return token;
}
exports.verifyToken = function(_token) {
    let jwtObj =jwt.verify(_token, secret, (error, decoded) => {
        if(error) {
            let errobj = {
                status : 401,
                error: true
            }
            return errobj;
        }
        decoded['status'] = 200;
        return decoded;
    });
    return jwtObj;
}