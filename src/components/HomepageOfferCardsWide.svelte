<script>
    import { pocketbase } from '$lib/pocketbase'

    const set_campaign_list = async () => {
        try {
            const campaign_list = await pocketbase.collection('campaigns').getList(1, 50, {
                filter: `is_active = true`,
                expand: 'merchant'
            })

            return campaign_list.items
            
        } catch (error) {
            console.log(error)
        }
    }

    let get_campaign_list = set_campaign_list()
</script>

<style lang="postcss">
    .homepage_offer_cards_wide {
        @apply flex flex-row ml-5 pt-2 pb-4 overflow-x-scroll gap-2;
    }
    .homepage_offer_cards_wide::-webkit-scrollbar {
        display: none;
    }
    .card {
        @apply flex flex-col rounded-xl;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }
    .card_img_wrapper {
        @apply w-[85vw] h-48 relative rounded-t-xl;
    }
    .card_img_wrapper img {
        @apply w-full h-full object-cover object-center rounded-t-xl;
    }
    .logo_wrapper {
        @apply absolute left-0 top-4 bg-main_bg w-16 px-2 py-1;
    }
    .offer_details_wrapper {
        @apply flex flex-row justify-between rounded-bl-xl;
    }
    .offer_details_main {
        @apply pl-2 rounded-bl-xl pb-3;
    }
    .company {
        @apply mt-2 text-lg text-splash_bg font-medium;
    }
    .product {
        @apply text-text_grey text-sm;
    }
    .price_wrapper {
        @apply flex flex-row items-center mt-2;
    }
    .price_wrapper img {
        @apply w-4 h-4 mr-2;
    }
    .old_price {
        @apply text-xs text-text_grey;
    }
    .slash {
        @apply mx-1 text-xs text-text_grey;
    }
    .new_price {
        @apply text-accent_bg font-semibold text-lg;
    }
    .offer_more_info {
        @apply flex flex-row items-center mt-1;
    }
    .time_left_wrapper {
        @apply flex flex-row items-center mr-3.5;
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
        @apply flex flex-col items-center justify-center bg-splash_bg text-main_bg px-3 border-l-2 border-dotted rounded-br-xl;
    }
    .offer_coupon img {
        @apply w-6 h-6;
    }
    .offer_coupon span {
        @apply text-xs mt-2;
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
<section class="homepage_offer_cards_wide">
    {#await get_campaign_list}
    <div class="loader_wrapper">
        <div class="spinner"></div>
    </div>
    {:then list}
        {#each list as item}
            <div class="card">
                <div class="card_img_wrapper">
                    <img src={item.stock_images[0].url} alt={item.product_name} />
                    <div class="logo_wrapper">
                        <img src="/images/drc_logo.png" alt="logo" />
                    </div>
                </div>
                <div class="offer_details_wrapper">
                    <div class="offer_details_main">
                        <h4 class="company">{item.expand.merchant.business_name}</h4>
                        <h6 class="product">{item.product_name}</h6>
                        <div class="price_wrapper">
                            <img src="/images/checkmark.png" alt="checkmark"/>
                            <span class="old_price"><s>GH&#8373; {item.original_price}</s></span>
                            <span class="slash">/</span>
                            <p class="new_price">GH&#8373; 40</p>
                        </div>
                        <div class="offer_more_info">
                            <div class="time_left_wrapper">
                                <img src="/images/time.png" alt="time icon" />
                                <span class="time_left">3 days left</span>
                            </div>
                            <div class="location_wrapper">
                                <img src="/images/location_pin.png" alt="location" />
                                <span class="location">Lashibi Accra</span>
                            </div>
                        </div>
                    </div>
                    <div class="offer_coupon">
                        <img src="/images/white_coupon.png" alt="coupon" />
                        <span>Save up to</span>
                        <p>30%</p>
                    </div>
                </div>
            </div>
        {/each}
    {/await}
</section>