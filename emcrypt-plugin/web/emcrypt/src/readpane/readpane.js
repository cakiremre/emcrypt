/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
Office.onReady((info) => {
  const config = officeGetUserConfig(Office);

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

    serverGetOptions(Office, messageId).then((options) => {
      if (options.delay && new Date(options.delayAt) > new Date()) {
        showView("delay");

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
      } else {
        showView("read");

        let payload = extractInfoFromContent(data, "PAYLOAD");
        let encryptedKey = extractInfoFromContent(data, "KEY");

        serverDecryptKey(Office, encryptedKey).then((aesKeyAndIV) => {
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
        });
      }
    });
  });
}

function showView(val) {
  toggle("#read", false);
  toggle("#delay", false);

  switch (val) {
    case "delay":
      toggle("#delay", true);
      break;
    case "read":
      toggle("#read", true);
      break;
  }
}
