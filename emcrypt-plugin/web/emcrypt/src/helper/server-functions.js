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
      reject(error.message);
    }
  });
}

function getPublicKey(office) {
  return new office.Promise(function (resolve, reject) {
    try {
      $.get({
        url: baseUrl + "/api/ekm/emkey/encrypt-key-html?owner=" + tenant,
        headers: {
          "X-TENANT": tenant,
        },
        success: function (response) {
          // create aes-256 key.
          resolve(response);
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

function decryptKey(office, encrypted) {
  return new office.Promise(function (resolve, reject) {
    try {
      $.post({
        url: baseUrl + "/api/ekm/emkey/decrypt-key",
        data: JSON.stringify({ owner: tenant, key: encrypted }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
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

function sendEmailToServer(office, email) {
  email.identifier = tenant;
  return new office.Promise(function (resolve, reject) {
    try {
      $.post({
        url: baseUrl + "/api/inb/email/save",
        data: JSON.stringify(email),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "X-TENANT": tenant,
        },
        success: function (response) {
          resolve(response);
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
