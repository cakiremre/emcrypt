/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
import $ from "jquery";

Office.onReady((info) => {

  $("#resetUser").bind("click", resetUser);

  const config = getUserConfig();
  console.log(config);

    if(!config.activated){
      window.location = "splash.html";
    }
});

export async function resetUser(){
  resetUserConfig();
}


