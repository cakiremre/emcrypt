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
  $("#resetUser").bind("click", reset);
  $("#encrypt").bind("click", encrypt);

  const config = getUserConfig(Office);

  if (!config.activated) {
    window.location = "splash.html";
  } else {
    mailboxItem = Office.context.mailbox.item;
  }
});

export async function reset() {
  resetUserConfig().then(() => {
    console.log("config reset");
  });
}

export async function encrypt() {
  let content = getContent(Office, mailboxItem);
  let key = getPublicKey(Office);

  Promise.all([content, key]).then((values) => {
    let result = encryptMessage(values[0], values[1]); // data, key

    setContent(Office, mailboxItem, result).then(() => {
      console.log("content changed");
    });
  });
}
