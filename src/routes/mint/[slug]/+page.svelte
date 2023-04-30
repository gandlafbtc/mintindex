<script lang="ts">
	import { onMount } from 'svelte';
	import AddToWalletButtons from '../../../comp/AddToWalletButtons.svelte';
    import MintUptime from '../../../comp/MintUptime.svelte';
	import { sha256 } from '../../../util/util';
	import MintAvatar from '../../../comp/MintAvatar.svelte';
	import MintInfo from '../../../comp/MintInfo.svelte';
	export let data;
	const { mint, info } = data;
    $: color = '555555'
    onMount(async ()=>{
        color = (await sha256(mint?.url??'')).slice(0,6)
    })
    console.log(info)
</script>

<div class="card bg-base-300 shadow-xl max-w-xl">
	<div class="card-body">
		<div class="flex gap-5">
			<MintAvatar {mint}></MintAvatar>
			<div class="flex flex-col gap-2">
				<h2 class="card-title break-all">{mint?.url}</h2>
				<MintUptime {mint} />
			</div>
		</div>
        
        {#if info.pubkey}
        <div class="divider">
        </div>

        <MintInfo {info}></MintInfo>
        {/if}

        <div class="divider">
        </div>
        
		<div class="card-actions justify-between items-center">
            <AddToWalletButtons {mint}></AddToWalletButtons>
				<form action="/?/deleteMint&id={mint?.id}" method="post">
					<button type="submit" class="btn btn-error">Delete</button>
				</form>
		</div>
	</div>
</div>
