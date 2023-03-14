/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
Office.onReady((info) => {
  const config = getUserConfig(Office);

  if (!config.activated) {
    window.location = "splash.html";
  } else {
    Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, itemChanged);
    UpdateTaskPaneUI(Office.context.mailbox.item);
  }
});

export async function itemChanged(){
  UpdateTaskPaneUI(Office.context.mailbox.item);
}

function UpdateTaskPaneUI(item){
  getContent(Office, item).then((data) => {
    let payload = extractData(data);
    let encryptedKey = extractKey(data);

    decryptKey(Office, encryptedKey).then((aesKeyAndIV) => {
      let text = decryptMessage(payload, aesKeyAndIV);

      $("#content").html(text);
    });
  });
}
