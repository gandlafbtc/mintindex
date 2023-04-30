<script lang="ts">
	import AddMint from '../comp/AddMint.svelte';
	import MintList from '../comp/MintList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ mints } = data);
</script>

<input
	type="text"
	placeholder="Find a mint..."
	class="input-lg input input-primary w-full max-w-md m-2"
/>
<MintList {mints} />
<AddMint />
