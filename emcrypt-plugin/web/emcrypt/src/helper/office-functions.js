function getUserConfig(office) {
  const config = {};
  config.activated = office.context.roamingSettings.get("activated");
  config.email = office.context.roamingSettings.get("email");

  return config;
}

function resetUserConfig(office) {
  office.context.roamingSettings.remove("activated");
  office.context.roamingSettings.remove("email");
  return new office.Promise(function (resolve, reject) {
    try {
      office.context.roamingSettings.saveAsync(function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          resolve(asyncResult.value);
        } else {
          reject(asyncResult.error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

function setUserConfig(office, email) {
  office.context.roamingSettings.set("activated", true);
  office.context.roamingSettings.set("email", email);

  return new office.Promise(function (resolve, reject) {
    try {
      office.context.roamingSettings.saveAsync(function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          resolve({
            activated: true,
            email: email,
          });
        } else {
          reject(asyncResult.error.message);
        }
      });
    } catch (error) {
      reject(error.message);
    }
  });
}

function getContent(office, mailboxItem) {
  return new office.Promise(function (resolve, reject) {
    try {
      mailboxItem.body.getAsync("html", function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          resolve(asyncResult.value);
        } else {
          reject(asyncResult.error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

function setContent(office, mailboxItem, content) {
  return new office.Promise(function (resolve, reject) {
    try {
      mailboxItem.body.setAsync(content, { coercionType: office.CoercionType.Html }, function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          resolve(asyncResult.value);
        } else {
          reject(asyncResult.error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
