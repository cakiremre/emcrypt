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

  if (!config.activated) {
    window.location = "splash.html";
  } else {
    mailboxItem = Office.context.mailbox.item;
  }
});

export async function resetUser() {
  resetUserConfig(Office).then(() => {
  });
}

export async function decrypt() {
  getContent(Office, mailboxItem).then((data) => {
    let payload = extractData(data);
    let encryptedKey = extractKey(data);

    decryptKey(Office, encryptedKey).then((aesKeyAndIV) => {
      let text = decryptMessage(payload, aesKeyAndIV);

      $("#content").html(text);
    });

  });
}
