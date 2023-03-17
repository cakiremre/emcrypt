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
  const config = getUserConfig(Office);

  if (!config.activated) {
    window.location = "splash.html";
  } else {
    $("#encryptAndSend").bind("click", encryptAndSend);
    mailboxItem = Office.context.mailbox.item;
  }
});

export async function encryptAndSend() {
  let content = getContent(Office, mailboxItem);
  let keyAndHtml = getPublicKey(Office);
  let attachments = getAttachments(Office, mailboxItem);

  let from = getAsyncProp(Office, mailboxItem, "from");
  let to = getAsyncProp(Office, mailboxItem, "to");
  let cc = getAsyncProp(Office, mailboxItem, "cc");
  let bcc = getAsyncProp(Office, mailboxItem, "bcc");
  let subject = getAsyncProp(Office, mailboxItem, "subject");

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
    };

    sendEmailToServer(Office, mail).then((response) => {
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
        // set body
        let body = setBody(Office, mailboxItem, content);

        // set attachments
        let attachments = setAttachments(Office, mailboxItem, result.attachments);

        Promise.all([body, attachments]).then(() => {
          console.log("emcryption finished");
        });
      }
    });
  });
}
