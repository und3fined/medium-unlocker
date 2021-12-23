
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var background = (function () {
  'use strict';

  /*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */

  /**
   * Module exports.
   * @public
   */

  var parse_1 = parse;
  var serialize_1 = serialize;

  /**
   * Module variables.
   * @private
   */

  var decode = decodeURIComponent;
  var encode = encodeURIComponent;
  var pairSplitRegExp = /; */;

  /**
   * RegExp to match field-content in RFC 7230 sec 3.2
   *
   * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
   * field-vchar   = VCHAR / obs-text
   * obs-text      = %x80-FF
   */

  var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

  /**
   * Parse a cookie header.
   *
   * Parse the given cookie header string into an object
   * The object has the various cookies as keys(names) => values
   *
   * @param {string} str
   * @param {object} [options]
   * @return {object}
   * @public
   */

  function parse(str, options) {
    if (typeof str !== 'string') {
      throw new TypeError('argument str must be a string');
    }

    var obj = {};
    var opt = options || {};
    var pairs = str.split(pairSplitRegExp);
    var dec = opt.decode || decode;

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      var eq_idx = pair.indexOf('=');

      // skip things that don't look like key=value
      if (eq_idx < 0) {
        continue;
      }

      var key = pair.substr(0, eq_idx).trim();
      var val = pair.substr(++eq_idx, pair.length).trim();

      // quoted values
      if ('"' == val[0]) {
        val = val.slice(1, -1);
      }

      // only assign once
      if (undefined == obj[key]) {
        obj[key] = tryDecode(val, dec);
      }
    }

    return obj;
  }

  /**
   * Serialize data into a cookie header.
   *
   * Serialize the a name value pair into a cookie string suitable for
   * http headers. An optional options object specified cookie parameters.
   *
   * serialize('foo', 'bar', { httpOnly: true })
   *   => "foo=bar; httpOnly"
   *
   * @param {string} name
   * @param {string} val
   * @param {object} [options]
   * @return {string}
   * @public
   */

  function serialize(name, val, options) {
    var opt = options || {};
    var enc = opt.encode || encode;

    if (typeof enc !== 'function') {
      throw new TypeError('option encode is invalid');
    }

    if (!fieldContentRegExp.test(name)) {
      throw new TypeError('argument name is invalid');
    }

    var value = enc(val);

    if (value && !fieldContentRegExp.test(value)) {
      throw new TypeError('argument val is invalid');
    }

    var str = name + '=' + value;

    if (null != opt.maxAge) {
      var maxAge = opt.maxAge - 0;

      if (isNaN(maxAge) || !isFinite(maxAge)) {
        throw new TypeError('option maxAge is invalid')
      }

      str += '; Max-Age=' + Math.floor(maxAge);
    }

    if (opt.domain) {
      if (!fieldContentRegExp.test(opt.domain)) {
        throw new TypeError('option domain is invalid');
      }

      str += '; Domain=' + opt.domain;
    }

    if (opt.path) {
      if (!fieldContentRegExp.test(opt.path)) {
        throw new TypeError('option path is invalid');
      }

      str += '; Path=' + opt.path;
    }

    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== 'function') {
        throw new TypeError('option expires is invalid');
      }

      str += '; Expires=' + opt.expires.toUTCString();
    }

    if (opt.httpOnly) {
      str += '; HttpOnly';
    }

    if (opt.secure) {
      str += '; Secure';
    }

    if (opt.sameSite) {
      var sameSite = typeof opt.sameSite === 'string'
        ? opt.sameSite.toLowerCase() : opt.sameSite;

      switch (sameSite) {
        case true:
          str += '; SameSite=Strict';
          break;
        case 'lax':
          str += '; SameSite=Lax';
          break;
        case 'strict':
          str += '; SameSite=Strict';
          break;
        case 'none':
          str += '; SameSite=None';
          break;
        default:
          throw new TypeError('option sameSite is invalid');
      }
    }

    return str;
  }

  /**
   * Try decoding a string using a decoding function.
   *
   * @param {string} str
   * @param {function} decode
   * @private
   */

  function tryDecode(str, decode) {
    try {
      return decode(str);
    } catch (e) {
      return str;
    }
  }

  var cookie = {
  	parse: parse_1,
  	serialize: serialize_1
  };

  /**
   * File: constants.js
   * Project: svelte-app
   * File Created: 22 Dec 2021 14:22:09
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 23 Dec 2021 16:50:34
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
  ];

  var constants = {
  	operationName: operationName,
  	operationSelector: operationSelector,
  	memberShipId: memberShipId,
  	registerWall: registerWall,
  	domainList: domainList$1
  };

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

  const { domainList } = constants;

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
    console.info('fetchCookie');
    try {
      if (cookieFetching) return;
      cookieFetching = true;

      chrome.storage.local.get(['unlocker'], function(result) {
        if (!result['unlocker'] || result['unlocker'].unlocksRemaining < 1) remoteCookie();
        else {
          cookieFetching = false;
          cookieTemp = result['unlocker'];
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

    needPatch.push(requestId);

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
  );

  var background = {

  };

  return background;

})();
//# sourceMappingURL=background.js.map
