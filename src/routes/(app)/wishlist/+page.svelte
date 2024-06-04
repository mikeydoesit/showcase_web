<script>
    import FullWidthOfferCard from "../../../components/FullWidthOfferCard.svelte";
</script>

<style lang="postcss">
    .wishlist_main {
        @apply bg-main_bg h-full w-full mb-16;
    }
</style>

<main class="wishlist_main">
    {#each Array(7) as _}
        <FullWidthOfferCard />
    {/each}
</main>