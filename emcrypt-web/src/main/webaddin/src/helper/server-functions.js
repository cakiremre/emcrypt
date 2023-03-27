export const tenant = DEV_TENANT;
export const baseUrl = API_URL; // defined by webpack; look for DefinePlugin

import $ from "jquery";

export function serverActivateUser(office, email) {
  let data = {
    email: email,
  };
  return new office.Promise(function (resolve, reject) {
    try {
      let request = {
        url: `${baseUrl}/api/adm/user/activate`,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
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
      };

      if (tenant) {
        request.headers = {
          "X-TENANT": tenant,
        };
      }
      $.post(request);
    } catch (error) {
      reject(error.message);
    }
  });
}

export function serverGetPublicKey(office) {
  return new office.Promise(function (resolve, reject) {
    try {
      let request = {
        url: `${baseUrl}/api/box/emkey/encrypt-key-html`,
        success: function (response) {
          // create aes-256 key.
          resolve(response);
        },
        error: function (err) {
          reject(err);
        },
      };
      if (tenant) {
        request.headers = {
          "X-TENANT": tenant,
        };
      }
      $.get(request);
    } catch (error) {
      reject(error);
    }
  });
}

export function serverGetOptions(office, messageId) {
  return new office.Promise(function (resolve, reject) {
    try {
      let request = {
        url: `${baseUrl}/api/box/email/options?messageId=${messageId}`,
        success: function (response) {
          // create aes-256 key.
          if (response.code == 0) {
            resolve(response.data);
          } else {
            reject(response.code);
          }
        },
        error: function (err) {
          reject(err);
        },
      };
      if (tenant) {
        request.headers = {
          "X-TENANT": tenant,
        };
      }
      $.get(request);
    } catch (error) {
      reject(error);
    }
  });
}

export function serverDecryptKey(office, encrypted, address, messageId) {
  return new office.Promise(function (resolve, reject) {
    try {
      let request = {
        url: `${baseUrl}/api/box/emkey/decrypt-key`,
        data: JSON.stringify({ key: encrypted, address: address, messageId: messageId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
          // create aes-256 key.
          resolve(response);
        },
        error: function (err) {
          reject(err);
        },
      };
      if (tenant) {
        request.headers = {
          "X-TENANT": tenant,
        };
      }
      $.post(request);
    } catch (error) {
      reject(error);
    }
  });
}

export function serverSendEmail(office, email) {
  email.identifier = tenant;
  return new office.Promise(function (resolve, reject) {
    try {
      let request = {
        url: `${baseUrl}/api/box/email/save`,
        data: JSON.stringify(email),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
          resolve(response);
        },
        error: function (err) {
          reject(err);
        },
      };
      if (tenant) {
        request.headers = {
          "X-TENANT": tenant,
        };
      }
      $.post(request);
    } catch (error) {
      reject(error);
    }
  });
}
