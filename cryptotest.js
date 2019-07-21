// var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");
// // console.log(SHA256("Message"));
// var CryptoJS = require("crypto-js");
// // console.log(CryptoJS.HmacSHA1("Message", "Key"));

// //加密
// var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
// //解密
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
// // console.log(plaintext);

// // 加密对象
// var data = [{id: 1}, {id: 2}]
 
// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
 
// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
// // console.log(decryptedData);


// var encrypted = CryptoJS.Rabbit.encrypt("bqc", "Secret Passphrase");

// var decrypted = CryptoJS.Rabbit.decrypt(encrypted, "Secret Passphrase");
// console.log(decrypted)


const CryptoJS = require('crypto-js');  //引用AES源码js
    
    const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
    
    //解密方法
    function Decrypt(word) {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    
    //加密方法
    function Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }
    
    module.exports = {
        Decrypt ,
        Encrypt
    }