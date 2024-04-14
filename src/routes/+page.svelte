<script>
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition';
	import '../styles/global.css'

	let show_loader = true;
	const storage = window.sessionStorage.getItem('visitState') || '0'

	if (storage == '0') {
        show_loader = true
    } else {
		window.location.replace('/home')
	}

	onMount(() => {
		// if(storage == '0') {
        //     setTimeout(() => {
        //         show_loader = false
        //         window.sessionStorage.setItem('visitState', '1')
		// 		window.location.replace('/home')
        //     }, 8000)
        // }
	})
</script>

<style lang="postcss">
	.splash_page {
		@apply h-dvh w-full bg-splash_bg flex justify-center items-center flex-col relative;
	}
	h1 {
		@apply text-white text-5xl font-delap tracking-widest mb-6;
	}
	/* HTML: <div class="loader"></div> */
	.loader {
	width: 200px;
	height: 28px;
	border-radius: 7px;
	color: white;
	border: 2px solid;
	position: relative;
	}
	.loader::before {
	content: "";
	position: absolute;
	margin: 2px;
	width: 25%;
	top: 0;
	bottom: 0;
	left: 0;
	border-radius: inherit;
	background: white;
	animation: loading_bar 1.4s infinite linear;
	}
	@keyframes loading_bar {
		50% {left:100%;transform: translateX(calc(-100% - 4px))}
	}
</style>

<section class="splash_page">
	{#if show_loader}
		<h1 transition:fade>SHOWCASE</h1>
		<div transition:fade class="loader"></div>
	{/if}
</section>