<script lang="ts">
	import type { Rating } from "@prisma/client";
	import RatingCard from "./RatingCard.svelte";

export let ratings: Rating[]

$: page = 1;
	$: ratingSub = ratings.slice(0, page);

	const loadMore = () => {
		page += 5;
	};
</script>

{#each ratingSub as rating}
     <RatingCard {rating}>

     </RatingCard>
{/each}


<div>
    <button class="btn btn-secondary rounded-full btn-xs" on:click={loadMore}>...
        
    </button>
</div>