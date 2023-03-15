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
    $("#send").bind("click", send);
    $("#encryptAndSend").bind("click", encryptAndSend);
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

export async function send() {
  let from = getAsyncProp(Office, mailboxItem, "from");
  let to = getAsyncProp(Office, mailboxItem, "to");
  let cc = getAsyncProp(Office, mailboxItem, "cc");
  let bcc = getAsyncProp(Office, mailboxItem, "bcc");
  let subject = getAsyncProp(Office, mailboxItem, "subject");

  Promise.all([from, to, cc, bcc, subject]).then((values) => {
    let mail = {
      from: translateAddress(values[0]),
      to: translateAddresses(values[1]),
      cc: translateAddresses(values[2]),
      bcc: translateAddresses(values[3]),
      subject: values[4],
    };

    console.log(mail);

    sendEmailToServer(Office, mail).then((response) => console.log(response));
  });
}

export async function encryptAndSend() {
  let content = getContent(Office, mailboxItem);
  let keyAndHtml = getPublicKey(Office);

  let from = getAsyncProp(Office, mailboxItem, "from");
  let to = getAsyncProp(Office, mailboxItem, "to");
  let cc = getAsyncProp(Office, mailboxItem, "cc");
  let bcc = getAsyncProp(Office, mailboxItem, "bcc");
  let subject = getAsyncProp(Office, mailboxItem, "subject");

  Promise.all([content, keyAndHtml, from, to, cc, bcc, subject]).then((values) => {
    let result = encryptMessage(values[0], values[1].publicKey); // data, key
    let content = `${values[1].html}<div style="display:none">---Payload---${result.payload}---Payload---<br/>---key---${result.key}---key---</div>`;

    let mail = {
      from: translateAddress(values[2]),
      to: translateAddresses(values[3]),
      cc: translateAddresses(values[4]),
      bcc: translateAddresses(values[5]),
      subject: values[6],
      key: result.key,
      data: result.payload,
    };

    sendEmailToServer(Office, mail).then((response) => {
      if (response.code == 0) {
        content = content.replace(
          "${link}",
          "http://localhost:4200/secure-read?messageid=" + response.data + "&tenant=" + tenant
        );
        setContent(Office, mailboxItem, content).then(() => {});
      }
    });
  });
}
