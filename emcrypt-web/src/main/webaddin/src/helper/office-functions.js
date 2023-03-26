export function officeGetUserConfig(office) {
  const config = {};
  config.activated = office.context.roamingSettings.get("activated");
  config.email = office.context.roamingSettings.get("email");

  config.emcrypt = office.context.roamingSettings.get("emcrypt");
  config.forward = office.context.roamingSettings.get("forward");
  config.expire = office.context.roamingSettings.get("expire");
  config.delay = office.context.roamingSettings.get("delay");

  return config;
}

export function officeSetUserConfig(office, email) {
  office.context.roamingSettings.set("activated", true);
  office.context.roamingSettings.set("email", email);

  // default email options
  office.context.roamingSettings.set("emcrypt", true);
  office.context.roamingSettings.set("forward", false);
  office.context.roamingSettings.set("expire", false);
  office.context.roamingSettings.set("delay", false);

  return new office.Promise(function (resolve, reject) {
    try {
      office.context.roamingSettings.saveAsync(function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          resolve();
        } else {
          reject(asyncResult.error.message);
        }
      });
    } catch (error) {
      reject(error.message);
    }
  });
}

export function officeSetUserPreferences(office, config) {
  // default email options
  office.context.roamingSettings.set("emcrypt", config.emcrypt);
  office.context.roamingSettings.set("forward", config.forward);
  office.context.roamingSettings.set("expire", config.expire);
  office.context.roamingSettings.set("delay", config.delay);

  return new office.Promise(function (resolve, reject) {
    try {
      office.context.roamingSettings.saveAsync(function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          resolve();
        } else {
          reject(asyncResult.error.message);
        }
      });
    } catch (error) {
      reject(error.message);
    }
  });
}

export function officeGetAsyncProp(office, mailboxItem, addressType) {
  return new office.Promise(function (resolve, reject) {
    try {
      mailboxItem[addressType].getAsync(function (asyncResult) {
        if (asyncResult.status === office.AsyncResultStatus.Succeeded) {
          resolve(asyncResult.value);
        } else {
          reject(asyncResult.error.message);
        }
      });
    } catch (error) {
      reject(error.message);
    }
  });
}

export function officeGetContent(office, mailboxItem) {
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

export function officeGetAttachments(office, mailboxItem) {
  return new office.Promise(function (resolve, reject) {
    try {
      mailboxItem.getAttachmentsAsync(function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          let attachments = asyncResult.value;
          if (attachments.length > 0) {
            let ret = [];
            let promise = [];

            attachments.forEach((item) => promise.push(officeGetAttachmentData(office, mailboxItem, item.id)));

            Promise.all(promise).then(function (values) {
              for (let i = 0; i < attachments.length; i++) {
                ret.push({
                  id: attachments[i].id,
                  name: attachments[i].name,
                  size: attachments[i].size,
                  inline: attachments[i].isInline,
                  format: values[i].format,
                  data: values[i].content,
                });
              }
              resolve(ret);
            });
          } else {
            resolve([]);
          }
        } else {
          reject(asyncResult.error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function officeGetAttachmentData(office, mailboxItem, attachmentId) {
  return new office.Promise(function (resolve, reject) {
    try {
      mailboxItem.getAttachmentContentAsync(attachmentId, function (asyncResult) {
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

export function officeSetBody(office, mailboxItem, content) {
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

export function officeAddAttachment(office, mailboxItem, attachment) {
  return new office.Promise(function (resolve, reject) {
    try {
      mailboxItem.addFileAttachmentFromBase64Async(
        attachment.data,
        attachment.name + ".emc",
        { isInline: false },
        function (asyncResult) {
          if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
            resolve();
          } else {
            reject(asyncResult.error);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export function officeRemoveAttachment(office, mailboxItem, attachment) {
  return new office.Promise(function (resolve, reject) {
    try {
      mailboxItem.removeAttachmentAsync(attachment.id, function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          resolve();
        } else {
          reject(asyncResult.error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function officeSetAttachments(office, mailboxItem, attachments) {
  return new office.Promise(function (resolve, reject) {
    try {
      let promise = [];
      attachments.forEach((a) => promise.push(officeRemoveAttachment(office, mailboxItem, a)));
      attachments.forEach((a) => promise.push(officeAddAttachment(office, mailboxItem, a)));
      Promise.all(promise).then(() => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
