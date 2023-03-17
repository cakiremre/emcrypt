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

export async function itemChanged() {
  UpdateTaskPaneUI(Office.context.mailbox.item);
}

export async function downloadAttachment(event) {
  let data = event.data;
  let id = data.id;
  let aesKeyAndIV = data.aesKeyAndIV;
  let item = data.item;
  let filename = data.name.substring(0, data.name.lastIndexOf("."));

  getAttachmentData(Office, item, id).then((encryptedAttachmentData) => {
    let decrypted = decryptAttachment(encryptedAttachmentData.content, aesKeyAndIV);
    let blob = base64ToArrayBuffer(window.atob(decrypted));
    saveByteArray(filename, blob);
  });
}

function UpdateTaskPaneUI(item) {
  getContent(Office, item).then((data) => {
    let payload = extractData(data);
    let encryptedKey = extractKey(data);

    decryptKey(Office, encryptedKey).then((aesKeyAndIV) => {
      let text = decryptMessage(payload, aesKeyAndIV);

      $("#content").html(text);

      const attachments = item.attachments;
      if (attachments.length > 0) {
        toggle("#attachments-wrapper", true);
        $("#attachments").empty();
        for (let i = 0; i < attachments.length; i++) {
          let a = attachments[i];
          $("#attachments").append(`<span class="attachment" id="att_${i}">${a.name}</span>`);
          $("#att_" + i).bind(
            "click",
            { id: a.id, aesKeyAndIV: aesKeyAndIV, item: item, name: a.name },
            downloadAttachment
          );
        }
      }
    });
  });
}
