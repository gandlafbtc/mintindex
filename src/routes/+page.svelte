<script lang="ts">
import AddMint from "../comp/AddMint.svelte";
import MintList from "../comp/MintList.svelte";
	import type { PageData } from "./$types";

export let data: PageData

$: ({mints} = data) 

</script>
<div class="w-full flex justify-center flex-col items-center gap-8">
    <h1 class="text-4xl">
        MINTINDEX - Find a cashu mint
    </h1>
    <input type="text" placeholder="Find a mint..." class="input-lg input input-primary w-full max-w-md m-2" />
    <MintList {mints}></MintList>
    <AddMint></AddMint>
</div>
