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

export async function config() {
  let conf = getUserConfig(Office);
}

export async function setConfig() {
  setUserConfig(Office, "emre@beamteknoloji.com").then((ret) => {
  });
}

export async function resetConfig() {
  resetUserConfig(Office).then(() => {
  });
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

  activateUser(Office, email).then(() => {
    setUserConfig(Office, email).then((config) => {
      if (config.activated) {
        window.close();
      }
    });
  });
}
