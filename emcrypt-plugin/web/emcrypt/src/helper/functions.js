let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()";
// create a key for symmetric encryption
// pass in the desired length of your key
let generateKey = function generateKey(keyLength) {
  var randomstring = "";

  for (var i = 0; i < keyLength; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};

let encryptMessage = function (data, publicKey) {
  let key = CryptoJS.enc.Utf8.parse(generateKey(32));
  let iv = CryptoJS.enc.Utf8.parse(generateKey(16));
  let aesEncrypted = CryptoJS.AES.encrypt(data, key, {iv: iv});
  let aesKey = key + ":::" + iv;
  let encryptedMessage = aesEncrypted.toString();

  let rsaEncrypt = new JSEncrypt();
  rsaEncrypt.setPublicKey(publicKey);
  encryptedKey = rsaEncrypt.encrypt(aesKey);
  return {
    payload: encryptedMessage,
    key: encryptedKey,
  };
};

let decryptMessage = function(payload, encryptedKey, privateKey){
  let rsaEncrypt = new JSEncrypt();
  rsaEncrypt.setPrivateKey(privateKey);
  let aesKeyAndIV = rsaEncrypt.decrypt(encryptedKey).split(":::");
  
  let decrypted = CryptoJS.AES.decrypt(payload, aesKeyAndIV[0], {iv: aesKeyAndIV[1]});
  return decrypted.toString(CryptoJS.enc.Utf8);
}

let extractData = function(content) {
  var rx = /<p class=data>(.*)<\/p>/g;
  var arr = rx.exec(content);
  return arr[1];
}

let extractKey = function(content) {
  var rx = /<p class=key>(.*)<\/p>/g;
  var arr = rx.exec(content);
  return arr[1];
}