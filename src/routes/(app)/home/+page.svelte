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

            feature = records[(Math.floor(Math.random() * records.length))]
            feature_img = feature.stock_images[(Math.floor(Math.random() * feature.stock_images.length))].url


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
        title_text={'Deals near you'}
    />
    <HomepageOfferCardsWide 
        campaign_list={records}
    />
    <FullWidthLinkBtn
        link_text={'See more'}
        link_url={'#'}
    />
    <SectionTitle
        title_text={'Bestsellers'}
    />
    <HomepageOfferCardsNarrow 
        campaign_list={records}
    />
    <FullWidthLinkBtn
        link_text={'See more'}
        link_url={'#'}
    />
</main>