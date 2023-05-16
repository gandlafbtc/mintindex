<script>
	import '../app.css';
	import 'nprogress/nprogress.css';
	import nprogress from 'nprogress';
	import { navigating } from '$app/stores';
	import Toasts from '../comp/Toasts.svelte';
	import { browser } from '$app/environment';
	import { MINT_ADDRESS } from '../util/const';
	import { toast } from '../stores/toasts';

	$: isToggle = false

	navigating.subscribe((value)=>{
    if (value) {
      nprogress.start()
    }
    else {
      nprogress.done()
    }


  })
  const toggleButtons = () => {
	isToggle = !isToggle
  }
  const copyMintAddr = () => {
	if (browser) {
		navigator.clipboard.writeText(MINT_ADDRESS);
		toast('info',`copied ${MINT_ADDRESS}`,'Copied mint URL to clipboard')
	}
  }

</script>

<div class="w-full flex justify-center flex-col items-center gap-8 p-2 transition-all">
	<div>
		<h1 class="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-secondary to-primary">MINTINDEX - Find a cashu mint</h1>
	</div>
	<slot />
	<button class="btn btn-secondary btn-circle fixed {isToggle? 'right-20': "right-5"} bottom-5" on:click={copyMintAddr}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
		  </svg>
	</button>
	<a href="http://wallet.nutstash.app/?mint={MINT_ADDRESS}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-circle fixed {isToggle? 'bottom-20': "bottom-5"} right-5">
		<img src="/nut.svg" alt="">
	</a>
	<button class="btn btn-secondary btn-circle fixed right-5 bottom-5" on:click={toggleButtons}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
		  </svg>
	</button>
	
	
</div>

<Toasts></Toasts>