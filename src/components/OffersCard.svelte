<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import { show_all_offers, show_existing_offers, show_redeemed_offers } from '$lib/store.js'

    export let user = '';
    export let pb = {}

    const set_offers_list = async () => {
        try {
            const all_offers = await pb.collection('users').getOne(user.id);
            // const existing_offers = await pb.collection('campaigns').getList(1, 50, {
            //     filter: `is_active = true && merchant = "${merchant.id}"`,
            //     expand: 'merchant'
            // })
            // const redeemed_offers = await pb.collection('campaigns').getList(1, 50, {
            //     filter: `is_active = true && merchant = "${merchant.id}"`,
            //     expand: 'merchant'
            // })

            try {
                let filter_string = '';
                for (let i = 0; i < all_offers.offers.length; i++) {
                    filter_string += `id = "${all_offers.offers[i].id}" || `;
                }
                let trimmed_filter_string = filter_string.slice(0, -4);
                // fetch a paginated records list
                const resultList = await pb.collection('campaigns').getList(1, 50, {
                    filter: trimmed_filter_string,
                    sort: '-created',
                    expand: 'merchant'
                });
                console.log(resultList)
                if(resultList && $show_all_offers) {
                    return resultList.items
                } 

            } catch (error) {
                console.error(error)
            }
            // else if(existing_offers && $show_existing_offers) {
            //     return existing_offers.items
            // } else if(redeemed_offers && $show_redeemed_offers) {
            //     return redeemed_offers.items
            // }
        } catch (error) {
            console.log(error)
        }
    }
    let get_offers_list = set_offers_list()
    

    // const toggle_campaign_action_menu = (e) => {
    //     sessionStorage.setItem("selected_campaign", e.target.dataset.selected_campaign)
    //     show_campaign_action.set(true)
    // }
    const formatDate = (dateString) => {
        let locale = Intl.DateTimeFormat().resolvedOptions().locale;
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(locale, options);
    }
</script>

<style lang="postcss">
    .offers_list {
        @apply px-4 mt-8 flex flex-col gap-4;
    }
    .card {
        @apply flex flex-col rounded-xl;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }
    .card_img_wrapper {
        @apply w-full h-48 relative rounded-t-xl;
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
    .offer_coupon .bogof {
        @apply w-12 h-auto;
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

<section class="offers_list" transition:slide={{ delay: 0, duration: 200, easing: quintOut, axis: 'x' }} >
        {#await get_offers_list}
        <div class="spinner_wrapper">
            <div class="spinner center">
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
            </div>
        </div>
        {:then offers_list}
            {#if offers_list == null}
                <div class="no_offers">
                    <img src="/images/campaign_icon_blue.png" alt="campaign_icon"/>
                    <h3>No Offers</h3>
                </div>
            {:else}
                {#each offers_list as offer}
                        <a href={`/product/${offer.id}`} class="card" transition:slide={{ delay: 0, duration: 200, easing: quintOut, axis: 'x' }}>
                            <div class="card_img_wrapper">
                                <img src={offer.stock_images[0].url} alt={offer.product_name} />
                                {#if offer.expand.merchant.logo != ""}
                                    <div class="logo_wrapper">
                                        <img src={`${PUBLIC_POCKETBASE_URL}/api/files/merchants/${offer.merchant}/${offer.expand.merchant.logo}`} alt="logo" />
                                    </div>
                                {/if}
                            </div>
                            <div class="offer_details_wrapper">
                                <div class="offer_details_main">
                                    <h4 class="company">{offer.expand.merchant.business_name}</h4>
                                    <h6 class="product">{offer.product_name}</h6>
                                    <div class="price_wrapper">
                                        {#if offer.discount_type == 'BOGOF'}
                                            <p class="new_price">Buy one get one free</p>
                                        {:else}
                                            <img src="/images/checkmark.png" alt="checkmark"/>
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
                                        <div class="location_wrapper">
                                            <img src="/images/location_pin.png" alt="location" />
                                            <span class="location">{offer.expand.merchant.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="offer_coupon">
                                    {#if discount_tag == 'BOGOF'}
                                        <img class="bogof" src="/images/bogof_.png" alt="coupon" />
                                    {:else}
                                        <img src="/images/white_coupon.png" alt="coupon" />
                                        <span>Save up to</span>
                                        <p>{discount_amount}%</p>
                                    {/if}
                                </div> -->
                            </div>
                        </a>
                        <!-- <div class="card_heading">
                            <div class="status_label">
                                {#if $show_active_campaigns}
                                    <span>Active</span>
                                {:else if $show_draft_campaigns}
                                    <span>Draft</span>
                                {/if}
                            </div>
                            <div class="img_wrapper" on:click={toggle_campaign_action_menu} data-selected_campaign={campaign.id}>
                                <img src="/images/more_dots.png" alt="icon"/>
                            </div>
                        </div>
                        <div class="card_main">
                            <h4>{campaign.product_name} ({campaign.sub_category}) - {campaign.expand.merchant.business_name}</h4>
                            <span class="edit_date">Last modified on: {formatDate(campaign.updated)}</span>
                        </div>
                        <div class="card_footer">
                            <div class="main_action_btn" on:click={$show_active_campaigns ? edit_campaign(campaign.id) : publish_campaign(campaign.id)} data-campaign_id={campaign.id}>
                                {#if $show_active_campaigns}
                                    <span>Edit</span>
                                {:else if $show_draft_campaigns}
                                    <span>Publish</span>
                                {/if}
                            </div>
                        </div> -->
                {/each}
            {/if}
        {/await}
</section>