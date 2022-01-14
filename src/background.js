/**
 * File: background.js
 * Project: svelte-app
 * File Created: 22 Dec 2021 14:17:58
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 14 Jan 2022 16:35:52
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
const { domainList } = require("./constants");
const {
  generateUID,
  generateSID,
  getBeforeSendExtraInfoSpec,
  getHeaderReceivedExtraInfoSpec,
  getHeaders
} = require("./utils");

const {initChrome} = require('./chrome');

const mediumGraphql = "/_/graphql";
const postDetailType = ["PostViewerEdgeContentQuery", "PostHandler"];

let needPatch = [];
let userId = '';

function rewriteCookieHeader({ url, requestId, requestHeaders }) {
  if (url.endsWith(mediumGraphql) === false) {
    return { requestHeaders };
  }

  const operations = requestHeaders.filter(
    ({ name }) => name.toLowerCase() === "graphql-operation"
  );


  if (!operations.length || (operations.length && !postDetailType.includes(operations[0].value))) {
    return { requestHeaders };
  }

  needPatch.push(requestId);

  let newHeaders = getHeaders(requestHeaders, "cookie", (a, b) => a !== b);
  const cookieHeader = getHeaders(requestHeaders, "cookie", (a, b) => a === b);

  if (cookieHeader.length === 1) {
    const uid = generateUID();
    const sid = generateSID();

    let newCookie = decodeURIComponent(cookieHeader[0].value);
    const parseCookie = /uid=(\w+);/.exec(newCookie);
    if (parseCookie && parseCookie.length > 1) {
      userId = parseCookie[1];
    }

    newCookie = newCookie.replace(/uid=(\w+);/, `uid=${uid};`);
    newCookie = newCookie.replace(
      /sid=(.{0,72});/,
      `sid=${encodeURIComponent(sid)};`
    );
    newCookie = newCookie.replace(
      /optimizelyEndUserId=(\w+);/,
      `optimizelyEndUserId=${uid};`
    );
    newHeaders.push({ name: "cookie", value: newCookie });
    return { requestHeaders: newHeaders };
  }

  return { requestHeaders };
}

function handleResponse({ requestId, responseHeaders }) {
  if (needPatch.includes(requestId) === false) {
    return { responseHeaders };
  }

  const newHeaders = getHeaders(
    responseHeaders,
    "set-cookie",
    (a, b) => a !== b
  );

  return { responseHeaders: newHeaders };
}

function handleBodyResponse({ requestId, url }) {
  if (url.endsWith(mediumGraphql) === false) {
    return {};
  }

  let filter = browser.webRequest.filterResponseData(requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  let data = [];
  filter.ondata = event => {
    data.push(event.data);
  };

  filter.onstop = (e) => {
    let content = "";
    if (data.length == 1) {
      content = decoder.decode(data[0]);
    } else {
      for (let i = 0; i < data.length; i++) {
        let stream = (i == data.length - 1) ? false : true;
        content += decoder.decode(data[i], {stream});
      }
    }

    if (userId && needPatch.includes(requestId)) {
      const parseContent = /postId:(\w+)\-viewerId:(lo_\w+)/gm.exec(content);
      if (parseContent && parseContent.length === 3) {
        let guestId = new RegExp(`${parseContent[2]}`, 'g')
        content = content.replace(guestId, userId);
      }
    }

    filter.write(encoder.encode(content));
    filter.close();
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
  getHeaderReceivedExtraInfoSpec()
);


if (typeof browser !== 'undefined') {  // firefox detector
  chrome.webRequest.onBeforeRequest.addListener(
    handleBodyResponse,
    { urls: domainList },
    ["blocking"]
  );
} else {
  initChrome()
}