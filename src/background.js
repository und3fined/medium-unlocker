/**
 * File: background.js
 * Project: svelte-app
 * File Created: 22 Dec 2021 14:17:58
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 23 Dec 2021 20:43:33
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
const cookie = require("cookie");
const { domainList } = require('./constants');

const cookiePage =
  "https://medium-unlocker.azurewebsites.net/api/medium-unlocker";
const mediumGraphql = "/_/graphql";
const postDetailType = "PostViewerEdgeContentQuery";

let cookieFetching = false;
let cookieTemp = {
  unlocksRemaining: 0
};
let needPatch = [];

function remoteCookie() {
  cookieFetching = true;

  return fetch(cookiePage)
  .then(resp => resp.json())
  .then(data => {
    const cookies = cookie.parse(data["set-cookie"].join("; "));
    cookieTemp.uid = cookies.uid;
    cookieTemp.sid = cookies.sid;
    cookieTemp.optimizelyEndUserId = cookies.optimizelyEndUserId;
    cookieTemp.unlocksRemaining = 3;
  })
  .finally(() => {
    //save to storage
    chrome.storage.local.set({
      unlocker: cookieTemp
    });
    cookieFetching = false;
  });
}

function fetchCookie() {
  console.info('fetchCookie')
  try {
    if (cookieFetching) return;
    cookieFetching = true;

    chrome.storage.local.get(['unlocker'], function(result) {
      if (!result['unlocker'] || result['unlocker'].unlocksRemaining < 1) remoteCookie();
      else {
        cookieFetching = false;
        cookieTemp = result['unlocker']
      }
    });
  } catch (err) {
    console.error(err);
  }
}

// function handleBeforeRequest(e) {
//   if (e.url.endsWith(mediumGraphql) === false) {
//     return {};
//   }

//   try {
//     const requestBody = e.requestBody.raw[0];
//     var postedString = decodeURIComponent(
//       String.fromCharCode.apply(null, new Uint8Array(requestBody.bytes))
//     );
//     if (postedString.includes(`"operationName":"${postDetailType}"`)) {
//       needPatch.push(e.requestId);
//     }
//   } catch (err) {
//   }

//   return {};
// }

function getBeforeSendExtraInfoSpec() {
  const extraInfoSpec = ["blocking", "requestHeaders"];
  if (
    chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty("EXTRA_HEADERS")
  ) {
    extraInfoSpec.push("extraHeaders");
  }
  return extraInfoSpec;
}

function rewriteUserAgentHeader({ url, requestId, requestHeaders }) {
  if (url.endsWith(mediumGraphql) === false) {
    return { requestHeaders };
  }

  const operation = requestHeaders.filter(
    ({ name }) => name.toLowerCase() === "graphql-operation"
  );

  if (!operation.length || (operation.length && operation[0].value !== postDetailType)) {
    return { requestHeaders };
  }

  needPatch.push(requestId)

  let newHeaders = requestHeaders.filter(
    ({ name }) => name.toLowerCase() !== "cookie"
  );
  const cookieHeader = requestHeaders.filter(
    ({ name }) => name.toLowerCase() === "cookie"
  );

  if (cookieHeader.length === 1) {
    let newCookie = decodeURIComponent(cookieHeader[0].value);

    console.info('cookieTemp', cookieTemp);

    newCookie = newCookie.replace(/uid=(\w+);/, `uid=${cookieTemp.uid || ''};`);
    newCookie = newCookie.replace(/sid=(.{0,100});/, `sid=${encodeURIComponent(cookieTemp.sid || '')};`);
    newCookie = newCookie.replace(
      /optimizelyEndUserId=(\w+);/,
      `optimizelyEndUserId=${cookieTemp.optimizelyEndUserId || ''};`
    );

    newHeaders.push({ name: "cookie", value: newCookie });

    cookieTemp.unlocksRemaining -= 1;

    chrome.storage.local.set({unlocker: cookieTemp});
    return { requestHeaders: newHeaders };
  }
  return { requestHeaders };
}

function handleResponse({ url, requestId, requestHeaders }) {
  if (url.endsWith(mediumGraphql) === false || needPatch.includes(requestId) === false) {
    return { requestHeaders };
  }

  let newHeaders = requestHeaders.filter(
    ({ name }) => name.toLowerCase() !== "set-cookie"
  );

  return {responseHeaders: newHeaders};
}

function handleMessage({ request }, sender, sendResponse) {
  if (request === "fetch-cookie") {
    fetchCookie();
  }

  if (request === "get-cookie") {
    sendResponse({ response: request, data: cookieTemp });
  }
}

chrome.runtime.onMessage.addListener(handleMessage);

// chrome.webRequest.onBeforeRequest.addListener(
//   handleBeforeRequest,
//   { urls: domainList },
//   ["blocking", "requestBody"]
// );

chrome.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  { urls: domainList },
  getBeforeSendExtraInfoSpec()
);

chrome.webRequest.onHeadersReceived.addListener(
  handleResponse,
  { urls: domainList },
  ["blocking", "responseHeaders"]
)

