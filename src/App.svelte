<!--
 | File: App.svelte
 | Project: medium-unlocker
 | File Created: 31 Dec 2021 20:33:17
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 15 Oct 2022 16:46:26
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script>
  import { onMount } from 'svelte';
  import { memberShipId, registerWall } from './constants';
  import { hasElm } from './utils';

  export let name;
  let hidded = false;

  function hideAlert(interval) {
    if (hidded && interval) clearInterval(interval);
    const mediumMeterElm = document.querySelector(`article.meteredContent > div > div`);

    if (!mediumMeterElm) return () => {};

    const alertContent = mediumMeterElm.innerText;
    const hasAlert1 = alertContent.includes('unlimited access');
    const hasAlert2 = alertContent.includes('free member-only stories left this month');

    if (hasAlert1 || hasAlert2) {
      const contentP = mediumMeterElm.querySelector('p');
      if (contentP) {
        contentP.innerHTML = 'Your content is unlocked by <strong>Medium Unlocker</strong>.<br /><a target="_blank" href="https://www.buymeacoffee.com/und3fined?ref=medium">Buy for Medium Unlocker a coffee</a> if you like it via <a target="_blank" href="https://www.buymeacoffee.com/und3fined?ref=medium"><u>here</u></a>.';
      } else {
        mediumMeterElm.style.display = 'none';
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
      return (alertInterval && clearInterval(alertInterval))
    }
  });
</script>

<div style="position:fixed;top:0;right:0;z-index:9999;width:64px;height:64px">
  <h1 style="visibility: hidden;">{name}</h1>
</div>