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
		if(storage == '0') {
            setTimeout(() => {
                show_loader = false
                window.sessionStorage.setItem('visitState', '1')
				window.location.replace('/home')
            }, 12000)
        }
	})
</script>

<style lang="postcss">
	.splash_page {
		@apply h-dvh w-full bg-gradient-to-t from-highlight_bg to-splash_bg to-45% flex justify-center items-center flex-col relative;
	}
	.title {
		@apply flex flex-row;
	}
	h1 {
		@apply text-white text-5xl font-montserrat tracking-tight mb-6;
		color: transparent;
		text-shadow:
		-1px -1px 0 #fff,  
			1px -1px 0 #fff,
			-1px 1px 0 #fff,
			1px 1px 0 #fff;
	}
	/* HTML: <div class="loader"></div> */
	.loader {
	width: 200px;
	height: 25px;
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
	animation: loading_bar 1.8s infinite linear;
	}
	@keyframes loading_bar {
		50% {left:100%;transform: translateX(calc(-100% - 4px))}
	}




	.fat {
		font-weight: 700;
	}
	.mask {
		overflow: hidden;
	}

	.reveal-to-right {
		transform: translateX(-100%);
		animation: reveal-to-right 1.2s 1.8s forwards;
	}

	@keyframes reveal-to-right {
		from {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(0);
		}
	}

	.reveal-to-left {
		transform: translateX(100%);
		animation: reveal-to-left 1s 1s forwards;
	}

	@keyframes reveal-to-left {
		from {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>

<section class="splash_page">
	{#if show_loader}
		<!-- <h1 transition:fade>MANGO</h1> -->
		 <div class="title">
			<div class="mask">
				<h1 class="text fat reveal-to-left">teso</h1>
			</div>
			<div class="mask">
				<h1 class="text fat reveal-to-right">mame</h1>
			</div>
		 </div>
		<!-- <div transition:fade class="loader"></div> -->
	{/if}
</section>