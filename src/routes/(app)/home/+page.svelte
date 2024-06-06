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

    onMount(async () => {

        try {

            records = await pocketbase.collection('campaigns').getFullList({
                sort: '-created',
                expand: 'merchant'
            });

            console.log(records)

        } catch (error) {
            console.log(error)
        }
    })

    
</script>

<style lang="postcss">
    .home_main {
        @apply bg-main_bg h-full w-full mb-16;
    }
</style>

<main class="home_main">
    <FeaturedSlider />
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
        title_text={'Popular on Showcase'}
    />
    <HomepageOfferCardsNarrow />
    <FullWidthLinkBtn
        link_text={'See more'}
        link_url={'#'}
    />
    <!-- <SectionTitle
        title_text={'All the deals'}
    />
    <HomepageOfferCardsWide />
    <FullWidthLinkBtn
        link_text={'See more'}
        link_url={'#'}
    /> -->
</main>