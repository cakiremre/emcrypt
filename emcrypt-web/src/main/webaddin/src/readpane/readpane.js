/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
let config;
Office.onReady((info) => {
  config = officeGetUserConfig(Office);

  if (!config.activated || !config.email) {
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

  officeGetAttachmentData(Office, item, id).then((encryptedAttachmentData) => {
    let decrypted = decryptAttachment(encryptedAttachmentData.content, aesKeyAndIV);
    let blob = base64ToArrayBuffer(window.atob(decrypted));
    saveByteArray(filename, blob);
  });
}

function UpdateTaskPaneUI(item) {
  $("#attachments").empty();
  $("#content").html("");

  officeGetContent(Office, item).then((data) => {
    let messageId = extractInfoFromContent(data, "ID");
    let encryptedKey = extractInfoFromContent(data, "KEY");

    if (messageId && encryptedKey) {
      serverDecryptKey(Office, encryptedKey, config.email, messageId).then((response) => {
        console.log(response);
        switch (response.code) {
          case 0:
            showView("#read");
            let payload = extractInfoFromContent(data, "PAYLOAD");
            let aesKeyAndIV = response.data;
            let text = decryptMessage(payload, aesKeyAndIV);

            $("#body").html(text);

            const attachments = item.attachments;
            if (attachments.length > 0) {
              toggle("#attachments-wrapper", true);
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
            break;
          case 404:
            showView("#not_found");
            break;
          case 500:
            showView("#delay");
            serverGetOptions(Office, messageId).then((options) => {
              let until = new Date(options.delayAt);
              $("#readAt").html(moment(until).format("YYYY-MM-DD HH:mm:ss"));
              let id = setInterval(() => {
                if (moment(new Date()).isBefore(until)) {
                  let difference = moment.duration(moment(until).diff(new Date()));
                  $("#timer").html(difference.minutes() + "m " + difference.seconds() + "s");
                } else {
                  clearInterval(id);
                  UpdateTaskPaneUI(item);
                }
              }, 1000);
            });
            break;
          case 501:
            showView("#expire");
            break;
          case 502:
            showView("#revoke");
            break;
          case 503:
            showView("#forward_disabled");
            break;
        }
      });
    } else {
      showView("#none");
    }
  });
}

function showView(view) {
  let views = ["#read", "#delay", "#not_found", "#expire", "#revoke", "#forward-disabled"];
  views.forEach((v) => toggle(v, false));
  toggle(view, true);
}
