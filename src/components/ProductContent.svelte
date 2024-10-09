<script>
    import { PUBLIC_POCKETBASE_URL, PUBLIC_MAPS_API } from '$env/static/public';
    import { show_deal, show_business_info, show_business_review } from '$lib/store.js'
    import { currentUser } from '$lib/pocketbase'
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    export let product_obj
    export let pb
    export let offer_added_to_user
    export let seller_obj

    let current_offers

    const subscribe = () => {
        goto('/profile')
    }

    const add_offer = async () => {

        if($currentUser.offers === null || $currentUser.offers === 1) {
            current_offers = []
        } else {
            current_offers = $currentUser.offers
        }
        
        let offer_obj =  {
                            "id": product_obj.id,
                            "redeemable": true
                        }

        current_offers.push(offer_obj)

        const data = {
            "offers": current_offers
        };

        try {
            const record = await pb.collection('users').update($currentUser.id, data);
            offer_added_to_user = true
        } catch (error) {
            console.error(error)
        }

    }
    const remove_offer = async () => {
         const data = $currentUser.offers.filter((offer) => offer.id !== product_obj.id);

        try {
            const record = await pb.collection('users').update($currentUser.id, {
                "offers": data
            });
            offer_added_to_user = false
        } catch (error) {
            console.error(error)
        }
    }

    const activate_deal_tab = () => {
        show_business_review.set(false)
        show_business_info.set(false)
        show_deal.set(true)
    }
    const activate_business_review_tab = () => {
        show_business_info.set(false)
        show_deal.set(false)
        show_business_review.set(true)
    }
    const activate_business_info_tab = () => {
        show_business_review.set(false)
        show_deal.set(false)
        show_business_info.set(true)
    }
    console.log(seller_obj)
</script>

