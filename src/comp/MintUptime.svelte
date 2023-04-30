<script lang="ts">
	import type { Mint } from "@prisma/client";

    export let mint: Mint

    const uptimes = [0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1]

</script>

<div class="flex flex-col gap-1">
    <p class="text-sm">
        uptime:
    </p>
    <div class="w-32 h-5 flex gap-1">
        {#each uptimes as uptime}
        <div class="w-1 rounded-full h-full {uptime?'bg-success':'bg-error'}"></div>
        {/each}
    </div>
</div>