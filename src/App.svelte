<!--
 | File: App.svelte
 | Project: medium-unlocker
 | File Created: 31 Dec 2021 20:33:17
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 13 Jul 2023 20:08:43
 | Modified By: und3fined (me@und3fy.dev)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script>
  import { onMount } from "svelte";
  import { memberShipId, registerWall } from "./constants";
  import { hasElm } from "./utils";

  let hidded = false;

  function hideAlert(interval) {
    if (hidded && interval) clearInterval(interval);
    const mediumMeterElm = document.querySelector(
      `article.meteredContent > div > div`
    );

    if (!mediumMeterElm) return () => {};

    const alertContent = mediumMeterElm.innerText;
    const hasAlert1 = alertContent.includes("unlimited access");
    const hasAlert2 = alertContent.includes(
      "free member-only stories left this month"
    );

    if (hasAlert1 || hasAlert2) {
      const contentP = mediumMeterElm.querySelector("p");
      if (contentP) {
        contentP.innerHTML =
          'Your content is unlocked by <strong>Medium Unlocker</strong>.<br /><a target="_blank" href="https://ko-fi.com/und3fy?ref=medium">Buy for Medium Unlocker a coffee</a> if you like it via <a target="_blank" href="https://ko-fi.com/und3fy?ref=medium"><u>here</u></a>.';
      } else {
        mediumMeterElm.style.display = "none";
      }
      hidded = true;
    }
  }

  onMount(() => {
    const alertInterval = setInterval(() => hideAlert(alertInterval), 200);

    const interval = setInterval(() => {
      if (!!hasElm(memberShipId) || !!hasElm(registerWall)) {
        window.location.reload();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      return alertInterval && clearInterval(alertInterval);
    };
  });
</script>

<div style="position: fixed;z-index:1;bottom: 0;left: 0;width: 100%;min-height: 32px;text-align:center;padding: 8px 12px;background:white;border-top: 1px solid rgba(0,0,0,0.2)">
  <h3>
    The content unlocked by <a href="https://github.com/und3fined/medium-unlocker?ref=medium" target="_blank">Medium Unlocker</a>.
    Please <a target="_blank" href="https://ko-fi.com/und3fy?ref=medium">buy for Medium Unlocker a coffee</a> via <a target="_blank" href="https://ko-fi.com/und3fy?ref=medium"><u>here</u></a>
  </h3>
</div>
