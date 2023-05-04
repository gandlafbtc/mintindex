<script lang="ts">
	import type { Mint } from "@prisma/client";
	import MintCard from "./MintCard.svelte";
	export let mints: Mint[]
	export let filter: string
	$: filteredMints = mints.filter(m=>{
		return m.url.includes(filter)
	}) 

</script>
{#if filteredMints.length}
{#each filteredMints as mint}
<MintCard {mint}></MintCard>
{/each}
{:else}
	click the search button to look for more mints
{/if}