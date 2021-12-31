/**
 * File: background.js
 * Project: svelte-app
 * File Created: 22 Dec 2021 14:17:58
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 31 Dec 2021 21:18:27
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
const { domainList } = require("./constants");
const {
  generateUID,
  generateSID,
  getBeforeSendExtraInfoSpec,
  getHeaders
} = require("./utils");

const mediumGraphql = "/_/graphql";
const postDetailType = "PostViewerEdgeContentQuery";

let needPatch = [];

function rewriteCookieHeader({ url, requestId, requestHeaders }) {
  if (url.endsWith(mediumGraphql) === false) {
    return { requestHeaders };
  }

  const operation = requestHeaders.filter(
    ({ name }) => name.toLowerCase() === "graphql-operation"
  );

  if (
    !operation.length ||
    (operation.length && operation[0].value !== postDetailType)
  ) {
    return { requestHeaders };
  }

  needPatch.push(requestId);

  let newHeaders = getHeaders(requestHeaders, "cookie", (a, b) => a !== b);
  const cookieHeader = getHeaders(requestHeaders, "cookie", (a, b) => a === b);

  if (cookieHeader.length === 1) {
    const uid = generateUID();
    const sid = generateSID();

    let newCookie = decodeURIComponent(cookieHeader[0].value);
    newCookie = newCookie.replace(/uid=(\w+);/, `uid=${uid};`);
    newCookie = newCookie.replace(/sid=(.{0,72});/, `sid=${encodeURIComponent(sid)};`);
    newCookie = newCookie.replace(/optimizelyEndUserId=(\w+);/, `optimizelyEndUserId=${uid};`);
    newHeaders.push({ name: "cookie", value: newCookie });
    return { requestHeaders: newHeaders };
  }

  return { requestHeaders };
}

function handleResponse({ requestId, responseHeaders }) {
  if (needPatch.includes(requestId) === false) {
    return { responseHeaders };
  }

  const newHeaders = getHeaders(responseHeaders, "set-cookie", (a, b) => a !== b);

  return { responseHeaders: newHeaders };
}

function handleMessage({ request }, sender, sendResponse) {
  if (request === "fetch-cookie") {
    fetchCookie();
  }

  if (request === "get-cookie") {
    sendResponse({ response: request, data: cookieTemp });
  }
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  rewriteCookieHeader,
  { urls: domainList },
  getBeforeSendExtraInfoSpec()
);

chrome.webRequest.onHeadersReceived.addListener(
  handleResponse,
  { urls: domainList },
  ["blocking", "responseHeaders"]
);
