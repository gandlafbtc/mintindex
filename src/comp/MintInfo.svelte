<script lang="ts">

    export let info: {
        contact: [],
        name:string,
        pubkey:string,
        nuts: string[],
        version: string
    }

</script>

<div class="flex flex-col gap-2">
    <div class="grid grid-cols-4">
        <p class="">
            Name:
        </p>
        <p class="col-span-3 break-all">
            {info.name}
        </p>
        <p class="">
            Version:
        </p>
        <p class="col-span-3 break-all">
            {info.version}
        </p>
        <p class="">
            NUTS:
        </p>
        <p class="col-span-3 break-all">
            {info.nuts.join(",")}
        </p>
        <p class="">
            Pubkey:
        </p>
        <p class="col-span-3 break-all">
            {info.pubkey}
        </p>
        
    </div>

    <div>

        {#each info.contact as detail}
        <div class="grid grid-cols-4">
            <p class="">
                {detail[0]}:
            </p>
            <p class="col-span-3">
                {detail[1]}
            </p>
        </div> 
        {/each}
    </div>
</div>