<style lang="postcss">
    .product_content {
        @apply mt-36 px-4;
    }
    .tabs {
        @apply grid grid-cols-product_tab;
    }
    .tab {
        @apply flex flex-row justify-center py-2.5;
    }
    .tab span {
        @apply text-lg font-semibold text-splash_bg;
    }
    .tab.active {
        @apply border-b-4 border-splash_bg
    }
    .deals_tab_content {
        @apply mt-4;
    }
    .deal {
        @apply rounded-xl pb-1;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
    .deals_img_wrapper {
        @apply h-40 w-full;
    }
    .deals_img_wrapper img {
        @apply h-full w-full object-center object-cover rounded-t-xl;
    }
    .deal_title {
        @apply text-splash_bg mt-4 text-lg font-semibold px-3;
    }
    .time_left_wrapper {
        @apply flex flex-row items-center text-highlight_bg font-semibold text-xs my-2 ml-1 px-3;
    }
    .time_left_wrapper img {
        @apply h-4 w-4 mr-1.5;
    }
    .deal_description {
        @apply text-text_grey text-sm px-3;
    }
    .deals_option {
        @apply pt-3 px-3 relative;
    }
    .deals_option h4 {
        @apply text-xl font-bold text-splash_bg mb-3;
    }
    .option {
        @apply flex flex-row justify-between items-center pb-3;
    }
    .option:last-of-type {
        @apply pb-3;
    }
    .option_title {
        @apply text-splash_bg font-semibold mb-1;
    }
    .pricing {
        @apply flex flex-row items-center;
    }
    .discount {
        @apply bg-splash_bg bg-opacity-20 px-1 py-0.5 rounded-lg mr-3;
    }
    .discount span {
        @apply text-splash_bg text-sm font-semibold;
    }
    .price {
        @apply flex flex-row items-center
    }
    .old_price {
        @apply text-xs text-text_grey mr-2;
    }
    .new_price {
        @apply text-accent_bg font-semibold text-lg;
    }
    .add_btn_wrapper {
        @apply border rounded-lg py-1.5 px-2.5 border-border_grey_five cursor-pointer;
    }
    .add_btn_content {
        @apply flex flex-row items-center;
    }
    .add_btn_content img {
        @apply h-5 w-5;
    }
    .add_btn_content span {
        @apply text-splash_bg text-lg font-semibold;
    }
    .paywall {
        @apply absolute bg-border_grey/80 z-10 top-0 bottom-0 left-0 right-0 flex items-center justify-center;
    }
    .paywall_btn {
        @apply rounded-lg flex flex-row bg-dark_grey px-6 py-2 items-center cursor-pointer;
    }
    .paywall_btn p {
        @apply text-main_bg text-sm font-semibold;
    }
    .lock_icon {
        @apply w-5 ml-2;
    }

    /* business info tab */
    .business_info_tab_content {
        @apply mt-6 px-3 flex flex-col;
    }
    .business_info_heading {
        @apply flex flex-row gap-8 items-center;
    }
    .logo_wrapper {
        @apply h-auto w-auto rounded-lg;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }
    .logo_wrapper .logo {
        @apply h-20 w-20 object-center object-contain p-0.5;
    }
    .business_name {
        @apply text-2xl font-semibold text-black;
    }
    .business_desc_wrapper {
        @apply mt-12 text-black;
    }
    .title {
        @apply text-xl font-semibold pb-1.5 text-black;
    }
    .business_desc_wrapper .business_desc {
        @apply text-justify font-light;
    }
    .business_meta {
        @apply mt-6 text-black;
    }
    .business_meta .meta_item {
        @apply flex flex-row justify-between items-center mb-2;
    }
    .business_meta .meta_item .key {
        @apply text-lg font-semibold;
    }
    .business_meta .meta_item .value {
        @apply font-light;
    }
    .business_location_wrapper {
        @apply mt-6;
    }
    .business_location {
        @apply h-44 w-full mt-2;
    }
</style>

<section class="product_content">
    <div class="tabs">
        {#if $show_deal}
            <div class="tab active">
                <span>Deal</span>
            </div>
        {:else}
            <div class="tab" on:click={activate_deal_tab}>
                <span>Deal</span>
            </div>
        {/if}
        {#if $show_business_review}
            <div class="tab active">
                <span>Reviews</span>
            </div>
        {:else}
            <div class="tab" on:click={activate_business_review_tab}>
                <span>Reviews</span>
            </div>
        {/if}
        {#if $show_business_info}
            <div class="tab active">
                <span>Info</span>
            </div>
        {:else}
            <div class="tab" on:click={activate_business_info_tab}>
                <span>Info</span>
            </div>
        {/if}
    </div>

    {#if $show_deal}
        <div class="deals_tab_content">
            {#if Object.keys(product_obj).length > 0}
                <div class="deal">
                    <div class="deals_img_wrapper">
                        <img src={product_obj.stock_images[(Math.floor(Math.random() * product_obj.stock_images.length))].url} alt="deals image"/>
                    </div>
                    <h3 class="deal_title">{product_obj.product_name}</h3>
                    <div class="time_left_wrapper">
                        <img src="/images/time.png" alt="time icon" />
                        <span class="time_left">3 days left</span>
                    </div>
                    {#if product_obj.discount_type == 'BOGOF'}
                        <p class="deal_description">Enjoy a free {product_obj.product_name} when a {product_obj.product_name} of equal value or greater is purchased.</p>
                    {/if}
                    {#if product_obj.discount_type == 'Percentage'}
                        <p class="deal_description">Up to {product_obj.discount_value}% off on {product_obj.product_name} at {product_obj.expand.merchant.business_name}.</p>
                    {/if}
                    {#if $currentUser != null}
                        {#if $currentUser.is_subscriber}
                            <div class="deals_option">
                                <!-- <h4>Purchase options:</h4> -->
                                <div class="option">
                                    <div class="option_details">
                                        <h5 class="option_title">{product_obj.product_name}</h5>
                                        <div class="pricing">
                                            <div class="discount">
                                                {#if product_obj.discount_type == 'Percentage'}
                                                    <span>{product_obj.discount_value}% Off</span>
                                                {/if}
                                            </div>
                                            <div class="price">
                                                {#if product_obj.discount_type == 'Percentage'}
                                                    <span class="old_price"><s>GH&#8373; {product_obj.original_price}</s></span>
                                                    <p class="new_price">GH&#8373; {product_obj.original_price - ((product_obj.original_price/100) * product_obj.discount_value)}</p>
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                    <div class={`add_btn_wrapper ${offer_added_to_user ? 'bg-splash_bg' : ''}`}>
                                        {#if offer_added_to_user}
                                            <div class="add_btn_content bg-splash_bg" on:click={remove_offer}>
                                                <img src="/images/remove.png" alt="remove"/>
                                            </div>
                                        {:else}
                                            <div class="add_btn_content" on:click={add_offer}>
                                                <img class="mr-1.5" src="/images/add.png" alt="add "/>
                                                <span>Add</span>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {:else}
                        <div class="deals_option my-3">
                            <!-- <h4>Purchase options:</h4> -->
                            <div class="option">
                                <div class="option_details">
                                    <h5 class="option_title">{product_obj.product_name}</h5>
                                    <div class="pricing">
                                        <div class="discount">
                                            {#if product_obj.discount_type == 'Percentage'}
                                                <span>{product_obj.discount_value}% Off</span>
                                            {/if}
                                        </div>
                                        <div class="price">
                                            {#if product_obj.discount_type == 'Percentage'}
                                                <span class="old_price"><s>GH&#8373; {product_obj.original_price}</s></span>
                                                <p class="new_price">GH&#8373; {product_obj.original_price - ((product_obj.original_price/100) * product_obj.discount_value)}</p>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                                <div class="add_btn_wrapper">
                                    <div class="add_btn_content">
                                        <img src="/images/add.png" alt="add "/>
                                        <span>Add</span>
                                    </div>
                                </div>
                            </div>
                            <div class="paywall" on:click={subscribe}>
                                <div class="paywall_btn">
                                    <p>Subscribe to Mango</p>
                                    <div class="lock_icon">
                                        <img src="/images/lock.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    {/if}
    {#if $show_business_review}
        <div class="business_review_tab_content">

        </div>
    {/if}
    {#if $show_business_info}
        <div class="business_info_tab_content">
            <div class="business_info_heading">
                <div class="logo_wrapper">
                    {#if seller_obj.logo != ''}
                        <img class="logo" src={`${PUBLIC_POCKETBASE_URL}/api/files/merchants/${seller_obj.id}/${seller_obj.logo}`} alt="logo" />
                    {/if}
                </div>
                <div class="business_name_wrapper">
                    {#if seller_obj.business_name}
                        <h2 class="business_name">{seller_obj.business_name}</h2>
                    {/if}
                </div>
            </div>
            <div class="business_desc_wrapper">
                <h3 class="title">About</h3>
                {#if seller_obj.desc != ''}
                    <p class="business_desc">{seller_obj.desc}</p>
                {:else}
                    <p class="business_desc">Nami Beauty Ltd is a beauty spa offering a range of beauty services including BIAB (Builder In A Bottle), manicures, pedicures, brows, lashes, makeup, and more. The spa has a serene and luxurious atmosphere aimed at providing a relaxing experience for its clients.</p>
                {/if}
            </div>
            <div class="business_meta">
                <div class="meta_item">
                    <span class="key">Category</span>
                    {#if seller_obj.business_category}
                        <span class="value">{seller_obj.business_category}</span>
                    {/if}
                </div>
                <div class="meta_item">
                    <span class="key">Phone</span>
                    {#if seller_obj.contact_number}
                        <span class="value">{seller_obj.contact_number}</span>
                    {/if}
                </div>
            </div>
            <div class="business_location_wrapper">
                <h3 class="title">Location</h3>
                <div class="business_location">
                    {#if seller_obj.business_name}
                        <iframe
                            loading="lazy"
                            width="100%"
                            height="100%"
                            frameborder="0" style="border:0"
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=${PUBLIC_MAPS_API}&q=${seller_obj.business_name.split(' ').join('+')},Accra`}
                            allowfullscreen>
                        </iframe>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</section>