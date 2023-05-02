<script lang="ts">
	import { onMount } from "svelte";
	import { sha256 } from "../util/util";
	import type { Mint } from "@prisma/client";


    export let mint: Mint;
    $: color = '555555'
    onMount(async ()=>{
        color = (await sha256(mint?.url??'')).slice(0,6)
    })
</script>

<div class="avatar">
    <div class="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <div class="w-full h-full" style="background-color: #{color};">

        </div>
    </div>
</div>