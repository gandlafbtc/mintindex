<script lang="ts">
	import Star from './Star.svelte';

	export let rating: { weight: number; points: number }[];
	let count = rating.length;
	let average = count
		? (rating.reduce((acc, r) => r.points + acc, 0) / count).toFixed(2)
		: 'no rating';
	let stars = average.split('.');
	let fullStars = +stars[0];
	let brokenStar = +stars[1];
</script>

<div>
	{#if average != 'no rating'}
		<div class="flex gap-0.5 w-44 items-start">
			{#each { length: fullStars } as item}
				<Star />
			{/each}
			<Star breakage={brokenStar} />
		</div>
	{:else}
		<!-- else content here -->
	{/if}
	<p>
		{average}
		({count})
	</p>
</div>

<style>
</style>
