<script>
    import PageTitle from "../../../../components/PageTitle.svelte";
    import FilterToggle from "../../../../components/FilterToggle.svelte";
    import FilterCard from "../../../../components/FilterCard.svelte";
    import FullWidthOfferCard from '../../../../components/FullWidthOfferCard.svelte'
    import { page } from '$app/stores';

    let title
    let show_filter_card = false

    if($page.params.slug.includes('-')){
        title = $page.params.slug.split('-').join(' ').toUpperCase()
    } else if($page.params.slug.includes('_')) {
        title = $page.params.slug.split('_').join(' & ').toUpperCase()
    } else {
        title = $page.params.slug.toUpperCase()
    }

    const toggle_filter_card = () => {
        show_filter_card = !show_filter_card
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
    {#each Array(7) as _}
        <FullWidthOfferCard />
    {/each}
    {#if show_filter_card}
        <FilterCard
            hide_element={toggle_filter_card}
        />
    {/if}
</main>