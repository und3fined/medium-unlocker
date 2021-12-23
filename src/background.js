/**
 * File: background.js
 * Project: svelte-app
 * File Created: 22 Dec 2021 14:17:58
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 23 Dec 2021 14:38:45
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
const cookie = require('cookie');

const cookiePage = 'https://medium-unlocker.azurewebsites.net/api/medium-unlocker';
const mediumUrls = [`*://medium.com/*`];
const mediumGraphql = 'https://medium.com/_/graphql';
const cookieStatusType = 'PostMeter';
const postDetailType = 'PostViewerEdgeContentQuery';

const cookieTemp = {};

function fetchCookie() {
  return fetch(cookiePage).then(resp => resp.json()).then(data => {
    const cookies = cookie.parse(data["set-cookie"].join('; '))
    cookieTemp.uid = cookies.uid;
    cookieTemp.sid = cookies.sid;
    cookieTemp.optimizelyEndUserId = cookies.optimizelyEndUserId;
  });
}

function rewriteUserAgentHeader(e) {
  return { requestHeaders: e.requestHeaders };
}

function watchNofity(message) {
  const { request } = message;

  if (request === "fetch-cookie") {
    fetchCookie()
  }


}


browser.runtime.onMessage.addListener(watchNofity);

chrome.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  { urls: mediumUrls },
  ["blocking", "requestHeaders"]
);
