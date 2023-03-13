/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

import $ from "jquery";


Office.onReady((info) => {
  document.getElementById("config").onclick = config;
  document.getElementById("setconfig").onclick = setConfig;
  document.getElementById("resetconfig").onclick = resetConfig;
  document.getElementById("outlook").onclick = outlook;
  document.getElementById("graph").onclick = graph;
  document.getElementById("office").onclick = office;
  document.getElementById("email").onclick = email;

  document.getElementById("activate").onclick = activate;
});

export async function config(){
  let conf = getUserConfig();
  console.log(conf);
}

export async function setConfig(){
  setUserConfig("ali@beamteknoloji.com");
}

export async function resetConfig(){
  resetUserConfig();
}

export async function outlook() {
  console.log("outlook");
}

export async function graph() {
  console.log("graph");
}

export async function office() {
  console.log("office");
}

export async function email() {
  document.getElementById("email-activation").style.display = "flex";
}

export async function activate() {
  let email = $("#username").val();

  let data = {
    email: email,
  };

  $.post({
    url: "http://localhost:8080/api/adm/user/activate",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "X-TENANT": tenant
    },
    success: function (response) {
      if (response.code == 0) {
        let config = setUserConfig(email);
        if (config.activated) {
          window.history.back();
        }
      }else{
        // FIX for error codes
        // 404 email not found
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}
