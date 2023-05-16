<script lang="ts">
	import type { Rating as R } from '@prisma/client';
	import Rating from './Rating.svelte';

	export let rating: R;
</script>

<div class="p-3 w-full bg-base-100 rounded-md">
	<div class="grid grid-cols-1 lg:grid-cols-4 items-center gap-2">
		<p>author:</p>
		<p class="text-secondary col-span-3">{rating.author === '' ? '@anon' : rating.author}</p>
		<p>rating:</p>
		<div class="text-secondary col-span-3">
			<Rating rating={[rating]} />
		</div>
		<p>Comment:</p>
		<p class=" col-span-3 break-all">{rating.details === '' ? '...' : rating.details}</p>
	</div>
</div>
