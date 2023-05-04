<script lang="ts">
	import nProgress from 'nprogress';
	import AddMint from '../../../../comp/AddMint.svelte';
	import { toast } from '../../../../stores/toasts';
	import { goto } from '$app/navigation';

    
	export let data;
	
    let isLoading =false
    
    let points = 3;
	let author = '';
	let details = '';
	let nut = '';
	const doPost =async () => {

		const post = {
			points,
			author,
			details,
			nut
		};
        try {
			isLoading = true
			nProgress.start();
			const res = await fetch(`/mint/${data.mint?.id}/rate?/createRating`, {
				method: 'POST',
				body: JSON.stringify(post)
		});
		const json = await res.json();
		if (json.status >= 400) {
			toast('error', json.data, 'could not add review for mint');
			return;
		}
		const id = JSON.parse(json.data)[2]
		toast('success', data.mint?.url??'', 'Added review for mint');
		goto('/mint/'+data.mint.id)
		} catch (error) {
			console.error(error)
			toast('error', 'unexpected Error', 'could not add review for mint mint');
		
	}finally{
		nProgress.done();
		isLoading = false
	}
	};


</script>


<div class="flex flex-col max-w-2xl gap-3">
    <div class="flex gap-5 items-center">

    <a href="/mint/{data.mint.id}" class="btn btn-circle btn-xl btn-secondary">
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
	<p class="w-full text-center">
		Leave a review for the mint {data.mint?.url}
	</p>
</div>

    <div class="divider">
        review
    </div>
	<div class="form-control">
		<label class="input-group">
			<span>Author</span>
			<input bind:value={author} type="text" placeholder="@someguy" class="input input-bordered" />
		</label>
	</div>
	<div class="form-control">
		<label for="rating-comment" class="label">
			<span class="label-text">Comment</span>
		</label>
		<textarea bind:value={details}
			id="rating-comment"
			placeholder="..."
			class="textarea extarea-bordered textarea-secondary"
		/>
	</div>
	<div class="form-control flex">
		<label for="rating-rating" class="label">
			<span class="label-text">rating</span>
		</label>
		<div id="rating-rating" class="rating">
			<input value={1} bind:group={points} type="radio" name="rating-1" class="mask mask-star bg-secondary" />
			<input value={2} bind:group={points} type="radio" name="rating-1" class="mask mask-star bg-secondary" />
			<input value={3} bind:group={points} type="radio" name="rating-1" class="mask mask-star bg-secondary" />
			<input value={4} bind:group={points} type="radio" name="rating-1" class="mask mask-star bg-secondary" />
			<input value={5} bind:group={points} type="radio" name="rating-1" class="mask mask-star bg-secondary" />
		</div>
	</div>
    <div class="divider">
        Nuts
    </div>
	<div class="form-control flex gap-2">
		<label class="input-group">
			<span>Nut</span>
			<input
				bind:value={nut}
				type="text"
				placeholder="cashuAey..."
				class="input input-bordered"
			/>
		</label>
        <p>Leaving a review costs <span class="text-secondary"> 4 </span> nuts</p>
	</div>
	<button class="btn-secondary btn" on:click={doPost}> Rate! </button>
</div>
