/**
 * File: content.js
 * Project: medium-unlocker
 * File Created: 23 Dec 2021 10:33:39
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 23 Dec 2021 17:09:15
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
const { memberShipId, registerWall } = require("./constants");

function handleResponse(message) {
  const { data } = message;
  if (data && data.unlocksRemaining <= 0) {
    chrome.runtime.sendMessage({ request: "fetch-cookie" });
  }
}

function fetchCookie() {
  const sending = chrome.runtime.sendMessage({ request: "get-cookie" });
  return sending.then(handleResponse, () => {});
}

function unlockerListener() {
  setInterval(() => {
    const hasUpgradePrompt = !!document.getElementById(memberShipId) || !!document.getElementById(registerWall);
    if (hasUpgradePrompt) {
      fetchCookie().then(() => {
        window.location.reload();
      });
    }
  }, 3000);
}

try {
  unlockerListener();
} catch (err) {
  console.error(err);
}

document.body.style.border = "5px solid red";
