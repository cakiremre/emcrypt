const tenant = "beamteknolojicom";
const baseUrl = "http://localhost:8080";

function activateUser(office, email) {
  let data = {
    email: email,
  };
  return new office.Promise(function (resolve, reject) {
    try {
      $.post({
        url: baseUrl + "/api/adm/user/activate",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "X-TENANT": tenant,
        },
        success: function (response) {
          if (response.code == 0) {
            resolve();
          } else {
            // FIX for error codes
            // 404 email not found
            reject("code: " + response.code);
          }
        },
        error: function (err) {
          reject(err.message);
        },
      });
    } catch (error) {
      reject(error);
    }
  });
}

function getPublicKey(office){
  return new office.Promise(function (resolve, reject) {
    try {
      $.get({
        url: "http://localhost:8080/api/ekm/emkey/read?owner=" + tenant + "&keyType=PUBLIC",
        headers: {
          "X-TENANT": tenant,
        },
        success: function (response) {
          // create aes-256 key.
          resolve(response.data);
        },
        error: function (err) {
          reject(err);
        },
      });
    } catch (error) {
      reject(error);
    }
  });
}

function getPrivateKey(office){
  return new office.Promise(function (resolve, reject) {
    try {
      $.get({
        url: "http://localhost:8080/api/ekm/emkey/read?owner=" + tenant + "&keyType=PRIVATE",
        headers: {
          "X-TENANT": tenant,
        },
        success: function (response) {
          // create aes-256 key.
          resolve(response.data);
        },
        error: function (err) {
          reject(err);
        },
      });
    } catch (error) {
      reject(error);
    }
  });
}

