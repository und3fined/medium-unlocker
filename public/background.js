
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  /**
   * File: generate-cookie.js
   * Project: medium-unlocker
   * File Created: 22 Dec 2021 14:42:26
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 22 Dec 2021 15:13:13
   * Modified By: und3fined (me@und3fined.com)
   * -----
   * Copyright (c) 2021 und3fined.com
   */

  function generateCookie() {
    document.title = "Unlocking...";
    // fetch(targetPage, {
    //   method: "GET",
    //   cache: "no-cache",
    // })
    //   .then((response) => {
    //     console.log("response", response);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  /**
   * File: background.js
   * Project: svelte-app
   * File Created: 22 Dec 2021 14:17:58
   * Author: und3fined (me@und3fined.com)
   * -----
   * Last Modified: 22 Dec 2021 15:23:25
   * Modified By: und3fined (me@und3fined.com)
   * -----
   * Copyright (c) 2021 und3fined.com
   */

  var targetPage = "https://medium.com";

  // Add the new header to the original array,
  // and return it.
  function setCookie(e) {
    var setMyCookie = {
      name: "Set-Cookie",
      value: "my-cookie1=my-cookie-value1"
    };
    e.responseHeaders.push(setMyCookie);
    return {responseHeaders: e.responseHeaders};
  }

  // Listen for onHeaderReceived for the target page.
  // Set "blocking" and "responseHeaders".
  browser.webRequest.onHeadersReceived.addListener(
    setCookie,
    {urls: [targetPage]},
    ["blocking", "responseHeaders"]
  );

  generateCookie();

  document.body.style.border = "5px solid red";

})();
//# sourceMappingURL=background.js.map
