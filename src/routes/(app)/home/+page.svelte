<script>
    import FeaturedSlider from "../../../components/FeaturedSlider.svelte";
    import HomepageFilterTabs from "../../../components/HomepageFilterTabs.svelte";
    import SectionTitle from "../../../components/SectionTitle.svelte";
    import HomepageOfferCardsWide from "../../../components/HomepageOfferCardsWide.svelte";
    import FullWidthLinkBtn from "../../../components/FullWidthLinkBtn.svelte";
    import HomepageOfferCardsNarrow from "../../../components/HomepageOfferCardsNarrow.svelte";
    import { pocketbase } from '$lib/pocketbase'
    import { onMount } from 'svelte'

    let records = []
    let feature = {}
    let feature_img = ''

    onMount(async () => {
        try {

            records = await pocketbase.collection('campaigns').getFullList({
                sort: '-created',
                filter: 'is_active = True',
                expand: 'merchant'
            });

            const active_record = records.filter(item => new Date(item.expiration_date) > new Date());
            feature = active_record[(Math.floor(Math.random() * active_record.length))]
            feature_img = feature?.stock_images[(Math.floor(Math.random() * feature.stock_images.length))].url


        } catch (error) {
            console.log(error)
        }
    })

    
</script>

<style lang="postcss">
    .home_main {
        @apply bg-main_bg h-full w-full mb-20;
    }
</style>

<main class="home_main">
    <FeaturedSlider
        campaign_img={feature_img}
        featured_campaign={feature}
    />
    <HomepageFilterTabs />
    <SectionTitle
        title_text={'Deals ending soon'}
    />
    <HomepageOfferCardsWide 
        campaign_list={records}
    />
    <FullWidthLinkBtn
        link_text={'See more'}
        link_url={'/category/ending_soon'}
    />
    <SectionTitle
        title_text={'Bestsellers'}
    />
    <HomepageOfferCardsNarrow 
        campaign_list={records}
    />
    <FullWidthLinkBtn
        link_text={'See more'}
        link_url={'/category/popular'}
    />
</main>