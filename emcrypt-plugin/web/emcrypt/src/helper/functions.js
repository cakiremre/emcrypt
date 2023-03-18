let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()";
// create a key for symmetric encryption
// pass in the desired length of your key
let generateKey = function (keyLength) {
  var randomstring = "";

  for (var i = 0; i < keyLength; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return CryptoJS.MD5(randomstring).toString();
};

let encryptMessage = function (data, attachments, publicKey) {
  let key = generateKey(50);
  let iv = generateKey(50);
  let aesEncrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(key), { iv: CryptoJS.enc.Hex.parse(iv) });

  attachments.forEach(
    (a) =>
      (a.data = CryptoJS.AES.encrypt(a.data, CryptoJS.enc.Hex.parse(key), {
        iv: CryptoJS.enc.Hex.parse(iv),
      }).toString())
  );

  let aesKey = key + ":::" + iv;

  let rsaEncrypt = new JSEncrypt();
  rsaEncrypt.setPublicKey(publicKey);

  return {
    payload: aesEncrypted.toString(),
    attachments: attachments,
    key: rsaEncrypt.encrypt(aesKey),
  };
};

let decryptMessage = function (payload, aesKeyAndIV) {
  let key = aesKeyAndIV.split(":::")[0];
  let iv = aesKeyAndIV.split(":::")[1];

  let decrypted = CryptoJS.AES.decrypt(payload, CryptoJS.enc.Hex.parse(key), {
    iv: CryptoJS.enc.Hex.parse(iv),
  }).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

let decryptAttachment = function (payload, aesKeyAndIV) {
  let key = aesKeyAndIV.split(":::")[0];
  let iv = aesKeyAndIV.split(":::")[1];

  let decrypted = CryptoJS.AES.decrypt(payload, CryptoJS.enc.Hex.parse(key), {
    iv: CryptoJS.enc.Hex.parse(iv),
  }).toString(CryptoJS.enc.Base64);
  return decrypted;
};

let translateAddress = function (outlookAddress) {
  return {
    address: outlookAddress.emailAddress,
    name: outlookAddress.displayName,
  };
};

let translateAddresses = function (outlookAddresses) {
  let addresses = [];
  outlookAddresses.forEach((address) => addresses.push(translateAddress(address)));
  return addresses;
};

let extractInfoFromContent = function (content, type) {
  let rx = undefined;
  switch (type) {
    case "ID":
      rx = /Message ID:(.*?)<br/;
      break;
    case "PAYLOAD":
      rx = /%%(.*?)%%/;
      break;
    case "KEY":
      rx = /##(.*?)##/;
      break;
    default:
      console.error("Undefined extraction type", type);
      return;
  }

  if (rx) {
    let arr = rx.exec(content);
    if (arr && arr.length > 1) {
      return arr[1].trim();
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

let toggle = function (selector, show) {
  if (show) {
    $(selector).css("display", "");
  } else {
    $(selector).css("display", "none");
  }
};

function base64ToArrayBuffer(base64) {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

function saveByteArray(fileName, byte) {
  var blob = new Blob([byte]);
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

function removeUTCDate(dateInput) {
  let date = dateInput ? dateInput : new Date();
  return new Date(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
}
