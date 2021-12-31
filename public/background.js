
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var background = (function () {
  'use strict';

  /**
   * File: constants.js
   * Project: svelte-app
   * File Created: 22 Dec 2021 14:22:09
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 31 Dec 2021 19:42:41
   * Modified By: und3fined (me@und3fined.com)
   * -----
   * Copyright (c) 2021 und3fined.com
   */
  var operationName = {
    cookieStatus: 'PostMeter',
    postContent: 'PostViewerEdgeContentQuery'
  };

  var operationSelector = {
    cookieStatus: 'data.meterPost.unlocksRemaining'
  };

  var memberShipId = 'paywall-fewerClicksHeading';
  var registerWall = 'regwall-heading';

  var domainList$1 = [
    "https://medium.com/*",
    "https://*.medium.com/*",
    "https://towardsdatascience.com/*",
    "https://hackernoon.com/*",
    "https://medium.freecodecamp.org/*",
    "https://psiloveyou.xyz/*",
    "https://betterhumans.coach.me/*",
    "https://codeburst.io/*",
    "https://theascent.pub/*",
    "https://medium.mybridge.co/*",
    "https://uxdesign.cc/*",
    "https://levelup.gitconnected.com/*",
    "https://itnext.io/*",
    "https://entrepreneurshandbook.co/*",
    "https://proandroiddev.com/*",
    "https://blog.prototypr.io/*",
    "https://thebolditalic.com/*",
    "https://blog.usejournal.com/*",
    "https://blog.angularindepth.com/*",
    "https://blog.bitsrc.io/*",
    "https://blog.devartis.com/*",
    "https://blog.maddevs.io/*",
    "https://blog.getambassador.io/*",
    "https://uxplanet.org/*",
    "https://instagram-engineering.com/*",
    "https://calia.me/*",
    "https://productcoalition.com/*",
    "https://engineering.opsgenie.com/*",
    "https://android.jlelse.eu/*",
    "https://robinhood.engineering/*",
    "https://blog.hipolabs.com/*",
    "https://ux.shopify.com/*",
    "https://enlear.academy/*",
  ];

  var constants = {
  	operationName: operationName,
  	operationSelector: operationSelector,
  	memberShipId: memberShipId,
  	registerWall: registerWall,
  	domainList: domainList$1
  };

  /**
   * File: utils.js
   * Project: medium-unlocker
   * File Created: 23 Dec 2021 11:12:59
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 31 Dec 2021 21:10:11
   * Modified By: und3fined (me@und3fined.com)
   * -----
   * Copyright (c) 2021 und3fined.com
   */
  const uIdPattern = '0123456789abcdef';
  const sIdPattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._/';

  function generateId(length, characters) {
    let result = '';
    let charsLen = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charsLen));
    }

    return result;
  }

  var generateUID$1 = () => {
    return `lo_${generateId(12, uIdPattern)}`;
  };

  var generateSID$1 = () => {
    return `1:${generateId(64, sIdPattern)}`
  };

  var getBeforeSendExtraInfoSpec$1 = () => {
    const extraInfoSpec = ["blocking", "requestHeaders"];
    if (
      chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty("EXTRA_HEADERS")
    ) {
      extraInfoSpec.push("extraHeaders");
    }
    return extraInfoSpec;
  };

  var getHeaders$1 = (headers, headerName, condition) => {
    return headers.filter(({ name }) => condition(name.toLowerCase(), headerName));
  };

  var hasElm = (elm) => {
    return !!document.getElementById(elm);
  };

  var utils = {
  	generateUID: generateUID$1,
  	generateSID: generateSID$1,
  	getBeforeSendExtraInfoSpec: getBeforeSendExtraInfoSpec$1,
  	getHeaders: getHeaders$1,
  	hasElm: hasElm
  };

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

  const { domainList } = constants;
  const {
    generateUID,
    generateSID,
    getBeforeSendExtraInfoSpec,
    getHeaders
  } = utils;

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

  var background = {

  };

  return background;

})();
//# sourceMappingURL=background.js.map
