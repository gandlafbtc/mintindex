<script>
	import '../app.css';
	import 'nprogress/nprogress.css';
	import nprogress from 'nprogress';
	import { navigating } from '$app/stores';

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
	<h1 class="text-4xl">MINTINDEX - Find a cashu mint</h1>
	<slot />
</div>
