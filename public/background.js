
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var background = (function () {
  'use strict';

  /**
   * File: constants.js
   * Project: svelte-app
   * File Created: 22 Dec 2021 14:22:09
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 20 May 2023 11:36:57
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
    "https://towardsaws.com/*",
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
    "https://www.cantorsparadise.com/*",
    "https://betterprogramming.pub/*",
    "https://blog.roost.io/*",
    "https://500ish.com/*",
    "https://faun.pub/*",
    "https://towardsdev.com/*",
    "https://writingcooperative.com/*",
    'https://asleekgeek.com/*',
    'https://andrewzuo.com/*',
    'https://awstip.com/*',
    'https://baos.pub/*',
    'https://*.plainenglish.io/*',
    'https://betterappsec.com/*',
    'https://betterhumans.pub/*',
    'https://bettermarketing.pub/*',
    'https://blog.angulartraining.com/*',
    'https://blog.codegiant.io/*',
    'https://blog.coffeeapplied.com/*',
    'https://blog.devgenius.io/*',
    'https://blog.devops.dev/*',
    'https://blog.kotlin-academy.com/*',
    'https://blog.kubernauts.io/*',
    'https://blog.securitybreak.io/*',
    'https://blog.securityevaluators.com/*',
    'https://blog.startupstash.com/*',
    'https://bootcamp.uxdesign.cc/*',
    'https://bytes.grubhub.com/*',
    'https://code.likeagirl.io/*',
    'https://coinsbench.com/*',
    'https://eand.co/*',
    'https://engineering.talkdesk.com/*',
    'https://infosecwriteups.com/*',
    'https://interviewnoodle.com/*',
    'https://levelupprogramming.net/*',
    'https://marcbalmer.ch/*',
    'https://medium.datadriveninvestor.com/*',
    'https://medium.matcha.fyi/*',
    'https://netflixtechblog.com/*',
    'https://pub.towardsai.net/*',
    'https://systemweakness.com/*',
    'https://tech.olx.com/*',
    'https://techuisite.com/*',
    'https://themakingofamillionaire.com/*',
    'https://trading-data-analysis.pro/*',
    'https://unbounded.io/*',
    'https://wire.insiderfinance.io/*',
    'https://www.inbitcoinwetrust.net/*',
    'https://blog.dancounsell.com/*',
    'https://experiencestack.co/*',
    'https://golang.thisweekin.io/*',
    'https://insightsndata.com/*',
    'https://artificialcorner.com/*'
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
   * Last Modified: 14 Jan 2022 19:34:35
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

  var getHeaderReceivedExtraInfoSpec$1 = () => {
    const extraInfoSpec = ["blocking", "responseHeaders"];
    if (
      chrome.webRequest.OnHeadersReceivedOptions.hasOwnProperty("EXTRA_HEADERS")
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

  var getRealObjectKey = (obj, key) => {
    return Object.keys(obj).find(name => name.toLowerCase() === key)
  };

  var utils = {
  	generateUID: generateUID$1,
  	generateSID: generateSID$1,
  	getBeforeSendExtraInfoSpec: getBeforeSendExtraInfoSpec$1,
  	getHeaderReceivedExtraInfoSpec: getHeaderReceivedExtraInfoSpec$1,
  	getHeaders: getHeaders$1,
  	hasElm: hasElm,
  	getRealObjectKey: getRealObjectKey
  };

  /**
   * File: chrome.js
   * Project: medium-unlocker
   * File Created: 14 Jan 2022 16:35:00
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 27 Sep 2022 10:54:02
   * Modified By: und3fined (me@und3fined.com)
   * -----
   * Copyright (c) 2022 und3fined.com
   */

  var initChrome$1 = () => {
    // chrome.tabs.onActivated.addListener(handleTabActive);
    // chrome.debugger.onEvent.addListener(handleDebug);
    // chrome.debugger.onDetach.addListener(onDetach);
  };

  var chrome_1 = {
  	initChrome: initChrome$1
  };

  /**
   * File: background.js
   * Project: svelte-app
   * File Created: 22 Dec 2021 14:17:58
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 13 Jul 2023 18:39:42
   * Modified By: und3fined (me@und3fy.dev)
   * -----
   * Copyright (c) 2021 und3fined.com
   */

  const { domainList } = constants;
  const {
    generateUID,
    generateSID,
    getBeforeSendExtraInfoSpec,
    getHeaderReceivedExtraInfoSpec,
    getHeaders
  } = utils;

  const {initChrome} = chrome_1;

  const mediumGraphql = "/_/graphql";
  const postDetailType = ["PostViewerEdgeContentQuery", "PostHandler", "PostPageQuery", "PostPageMeterQuery"];
  const viewerProfile = ["ViewerQuery"];

  let needPatch = [];
  let userId = '';

  function rewriteCookieHeader({ url, requestId, requestHeaders }) {
    if (url.endsWith(mediumGraphql) === false) {
      return { requestHeaders };
    }

    const operations = requestHeaders.filter(
      ({ name }) => name.toLowerCase() === "graphql-operation"
    );

    if (operations.length && viewerProfile.includes(operations[0].value)) {
      needPatch.push(requestId);
      return { requestHeaders };
    }


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
          let guestId = new RegExp(`${parseContent[2]}`, 'g');
          content = content.replace(guestId, userId);
        }

        let nextContent = JSON.parse(content);
        nextContent = nextContent.map(item => {
          if (item.data && item.data.post && item.data.post.viewerEdge) {
            item.data.post.viewerEdge.fullContent.isLockedPreviewOnly = false;
          }

          if (item.data && item.data.viewer) {
            item.data.viewer.isSubscriber = true;
            item.data.viewer.hasPastMemberships = true;
            item.data.viewer.mediumMemberAt = new Date().getTime();
            item.data.viewer.isPartnerProgramEnrolled = true;
          }

          return item;
        });

        content = JSON.stringify(nextContent);
      }

      filter.write(encoder.encode(content));
      filter.close();
    };
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
    initChrome();
  }

  var background = {

  };

  return background;

})();
//# sourceMappingURL=background.js.map
