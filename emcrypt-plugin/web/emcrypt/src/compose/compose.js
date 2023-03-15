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
    $("#encrypt").bind("click", encrypt);
    mailboxItem = Office.context.mailbox.item;
  }
});

export async function encrypt() {
  let content = getContent(Office, mailboxItem);
  let keyAndHtml = getPublicKey(Office);

  Promise.all([content, keyAndHtml]).then((values) => {
    let result = encryptMessage(values[0], values[1].publicKey); // data, key

    let content = `${values[1].html}<div style="display:none">---Payload---${result.payload}---Payload---<br/>---key---${result.key}---key---</div>`;

    setContent(Office, mailboxItem, content).then(() => {});
  });
}
