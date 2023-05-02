<script>
	import nprogress from 'nprogress';
	import { toast } from '../stores/toasts';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let mintURL = '';
	let token = '';
	let isModalOpen = false;
	let isLoading = false;

	const doPost = async () => {
		try {
			isLoading = true
			nprogress.start();
			const res = await fetch('/?/createMint', {
				method: 'POST',
				body: JSON.stringify({
					url: mintURL,
					token
				})
		});
		const json = await res.json();
		if (json.status >= 400) {
			toast('error', json.data, 'could not add mint');
			return;
		}
		const id = JSON.parse(json.data)[2]
		toast('success', mintURL, 'Mint added to Mintindex');
		isModalOpen = false;
		goto('/mint/'+id)
		} catch (error) {
			console.log(error)
			toast('error', 'unexpected Error', 'could not add mint');
		
	}finally{
		nprogress.done();
		isLoading = false
	}
		
		
	};
</script>

<div class="flex gap-2 items-center">
	<input bind:value={mintURL} type="text" class="input input-secondary" />

	<label for="add-mint-modal" class="btn {mintURL ? 'btn-secondary' : 'btn-disabled'}"
		>Add a mint</label
	>
</div>

<input type="checkbox" id="add-mint-modal" class="modal-toggle" bind:checked={isModalOpen} />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Adding a mint is a Nuttable offense!</h3>
		<p class="py-4">
			it will cost you <span class="text-secondary">21 nuts</span>  from the mint:
			<a class="link link-secondary text-sm"
				href="https://wallet.nutstash.app/?mint=https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC"
				target="_blank"
				rel="noopener noreferrer">https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC</a
			>
		</p>
		<div class="flex gap-2 items-center">
			<div class="flex flex-col gap-2">
				<div class="form-control">
					<label class="input-group">
						<span>Mint</span>
						<input bind:value={mintURL} type="text" class="input input-disabled" name="url" />
					</label>
				</div>
				<div class="form-control">
					<label class="input-group">
						<span>Token</span>
						<input bind:value={token} type="text" class="input input-secondary" name="token" />
					</label>
				</div>
			</div>
		</div>
		<div class="modal-action">
			<label for="add-mint-modal" class="btn">cancel</label>
			<button on:click={doPost} class="btn { !token || isLoading ? 'btn-disabled' : 'btn-secondary'} {isLoading? "loading":''} ">Add</button>
		</div>
	</div>
</div>