let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()";
// create a key for symmetric encryption
// pass in the desired length of your key
let generateKey = function generateKey(keyLength) {
  var randomstring = "";

  for (var i = 0; i < keyLength; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return CryptoJS.MD5(randomstring).toString();
};

let encryptMessage = function (data, publicKey) {
  let key = generateKey(50);
  let iv = generateKey(50);
  let aesEncrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(key), { iv: CryptoJS.enc.Hex.parse(iv) });
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

let decryptMessage = function (payload, encryptedKey, privateKey) {
  let rsaEncrypt = new JSEncrypt();
  rsaEncrypt.setPrivateKey(privateKey);
  let aesKeyAndIV = rsaEncrypt.decrypt(encryptedKey);

  let key = aesKeyAndIV.split(":::")[0];
  let iv = aesKeyAndIV.split(":::")[1];

  let decrypted = CryptoJS.AES.decrypt(payload, CryptoJS.enc.Hex.parse(key), { iv: CryptoJS.enc.Hex.parse(iv) }).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

let extractData = function (content) {
  var rx = /<p class=data>(.*)<\/p>/g;
  var arr = rx.exec(content);
  return arr[1];
};

let extractKey = function (content) {
  var rx = /<p class=key>(.*)<\/p>/g;
  var arr = rx.exec(content);
  return arr[1];
};
