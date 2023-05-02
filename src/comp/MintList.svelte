<script lang="ts">
	import type { Mint } from "@prisma/client";
	import MintCard from "./MintCard.svelte";
	export let mints: Mint[]
</script>

{#each mints as mint}
    <MintCard {mint}></MintCard>
{/each}