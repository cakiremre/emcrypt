/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

import $ from "jquery";
import { toggle } from "../helper/functions";
import { officeSetUserConfig } from "../helper/office-functions";
import { serverActivateUser } from "../helper/server-functions";

Office.onReady((info) => {
  $("#outlook").bind("click", outlook);
  $("#graph").bind("click", graph);
  $("#office").bind("click", office);
  $("#email").bind("click", email);

  $("#activate").bind("click", activate);
});

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
  toggle("#email-activation", true);
}

export async function activate() {
  let email = $("#username").val();
  serverActivateUser(Office, email).then(
    () => {
      officeSetUserConfig(Office, email).then(
        () => {
          output(true);
        },
        (message) => {
          output(false, message);
        }
      );
    },
    (message) => {
      output(false, message);
    }
  );
}

function output(success, message) {
  if (success) {
    toggle("#success", true);
  } else {
    toggle("#error", true);
    $("#error-msg").text(message);
  }
}
