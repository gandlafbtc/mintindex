<script lang="ts">
	import type { Mint } from "../model/model";

    export let mint: Mint

</script>

<div>
 {mint.url}
<form action="?/deleteMint&id={mint.id}" method="post">
    <button type="submit" class="btn btn-error">Delete</button>
</form>

</div>