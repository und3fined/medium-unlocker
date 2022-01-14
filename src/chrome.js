/**
 * File: chrome.js
 * Project: medium-unlocker
 * File Created: 14 Jan 2022 16:35:00
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 14 Jan 2022 22:59:37
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2022 und3fined.com
 */
const { domainList } = require("./constants");
const { getRealObjectKey, generateUID, generateSID } = require("./utils");

const version = "1.3";
const attachedTabs = {};

const postDetailType = ["PostViewerEdgeContentQuery", "PostHandler"];

let currentTabId = "";
let currentTabUrl = "";
let currentTabDomain = "";

function getHeaders(headers) {
  let responseHeader = [];
  headers.forEach((header, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      responseHeader.push({
        name: key,
        value: header
      });
    }
  });

  console.info("responseHeader", responseHeader);

  return responseHeader;
}

async function patchRequest({ url, method, headers, postData }, callback) {
  const cookieKey = getRealObjectKey(headers, "cookie");
  let cookieVal = decodeURIComponent(headers[cookieKey]);

  const uid = generateUID();
  const sid = generateSID();
  let userId = "";

  const parseCookie = /uid=(\w+);/.exec(cookieVal);
  if (parseCookie && parseCookie.length > 1) {
    userId = parseCookie[1];
  }

  cookieVal = cookieVal.replace(/uid=(\w+);/, `uid=${uid};`);
  cookieVal = cookieVal.replace(
    /sid=(.{0,72});/,
    `sid=${encodeURIComponent(sid)};`
  );
  cookieVal = cookieVal.replace(
    /optimizelyEndUserId=(\w+);/,
    `optimizelyEndUserId=${uid};`
  );
  let newHeader = { ...headers };
  newHeader[cookieKey] = cookieVal;
  newHeader["sec-fetch-site"] = "same-origin";
  newHeader["referer"] = currentTabUrl;
  newHeader["origin"] = currentTabDomain;

  let response = await fetch(url, {
    method,
    mode: "cors",
    headers: newHeader,
    redirect: "follow",
    body: postData
  });

  if (response.ok) {
    let content = await response.text();
    const parseContent = /postId:(\w+)\-viewerId:(lo_\w+)/gm.exec(content);
    if (parseContent && parseContent.length === 3 && userId) {
      let guestId = new RegExp(`${parseContent[2]}`, "g");
      content = content.replace(guestId, userId);
      console.info("content", content);
    }

    callback(null, {
      responseCode: response.status,
      responseHeaders: getHeaders(response.headers),
      body: btoa(unescape(encodeURIComponent(content)))
    });
  } else {
    callback(true, null);
  }
}

// params as {frameId, request, requestId, resourceType}
function handleDebug(source, method, { requestId, request }) {
  if (method === "Fetch.requestPaused") {
    if (request.url.endsWith("/_/graphql")) {
      const headerKeys = Object.keys(request.headers);
      const operationKey = headerKeys.find(
        name => name.toLowerCase() === "graphql-operation"
      );
      const operationVal = request.headers[operationKey];

      if (postDetailType.includes(operationVal)) {
        chrome.debugger.sendCommand(source, "Fetch.continueRequest", {requestId, interceptResponse: true})
        const bodyData = chrome.debugger.sendCommand(source, "Fetch.getResponseBody", { requestId })
      }
    }

    chrome.debugger.sendCommand(source, "Fetch.continueRequest", { requestId });
  }
}

function onAttach(debugInfo) {
  if (chrome.runtime.lastError) {
    return;
  }

  chrome.debugger.sendCommand(debugInfo, "Fetch.enable", {
    patterns: [{ urlPattern: "*" }]
  });
}

function onDetach() {}

function handleTabActive({ tabId }) {
  if (!attachedTabs[tabId]) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      currentTabUrl = tabs[0].url;
      let extractDomain = /^https:\/\/(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/.exec(
        currentTabUrl
      );
      if (
        extractDomain &&
        extractDomain[1] &&
        domainList.some(domain => domain.includes(extractDomain[1]))
      ) {
        currentTabDomain = extractDomain[0];
        currentTabId = tabId;
        attachedTabs[tabId] = "working";

        const debugInfo = { tabId };
        chrome.debugger.attach(
          debugInfo,
          version,
          onAttach.bind(null, debugInfo)
        );
      }
    });
  }
}

exports.initChrome = () => {
  // chrome.tabs.onActivated.addListener(handleTabActive);
  // chrome.debugger.onEvent.addListener(handleDebug);
  // chrome.debugger.onDetach.addListener(onDetach);
};
