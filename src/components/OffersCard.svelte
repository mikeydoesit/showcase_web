<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import { show_all_offers, show_existing_offers, show_redeemed_offers } from '$lib/store.js'

    export let user = '';
    export let pb = {}
    let list_has_items = false

    const set_offers_list = async () => {
        try {
            const all_offers = await pb.collection('users').getOne(user.id);

            try {
                let filter_string = '';

                let existing_offers = all_offers.offers.filter((product) => {
                        return product.redeemable === true
                    });

                let redeemed_offers = all_offers.offers.filter((product) => {
                        return product.redeemable === false
                    });

                if($show_all_offers) {
                    for (let i = 0; i < all_offers.offers.length; i++) {
                        filter_string += `id = "${all_offers.offers[i].id}" || `;
                    }
                }

                if($show_existing_offers) {
                    for (let i = 0; i < existing_offers.length; i++) {
                        filter_string += `id = "${existing_offers[i].id}" || `;
                    }
                }

                if($show_redeemed_offers) {
                    for (let i = 0; i < redeemed_offers.length; i++) {
                        filter_string += `id = "${redeemed_offers[i].id}" || `;
                    }
                }

                let trimmed_filter_string = filter_string.slice(0, -4);
                
                if(trimmed_filter_string == "") {
                    return null
                } else {
                    const resultList = await pb.collection('campaigns').getList(1, 50, {
                        filter: trimmed_filter_string,
                        sort: '-created',
                        expand: 'merchant'
                    });
                    if(resultList) {
                        list_has_items = true
                        return resultList.items
                    } else {
                        list_has_items = false
                        return []
                    }
                }
                
                

            } catch (error) {
                console.error(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    let get_offers_list = set_offers_list()
</script>

<style lang="postcss">
    .offers_list {
        @apply grid-cols-category_grid pt-2 pb-4 px-4 mt-8 gap-4;
    }
    .offers_list::-webkit-scrollbar {
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

    .no_offers {
        @apply h-80 w-full flex flex-col justify-center items-center;
    }
    .no_offers img {
        @apply h-14;
    }
    .no_offers h3 {
        @apply font-bold text-xl mb-1.5 mt-3 text-black;
    }
    .no_offers p {
        @apply text-sm text-black;
    }
</style>

<section class={`offers_list ${list_has_items < 1 ? 'flex' : 'grid'}`}  transition:slide={{ delay: 0, duration: 200, easing: quintOut, axis: 'x' }} >
        {#await get_offers_list}
            <div class="loader_wrapper">
                <div class="spinner"></div>
            </div>
        {:then offers_list}
            {#if offers_list == null}
                <div class="no_offers">
                    <img src="/images/campaign_icon_blue.png" alt="campaign_icon"/>
                    <h3>No Offers</h3>
                </div>
            {:else}
                {#each offers_list as offer}
                    <a href={`/product/redemption/${offer.id}`} class="card" transition:slide={{ delay: 0, duration: 200, easing: quintOut, axis: 'x' }}>
                        <div class="card_img_wrapper">
                            <img src={offer.stock_images[0].url} alt={offer.product_name} />
                            {#if offer.expand.merchant.logo != ""}
                                <div class="logo_wrapper">
                                    <img src={`${PUBLIC_POCKETBASE_URL}/api/files/merchants/${offer.expand.merchant.id}/${offer.expand.merchant.logo}`} alt="logo" />
                                </div>
                            {/if}
                        </div>
                        <div class="offer_details_wrapper">
                            <div class="offer_details_main">
                                <h4 class="company">{offer.expand.merchant.business_name.substring(0, 15)}{#if offer.expand.merchant.business_name.length > 16} ...{/if}</h4>
                                <h6 class="product">{offer.product_name}</h6>
                                <div class="price_wrapper">
                                    {#if offer.discount_type == 'BOGOF'}
                                        <p class="new_price">Buy 1 get 1 free</p>
                                    {:else}
                                        <span class="old_price"><s>GH&#8373; {offer.original_price}</s></span>
                                        <span class="slash">/</span>
                                        <p class="new_price">GH&#8373; {offer.original_price - ((offer.original_price/100) * offer.discount_value)}</p>
                                    {/if}
                                </div>
                                <div class="offer_more_info">
                                    <div class="time_left_wrapper">
                                        <img src="/images/time.png" alt="time icon" />
                                        <span class="time_left">3 days left</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="offer_action_btn">

                        </div>
                    </a>
                {/each}
            {/if}
        {/await}
</section>