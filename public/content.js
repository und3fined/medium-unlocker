
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
	'use strict';

	/**
	 * File: content.js
	 * Project: medium-unlocker
	 * File Created: 23 Dec 2021 10:33:39
	 * Author: und3fined (me@und3fined.com)
	 * -----
	 * Last Modified: 23 Dec 2021 14:38:50
	 * Modified By: und3fined (me@und3fined.com)
	 * -----
	 * Copyright (c) 2021 und3fined.com
	 */

	chrome.runtime.sendMessage({ request: "fetch-cookie" });

	document.body.style.border = "5px solid red";

})();
//# sourceMappingURL=content.js.map
