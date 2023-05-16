<script lang="ts">
	export let info: {
		contact: [];
		name: string;
		pubkey: string;
		nuts: string[];
		version: string;
	};
</script>

<div class="flex flex-col gap-2">
	<div class="grid grid-cols-1 lg:grid-cols-4">
		<p class="">Name:</p>
		<p class="col-span-3 break-all text-secondary">
			{info.name}
		</p>
		<p class="">Version:</p>
		<p class="col-span-3 break-all text-secondary">
			{info.version}
		</p>
		<p class="">NUTS:</p>
		<p class="col-span-3 break-all text-secondary">
			{info.nuts.join(',')}
		</p>
		<p class="">Pubkey:</p>
		<p class="col-span-3 break-all text-secondary">
			{info.pubkey}
		</p>
	</div>

	<div>
		{#if info.contact.length > 0}
			{#each info.contact as detail}
				<div class="grid grid-cols-4">
					<p class="">
						{detail[0]}:
					</p>
					<p class="col-span-3 text-secondary break-all">
						{detail[1]}
					</p>
				</div>
			{/each}
		{/if}
	</div>
</div>
