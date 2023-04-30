<script lang="ts">
	import type { Mint } from '../model/model';
	import MintAvatar from './MintAvatar.svelte';
	import MintUptime from './MintUptime.svelte';

	export let mint: Mint;
</script>

<a href="mint/{mint.id}" class="card w-96 glass">
    <div class="card-body">
        <div class="flex gap-5 items-center">
            <MintAvatar {mint}></MintAvatar>

            <div class="flex flex-col gap-1">
                <div class="text-lg font-bold text-secondary break-all">{mint.url}</div>
                <div>
                    <MintUptime {mint}></MintUptime>
                </div>
            </div>
        </div>
	</div>
</a>
