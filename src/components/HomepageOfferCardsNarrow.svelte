<script>
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

    export let campaign_list = []
</script>

<style lang="postcss">
    .homepage_offer_cards_narrow {
        @apply flex flex-row ml-5 pt-2 pb-4 overflow-x-scroll gap-2;
    }
    .homepage_offer_cards_narrow::-webkit-scrollbar {
        display: none;
    }
    .card {
        @apply flex flex-col rounded-xl;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }
    .card_img_wrapper {
        @apply w-[43vw] h-24 relative rounded-t-xl;
    }
    .card_img_wrapper img {
        @apply w-full h-full object-cover object-center rounded-t-xl;
    }
    .logo_wrapper {
        @apply absolute left-0 top-4 bg-main_bg w-12 px-1.5 py-0.5;
    }
    .offer_details_wrapper {
        @apply flex flex-row justify-between;
    }
    .offer_details_main {
        @apply pl-2 pb-3;
    }
    .company {
        @apply mt-2 text-base text-splash_bg font-medium;
    }
    .product {
        @apply text-text_grey text-xs;
    }
    .price_wrapper {
        @apply flex flex-row items-center mt-2;
    }
    .price_wrapper img {
        @apply w-3 h-3 mr-1.5;
    }
    .old_price {
        @apply text-xs text-text_grey block;
    }
    .slash {
        @apply mx-1 text-xs text-text_grey;
    }
    .new_price {
        @apply text-accent_bg font-semibold text-base block;
    }
    .offer_more_info {
        @apply flex flex-col-reverse items-start mt-1 justify-start;
    }
    .time_left_wrapper {
        @apply flex flex-row items-center mt-1;
    }
    .time_left {
        @apply text-xs text-highlight_bg;
    }
    .time_left_wrapper img {
        @apply w-4 h-4 mr-1;
    }
    .location_wrapper {
        @apply flex flex-row items-center;
    }
    .location_wrapper img {
        @apply h-4 mr-1;
    }
    .location {
        @apply text-xs text-text_grey;
    }
    .offer_coupon {
        @apply flex flex-row items-center justify-between bg-splash_bg text-main_bg px-4 py-2 border-t-2 border-dotted rounded-b-xl;
    }
    .offer_coupon img {
        @apply w-5 h-5;
    }
    .offer_coupon span {
        @apply text-xs;
    }
    .offer_coupon p {
        @apply text-xl font-semibold;
    }

    /* LOADER STYLES */

    .loader_wrapper {
        @apply h-60 w-full flex justify-center items-center;
    }
    .spinner {
        --size: 30px;
        --first-block-clr: #990033;
        --second-block-clr: #FF9000;
        --clr: #111;
        width: 100px;
        height: 100px;
        position: relative;
    }

    .spinner::after,.spinner::before {
        box-sizing: border-box;
        position: absolute;
        content: "";
        width: var(--size);
        height: var(--size);
        top: 50%;
        animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
        left: 50%;
        background: var(--first-block-clr);
    }

    .spinner::after {
        background: var(--second-block-clr);
        top: calc(50% - var(--size));
        left: calc(50% - var(--size));
        animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
    }

    @keyframes down {
        0%, 100% {
            transform: none;
        }

        25% {
            transform: translateX(100%);
        }

        50% {
            transform: translateX(100%) translateY(100%);
        }

        75% {
            transform: translateY(100%);
        }
    }

    @keyframes up {
        0%, 100% {
            transform: none;
        }

        25% {
            transform: translateX(-100%);
        }

        50% {
            transform: translateX(-100%) translateY(-100%);
        }

        75% {
            transform: translateY(-100%);
        }
    }
</style>

<section class="homepage_offer_cards_narrow">
    {#if campaign_list.length == 0}
        <div class="loader_wrapper">
            <div class="spinner"></div>
        </div>
    {:else}
        {#each campaign_list as item}
            <a href={`/product/${item.id}`} class="card">
                <div class="card_img_wrapper">
                    <img src={item.stock_images[0].url} alt={item.product_name} />
                    {#if item.expand.merchant.logo != ""}
                        <div class="logo_wrapper">
                            <img src={`${PUBLIC_POCKETBASE_URL}/api/files/merchants/${item.expand.merchant.id}/${item.expand.merchant.logo}`} alt="logo" />
                        </div>
                    {/if}
                </div>
                <div class="offer_details_wrapper">
                    <div class="offer_details_main">
                        <h4 class="company">{item.expand.merchant.business_name.substring(0, 15)}{#if item.expand.merchant.business_name.length > 16} ...{/if}</h4>
                        <h6 class="product">{item.product_name}</h6>
                        <div class="price_wrapper">
                            {#if item.discount_type == 'BOGOF'}
                                <p class="new_price">Buy 1 get 1 free</p>
                            {:else}
                                <span class="old_price"><s>GH&#8373; {item.original_price}</s></span>
                                <span class="slash">/</span>
                                <p class="new_price">GH&#8373; {item.original_price - ((item.original_price/100) * item.discount_value)}</p>
                            {/if}
                        </div>
                        <div class="offer_more_info">
                            <div class="time_left_wrapper">
                                <img src="/images/time.png" alt="time icon" />
                                <span class="time_left">3 days left</span>
                            </div>
                            <div class="location_wrapper">
                                <img src="/images/location_pin.png" alt="location" />
                                <span class="location">{item.expand.merchant.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="offer_coupon">
                    {#if item.discount_type == 'BOGOF'}
                        <p class="text-center w-full">BOGOF</p>
                    {:else}
                        <img src="/images/white_coupon.png" alt="coupon" />
                        <span>Save up to</span>
                        <p>{item.discount_value}%</p>
                    {/if}
                </div>
            </a>
        {/each}
    {/if}
</section>