<script>
    import PageTitle from "../../../../components/PageTitle.svelte";
    import FilterToggle from "../../../../components/FilterToggle.svelte";
    import FilterCard from "../../../../components/FilterCard.svelte";
    import FullWidthOfferCard from '../../../../components/FullWidthOfferCard.svelte'
    import { page } from '$app/stores';
    import { onMount } from  'svelte';
    import { pocketbase } from '$lib/pocketbase.js'

    let title
    let show_filter_card = false
    let capitalised
    let results

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

    const toggle_filter_card = () => {
        show_filter_card = !show_filter_card
    }

    // onMount(async () => {
    //     console.log(capitalised)
    // })
    const get_offer_list = async () => {
        try {
            const resultList = await pocketbase.collection('campaigns').getList(1, 50, {
                filter: `parent_category = "${capitalised}" && is_active = True`,
                expand: 'merchant'
            });
            console.log(resultList)
            results = resultList.items
            return results
        } catch (error) {
            console.log(error)
        }
    }
</script>

<style lang="postcss">
    .category_page_main {
        @apply relative bg-main_bg h-full w-full mb-16;
    };
</style>

<main class="category_page_main">
    <PageTitle 
        back_btn={true}
        page_title={title}
    />
    <FilterToggle 
        action={toggle_filter_card}
    />
    {#await get_offer_list()}
        <p>loading...</p>
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
    {#if show_filter_card}
        <FilterCard
            hide_element={toggle_filter_card}
        />
    {/if}
</main>