
<script lang="ts">
	import Ratings from "../../../comp/Ratings.svelte";
	import { onMount } from 'svelte';
	import AddToWalletButtons from '../../../comp/AddToWalletButtons.svelte';
	import MintUptime from '../../../comp/MintUptime.svelte';
	import { sha256 } from '../../../util/util';
	import MintAvatar from '../../../comp/MintAvatar.svelte';
	import MintInfo from '../../../comp/MintInfo.svelte';
	import nProgress from 'nprogress';
	import { toast } from '../../../stores/toasts';
	import { goto } from '$app/navigation';
	import Rating from '../../../comp/Rating.svelte';
	import { MINT_ADDRESS } from "../../../util/const";
	export let data;

	let isLoading = false;
	let isModalOpen = false;
	let token = '';

	const { mint, info } = data;
	$: color = '555555';
	onMount(async () => {
		color = (await sha256(mint?.url ?? '')).slice(0, 6);
	});

	const doPost = async () => {
		try {
			isLoading = true;
			nProgress.start();
			const res = await fetch('/?/deleteMint', {
				method: 'POST',
				body: JSON.stringify({
					id: mint?.id,
					token
				})
			});
			const json = await res.json();
			if (json.status >= 400) {
				toast('error', json.data, 'could not delete mint');
				return;
			}
			toast('success', mint?.url ?? '', 'Mint deleted from Mintindex');
			isModalOpen = false;
			goto('/')
		} catch (error) {
			console.error(error);
			toast('error', 'unexpected Error', 'could not delete mint');
		} finally {
			nProgress.done();
			isLoading = false;
		}
		
	};
	
</script>

<a href="/" class="btn btn-circle btn-xl btn-secondary">
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
			d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
		/>
	</svg>
</a>
<div class="card bg-base-300 shadow-xl max-w-xl">
	<div class="card-body">
		<div class="flex gap-5">
			<MintAvatar {mint} />
			<div class="flex flex-col gap-2">
				<h2 class="card-title break-all">{mint?.url}</h2>
				<!-- <MintUptime {mint} /> -->
			</div>
		</div>

		{#if info.pubkey}
			<div class="divider">Info</div>

			<MintInfo {info} />
		{/if}

		<div class="divider">Ratings</div>
		<div class="flex flex-col items-center gap-5">
			
			<div class="flex w-full items-center">
				<Rating rating={data.mint?.rating}></Rating>
				<a href="/mint/{mint?.id}/rate" class="btn btn-secondary btn-sm">rate</a>
			</div>
			
			<Ratings ratings={mint?.rating??[]}/>
			
		</div>


		<div class="divider" />

		<div class="card-actions justify-between items-center">
			<AddToWalletButtons {mint} />
			
			<label for="delete-mint-modal" class="btn btn-error">Delete</label>
		</div>
	</div>
</div>

<input type="checkbox" id="delete-mint-modal" class="modal-toggle" bind:checked={isModalOpen} />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Deleting a mint is a Nuttable offense!</h3>
		<p class="py-4">
			it will cost you <span class="text-secondary"> 65536 nuts </span> from the mint:
			<a
				class="link link-secondary text-sm"
				href="https://wallet.nutstash.app/?mint={MINT_ADDRESS}"
				target="_blank"
				rel="noopener noreferrer">{MINT_ADDRESS}</a
			>
		</p>
		<div class="flex gap-2 items-center">
			<div class="flex flex-col gap-2">
				<div class="form-control">
					<label class="input-group">
						<span>Token</span>
						<input bind:value={token} type="text" class="input input-secondary" name="token" />
					</label>
				</div>
			</div>
		</div>
		<div class="modal-action">
			<label for="delete-mint-modal" class="btn">cancel</label>
			<button
				on:click={doPost}
				class="btn { !token || isLoading ? 'btn-disabled' : 'btn-secondary'} {isLoading ? 'loading' : ''} ">Delete</button
			>
		</div>
	</div>
</div>
