
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35732/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var content = (function () {
  'use strict';

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

  var memberShipId$1 = 'paywall-fewerClicksHeading';
  var registerWall$1 = 'regwall-heading';

  var domainList = [
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
  	memberShipId: memberShipId$1,
  	registerWall: registerWall$1,
  	domainList: domainList
  };

  /**
   * File: content.js
   * Project: medium-unlocker
   * File Created: 23 Dec 2021 10:33:39
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 23 Dec 2021 20:35:23
   * Modified By: und3fined (me@und3fined.com)
   * -----
   * Copyright (c) 2021 und3fined.com
   */

  const { memberShipId, registerWall } = constants;

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

  chrome.runtime.sendMessage({ request: "fetch-cookie" });

  // document.body.style.border = "5px solid red";

  var content = {

  };

  return content;

})();
//# sourceMappingURL=content.js.map
