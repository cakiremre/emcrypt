/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
import $ from "jquery";
let CryptoJS = require("crypto-js");
let JSEncrypt = require("jsencrypt");

let mailboxItem;

Office.onReady((info) => {
  const config = officeGetUserConfig(Office);

  if (!config.activated) {
    window.location = "splash.html";
  } else {
    $("#remember").bind("click", remember);
    $("#encryptAndSend").bind("click", encryptAndSend);

    mailboxItem = Office.context.mailbox.item;

    // udpate default configuration
    updateConfigUI(config);

    $("#emcrypt").bind("change", function () {
      if (!this.checked) {
        config.emcrypt = false;
        config.forward = false;
        config.expire = false;
        config.delay = false;
        updateConfigUI(config);
      }
    });

    $("#expire").bind("change", function () {
      toggle("#expireAt", this.checked);
      // default expires is 1 day
      $("#expireAt").val(moment(removeUTCDate()).add(1, "day").toDate().toJSON().slice(0, 19));
    });

    $("#delay").bind("change", function () {
      toggle("#delayAmount", this.checked);
    });

    // ready to show view
    toggle("#options", true);
  }
});

export async function encryptAndSend() {
  let config = readConfigFromUI();
  console.log(config);

  if (config.emcrypt) {
    console.log("emcryption started");
    let content = officeGetContent(Office, mailboxItem);
    let keyAndHtml = serverGetPublicKey(Office);
    let attachments = officeGetAttachments(Office, mailboxItem);

    let from = officeGetAsyncProp(Office, mailboxItem, "from");
    let to = officeGetAsyncProp(Office, mailboxItem, "to");
    let cc = officeGetAsyncProp(Office, mailboxItem, "cc");
    let bcc = officeGetAsyncProp(Office, mailboxItem, "bcc");
    let subject = officeGetAsyncProp(Office, mailboxItem, "subject");

    Promise.all([content, keyAndHtml, attachments, from, to, cc, bcc, subject]).then((values) => {
      let result = encryptMessage(values[0], values[2], values[1].publicKey); // data, key

      let mail = {
        from: translateAddress(values[3]),
        to: translateAddresses(values[4]),
        cc: translateAddresses(values[5]),
        bcc: translateAddresses(values[6]),
        subject: values[7],
        key: result.key,
        data: result.payload,
        attachments: result.attachments,
        options: config,
      };

      serverSendEmail(Office, mail).then((response) => {
        let content = `${values[1].html} 
                  <div style="display:none">
                  Emcrypt Version: v1.0<br/>
                  Message ID: ${response.data}<br/>
                  Metadata: <br/>
                  ---Payload---<br/>
                  %%${result.payload}%%
                  ---Payload---<br/>
                  ---key---<br/>
                  ##${result.key}##
                  ---key---<br/>
                  </div>`;

        if (response.code == 0) {
          content = content.replace(
            "${link}",
            "http://localhost:4200/secure-read?messageid=" + response.data + "&tenant=" + tenant
          );

          Promise.all([
            officeSetBody(Office, mailboxItem, content),
            officeSetAttachments(Office, mailboxItem, result.attachments),
          ]).then(() => {
            console.log("emcryption finished");
          });
        }
      });
    });
  } else {
    confolg.log("emcryption disabled");
  }
}

export async function remember() {
  let config = readConfigFromUI();

  officeSetUserPreferences(Office, config).then(
    () => {
      output(true);
    },
    (message) => {
      output(false, message);
    }
  );
}

function output(success, message) {
  if (success) {
    toggle("#success", true);
  } else {
    toggle("#error", true);
    $("#error-msg").text(message);
  }
}

function updateConfigUI(config) {
  $("#emcrypt").prop("checked", config.emcrypt);
  $("#forward").prop("checked", config.forward);
  $("#expire").prop("checked", config.expire);
  $("#delay").prop("checked", config.delay);

  toggle("#expireAt", config.expire);
  if (config.expire) {
    $("#expireAt").val(moment(removeUTCDate()).add(1, "day").toDate().toJSON().slice(0, 19));
  }
  toggle("#delayAmount", config.delay);
}

function readConfigFromUI() {
  let config = {
    emcrypt: $("#emcrypt").prop("checked"),
    forward: $("#forward").prop("checked"),
    expire: $("#expire").prop("checked"),
    delay: $("#delay").prop("checked"),
  };

  if (config.expire) {
    config.expireAt = $("#expireAt").val();
    config.expireAt = new Date(config.expireAt);
  }

  if (config.delay) {
    config.delayInMinutes = $("input[name=delayInMinutes]:checked").val();
    config.delayAt = moment().add(config.delayInMinutes, "minutes").toDate();
  }

  return config;
}
