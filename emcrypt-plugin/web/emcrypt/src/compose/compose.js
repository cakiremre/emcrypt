/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
import $ from "jquery";

Office.onReady((info) => {
  $("#resetUser").bind("click", resetUser);
  $("#encrypt").bind("click", encryptMessage);

  const config = getUserConfig();

  if (!config.activated) {
    window.location = "splash.html";
  }
});

export async function resetUser() {
  resetUserConfig();
}

export async function encryptMessage() {
  // get pub-key of the organization.
  $.get({
    url: "http://localhost:8080/api/ekm/emkey/read?owner=" + tenant + "&keyType=PUBLIC",
    headers: {
      "X-TENANT": tenant
    },
    success: function(response){
      console.log(response);
    },
    error: function(err){
      console.log(err);
    }
  });

  // encrypt and replace message body.

  
}
