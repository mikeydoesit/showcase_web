<script>
    import { show_merchant_auth_card } from '$lib/store.js'

    const toggle_merchant_form = () => {
        show_merchant_auth_card.set(true)
    }
</script>

<style lang="postcss">
    .post_ad_cta_comp {
        @apply flex flex-col items-center px-4 py-6 bg-[#aad8f0];
    }
    .post_ad_cta_comp h2 {
        @apply text-2xl font-bold text-white drop-shadow-lg;
    }
    .post_ad_cta_comp p {
        @apply text-lg mx-4 text-center text-white drop-shadow-lg font-bold;
    }
    .post_ad_cta_comp_btn {
        @apply mt-5 bg-gradient-to-tl from-splash_bg to-highlight_bg to-95% w-full rounded-xl flex justify-center py-3 cursor-pointer;
    }
    .post_ad_cta_comp_btn span {
        @apply text-white text-lg font-semibold;
    }
</style>

<div class="post_ad_cta_comp">
    <h2>Want to sell on tesomame?</h2>
    <p>Reach millions of active buyers today</p>
    <!-- <video autoplay loop>
        <source src="/images/sell.mp4" type="video/mp4" />
    </video> -->
    <div class="post_ad_cta_comp_btn" on:click={toggle_merchant_form}>
        <span>Sell now</span>
    </div>
</div>