<script>
    import PageTitle from "../../../components/PageTitle.svelte";
    import TwoColCta from "../../../components/TwoColCTA.svelte";
    import CategoryGrid from '../../../components/CategoryGrid.svelte'
    import FeaturedCategoryCard from "../../../components/FeaturedCategoryCard.svelte";
    import Features from '../../../lib/data/Features'
</script>

<style lang="postcss">
    .categories_main {
        @apply bg-main_bg h-full w-full mb-16;
    }
</style>

<main class="categories_main">
    <PageTitle 
        page_title={'Categories'}
        back_btn={true}
    />
    <TwoColCta />
    <CategoryGrid />
    {#each Features as feature}
        <FeaturedCategoryCard
            imgURL={feature.card_img_URL}
            linkURL={feature.card_link_URL}
            title={feature.card_title}
            text={feature.card_text}
            img_class={feature.img_position}
            logo={feature.logo_URL}
            logo_width={feature.logo_class}
        />
    {/each}
</main>