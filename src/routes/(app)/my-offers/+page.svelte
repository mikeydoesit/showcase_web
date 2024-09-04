<script>
    import PageTitle from '../../../components/PageTitle.svelte'
    import OffersTabs from '../../../components/OffersTabs.svelte';
	import OffersCard from '../../../components/OffersCard.svelte';
    import { show_all_offers, show_existing_offers, show_redeemed_offers } from '$lib/store.js'
    import { currentUser, pocketbase } from '$lib/pocketbase.js'
</script>

<style lang="postcss">
    .offers_main {
        @apply bg-main_bg h-full w-full mb-16;
    }
</style>

<main class="offers_main">
    <PageTitle
        back_btn
        page_title={'Offers'}
    />
    <OffersTabs />
    {#if $show_all_offers}
        <OffersCard
            user={$currentUser}
            pb={pocketbase}
        />
    {/if}
    {#if $show_existing_offers}
        <OffersCard
            user={$currentUser}
            pb={pocketbase}
        />
    {/if}
    {#if $show_redeemed_offers}
        <OffersCard
            user={$currentUser}
            pb={pocketbase}
        />
    {/if}
    <!-- {#if $show_campaign_action}
        <CampaignActionMenu
            pb={pocketbase}
            sub_category_list={$currentUser.sub_categories}
        />
    {/if} -->
</main>