<script>
    import { onMount } from 'svelte'
    import Categories from "$lib/data/Categories.js"

    export let campaign_img = ''

    export let featured_campaign = {}

</script>

<style lang="postcss">
    .featured_slider_main {
        @apply h-80;
    }
    .slider_container {
        @apply h-full w-full;
    }
    .slide {
        @apply relative h-full
    }
    .slide_bg_img {
        @apply object-cover object-center absolute h-full w-full;
    }
    .slide_bg_gradient_one {
        @apply absolute w-full h-full z-10 bg-gradient-to-t from-splash_bg from-10% to-highlight_bg opacity-20;
    }
    .slide_bg_gradient_two {
        @apply absolute w-full h-full z-10 bg-gradient-to-t from-splash_bg from-15%;
    }
    .slide_content {
        @apply z-20 absolute w-full h-full flex justify-end flex-col px-5 py-10;
    }
    .offer_title {
        @apply text-white text-2xl font-bold mb-2.5;
    }
    .offer_summary {
        @apply flex flex-row justify-between;
    }
    .offer_desc {
        @apply text-sm text-white;
    }
    .offer_link {
        @apply ml-8 border border-white rounded-xl px-3.5 h-fit py-2;
    }
    .offer_link span {
        @apply text-white font-semibold;
    }
</style>

<section class="featured_slider_main">
    <div class="slider_container">
        <div class="slide">
            {#if campaign_img != ''}
                <img class="slide_bg_img" src={campaign_img} alt={featured_campaign?.product_name}/>
            {/if}
            <div class="slide_bg_gradient_one"></div>
            <div class="slide_bg_gradient_two"></div>
            <div class="slide_content">
                {#if featured_campaign != undefined || featured_campaign != null}
                    {#if Object.keys(featured_campaign).length > 0}
                        <h2 class="offer_title">{@html Categories.find(item => item.name == featured_campaign.parent_category)?.slogan}</h2>
                        <div class="offer_summary">
                            {#if featured_campaign.discount_type == 'BOGOF'}
                                <p class="offer_desc">Enjoy a free {featured_campaign.product_name} when a {featured_campaign.product_name} of equal value or greater is purchased.</p>
                            {/if}
                            {#if featured_campaign.discount_type == 'Percentage'}
                                <p class="offer_desc">Up to {featured_campaign.discount_value}% off on {featured_campaign.product_name} at {featured_campaign.expand.merchant.business_name}.</p>
                            {/if}
                            <a href={`/product/${featured_campaign.id}`} class="offer_link">
                                <span>Explore</span>
                            </a>
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</section>                                                                                                      