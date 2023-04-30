<script lang="ts">
	import type { Mint } from "@prisma/client";

 export let mint: Mint

</script>
<div>
    <a href="https://wallet.nutstash.app/?mint={mint.url}" target="_blank" rel="noopener noreferrer" class="btn btn-square btn-sm">
        <img src="/nut.svg" alt="">
    </a>
</div>