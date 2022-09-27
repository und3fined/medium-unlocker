<!--
 | File: App.svelte
 | Project: medium-unlocker
 | File Created: 31 Dec 2021 20:33:17
 | Author: und3fined (me@und3fined.com)
 | -----
 | Last Modified: 27 Sep 2022 11:01:01
 | Modified By: und3fined (me@und3fined.com)
 | -----
 | Copyright (c) 2021 und3fined.com
-->
<script>
  import { onMount } from 'svelte';
  import { memberShipId, registerWall } from './constants';
  import { hasElm } from './utils';

  export let name;

  onMount(() => {
    const mediumMeterElm = document.querySelector(`article.meteredContent > div > div`)

    if (mediumMeterElm && mediumMeterElm.innerText.includes('free member-only stories left this month.')) {
      mediumMeterElm.style.display = 'none';
    }

    const interval = setInterval(() => {
      if (!!hasElm(memberShipId) || !!hasElm(registerWall)) {
        window.location.reload();
      }
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<div style="position:fixed;top:0;right:0;z-index:9999;width:64px;height:64px">
  <h1 style="visibility: hidden;">{name}</h1>
</div>