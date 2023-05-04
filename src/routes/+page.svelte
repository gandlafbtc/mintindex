<script lang="ts">
	import AddMint from '../comp/AddMint.svelte';
	import MintList from '../comp/MintList.svelte';
	import type { PageData } from './$types';
	import { previous, current } from '../stores/cursor';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;
	$: filter = '';


	previous.set($current < $previous ? $current : $previous);
	if (data.mints) {
		current.set(data.mints[data.mints.length - 1].id);
	}

	function handleKeyDown(e) {
    if (e.key === "Enter") {
      goto("/?filter="+filter);
    }
  }
	
</script>

<div class="flex max-w-md items-center">
	<input
		bind:value={filter}
		on:keydown={handleKeyDown}
		type="text"
		placeholder="Find a mint..."
		class="input-lg input input-primary w-full max-w-md m-2"
	/>
	<a href="/?filter={filter}" class="btn btn-primary btn-lg btn-square">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	</a>
</div>
<AddMint />
<MintList mints={data.mints} {filter} />
<div class="flex gap-3">
	{#if $page.url.searchParams.get('cursor')}
		{#if $previous === 0}
			<a href="/" class="btn btn-secondary btn-sm">previous</a>
		{:else}
			<a href="/?cursor={$previous}" class="btn btn-secondary btn-sm">previous</a>
		{/if}
	{/if}
	{#if data.mints.length === 10}
	<a href="/?cursor={$current}" class="btn btn-secondary btn-sm">next</a>
	{/if}
</div>
