<script>
    export let hide_element
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { show_merchant_auth_card } from '$lib/store.js'

</script>

<style lang="postcss">
    .merchant_auth_card {
        @apply z-20 h-screen bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0;
    }
    .merchant_auth_card_inner_wrapper {
        @apply h-full w-full relative bg-transparent;
    }
    .merchant_auth_card_inner {
        @apply bg-main_bg absolute bottom-0 h-auto w-full rounded-t-3xl px-6 py-10 max-h-[80vh];
    }
    .merchant_auth_card_heading {
        @apply flex flex-col mx-2 justify-center items-center pb-4;
    }
    .merchant_auth_card_heading_title_wrapper {
        @apply flex flex-col items-center mb-2;
    }
    .merchant_auth_icon_wrapper {
        @apply h-auto w-auto mr-3;
    }
    .merchant_auth_icon_wrapper img {
        @apply h-4;
    }
    .merchant_auth_card_heading_title_wrapper .title {
        @apply text-2xl font-bold text-black mb-1;
    }
    .merchant_auth_card_heading_title_wrapper span a {
        @apply text-accent_bg font-semibold underline;
    }
    .apply_merchant_auth_btn {
        @apply bg-gradient-to-tl from-splash_bg to-highlight_bg to-95% text-main_bg text-xl font-bold w-full py-4 flex justify-center items-center rounded-xl mx-auto mt-1;
    }
</style>

<section class="merchant_auth_card">
    <div class="merchant_auth_card_inner_wrapper" on:click|self={hide_element}>
        <div class={`merchant_auth_card_inner ${$show_merchant_auth_card ? "overflow-y-scroll" : ""}`} transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            <div class="merchant_auth_card_heading">
                <div class="merchant_auth_card_heading_title_wrapper">
                    <h2 class="title">Log in to sell an item</h2>
                    <span>Don't have an account? <a href="https://tesomame.biz/home">Sign up</a></span>
                </div>
            </div>
            <a href="https://tesomame.biz/auth" class="apply_merchant_auth_btn pointer-events-auto cursor-pointer opacity-100">
                <span>Log in</span>
            </a>
        </div>
    </div>
</section>
  