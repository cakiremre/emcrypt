/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
let mailboxItem;

Office.onReady((info) => {
  $("#resetUser").bind("click", resetUser);
  $("#decrypt").bind("click", decrypt);

  const config = getUserConfig(Office);
  console.log(config);

  if (!config.activated) {
    window.location = "splash.html";
  } else {
    mailboxItem = Office.context.mailbox.item;
  }
});

export async function resetUser() {
  resetUserConfig(Office).then(() => {
    console.log("config reset");
  });
}

export async function decrypt() {
  let content = getContent(Office, mailboxItem);
  let key = getPrivateKey(Office);

  Promise.all([content, key]).then((values) => {
    let payload = extractData(values[0]);
    let encryptedKey = extractKey(values[0]);
    let privateKey = values[1];

    let text = decryptMessage(payload, encryptedKey, privateKey);

    console.log(text);
  });

  getContent(Office, mailboxItem).then((content) => {
    let data = extractData(content);
    let key = extractKey(content);
  });
}
