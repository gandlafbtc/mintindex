<script lang="ts">
	import type { Mint } from "../model/model";
	import MintCard from "./MintCard.svelte";
	export let mints: Mint[]
</script>

{#each mints as mint}
    <MintCard {mint}></MintCard>
{/each}