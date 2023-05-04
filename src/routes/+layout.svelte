<script>
	import '../app.css';
	import 'nprogress/nprogress.css';
	import nprogress from 'nprogress';
	import { navigating } from '$app/stores';
	import Toasts from '../comp/Toasts.svelte';

	navigating.subscribe((value)=>{
    if (value) {
      nprogress.start()
    }
    else {
      nprogress.done()
    }
  })
</script>

<div class="w-full flex justify-center flex-col items-center gap-8">
	<div>
		<h1 class="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-secondary to-primary">MINTINDEX - Find a cashu mint</h1>
	</div>
	<slot />
</div>

<Toasts></Toasts>