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

function getAsyncProp(office, mailboxItem, addressType) {
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

function getAttachments(office, mailboxItem) {
  return new office.Promise(function (resolve, reject) {
    try {
      mailboxItem.getAttachmentsAsync(function (asyncResult) {
        if (asyncResult.status == office.AsyncResultStatus.Succeeded) {
          let attachments = asyncResult.value;
          if (attachments.length > 0) {
            let ret = [];
            let promise = [];

            attachments.forEach((item) => promise.push(getAttachmentData(office, mailboxItem, item.id)));

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

function getAttachmentData(office, mailboxItem, attachmentId) {
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

function setBody(office, mailboxItem, content) {
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

function setAttachments(office, mailboxItem, attachments) {
  return new office.Promise(function (resolve, reject) {
    try {
      let promise = [];
      attachments.forEach((a) => promise.push(removeAttachment(office, mailboxItem, a)));
      attachments.forEach((a) => promise.push(addAttachment(office, mailboxItem, a)));
      Promise.all(promise).then(() => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

function addAttachment(office, mailboxItem, attachment) {
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

function removeAttachment(office, mailboxItem, attachment) {
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
