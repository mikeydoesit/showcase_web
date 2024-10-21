<script>
    import PageTitle from "../../../../components/PageTitle.svelte";
    import FilterToggle from "../../../../components/FilterToggle.svelte";
    import FilterCard from "../../../../components/FilterCard.svelte";
    import FullWidthOfferCard from '../../../../components/FullWidthOfferCard.svelte'
    import { show_filter_card, category_filter } from '$lib/store.js'
    import { page } from '$app/stores';
    import { onMount } from  'svelte';
    import { pocketbase } from '$lib/pocketbase.js'

    let title
    let capitalised
    let results
    let price_threshold = "";

    // console.log($page)
    if($page.params.slug.includes('-')){
        title = $page.params.slug.split('-').join(' ')
        capitalised = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } else if($page.params.slug.includes('_')) {
        title = $page.params.slug.split('_').join(' & ')
        capitalised = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } else {
        title = $page.params.slug
        capitalised = title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    console.log($page.url.searchParams.get('price_threshold'))

    if($page.url.searchParams.get('price_threshold') != null) {
        if ($page.url.searchParams.get('price_threshold') == 'up_to_20') {
            price_threshold = ' && original_price <= 20'
        } else if ($page.url.searchParams.get('price_threshold') == '20_50') {
            price_threshold = ' && original_price >= 20 && original_price <= 50'
        } else if ($page.url.searchParams.get('price_threshold') == '50_100') {
            price_threshold = ' && original_price >= 50 && original_price <= 100'
        } else if ($page.url.searchParams.get('price_threshold') == '100_200') {
            price_threshold = ' && original_price >= 100 && original_price <= 200'
        } else if ($page.url.searchParams.get('price_threshold') == '200+') {
            price_threshold = ' && original_price >= 200'
        } else {
            price_threshold = '';
        }
    }

    const toggle_filter_card = () => {
        show_filter_card.set(!$show_filter_card)
    }

    // onMount(async () => {
    //     console.log(capitalised)
    // })
    const get_offer_list = async () => {
        try {
            const resultList = await pocketbase.collection('campaigns').getList(1, 50, {
                filter: `parent_category = "${capitalised}" && is_active = True ${price_threshold != null ? price_threshold : ""}`,
                expand: 'merchant'
            });
            console.log(resultList)
            results = resultList.items
            return results
        } catch (error) {
            console.log(error)
        }
    }
    category_filter.set($page.params.slug)
</script>

<style lang="postcss">
    .category_page_main {
        @apply relative bg-main_bg w-full;
    }; 
    
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

<main class={`category_page_main ${$show_filter_card ? "mb-0 h-screen overflow-y-hidden" : "mb-16 h-full"}`}>
    <PageTitle 
        back_btn={true}
        page_title={title}
    />
    <FilterToggle 
        action={toggle_filter_card}
    />
    {#await get_offer_list()}
        <div class="loader_wrapper">
            <div class="spinner"></div>
        </div>
    {:then results} 
        {#each results as item}
            <FullWidthOfferCard
                business_name={item.expand.merchant.business_name}
                product_name={item.product_name}
                business_id={item.expand.merchant.id}
                business_logo={item.expand.merchant.logo}
                bg_img={item.stock_images[0].url}
                product_id={item.id}
                business_location={item.expand.merchant.location}
                discount_amount={item.discount_value}
                discount_tag={item.discount_type}
                price={item.original_price}
            />
        {/each}
    {/await}
    {#if $show_filter_card}
        <FilterCard
            hide_element={toggle_filter_card}
        />
    {/if}
</main>