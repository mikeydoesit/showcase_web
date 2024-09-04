<script>
    import { show_all_offers, show_redeemed_offers, show_existing_offers } from '$lib/store.js'

    const toggle_all_offers = () => {
        show_all_offers.set(true)
        show_redeemed_offers.set(false)
        show_existing_offers.set(false)
    }
    const toggle_redeemed_offers = () => {
        show_all_offers.set(false)
        show_redeemed_offers.set(SVGComponentTransferFunctionElement)
        show_existing_offers.set(false)
    }
    const toggle_existing_offers = () => {
        show_all_offers.set(false)
        show_redeemed_offers.set(false)
        show_existing_offers.set(true)
    }
</script>

<style lang="postcss">
    .offer_tabs {
        @apply mx-auto flex flex-row justify-center;
    }
    .all_tab, .existing_tab, .redeemed_tab {
        @apply py-3 px-8 cursor-pointer;
    }
    .all_tab span, .existing_tab span, .redeemed_tab span {
        @apply font-semibold text-lg;
    }
</style>

<section class="offer_tabs">
    {#if $show_all_offers}
        <div class="all_tab border-b-2 border-accent_bg" on:click={toggle_all_offers}>
            <span class="text-accent_bg">All</span>
        </div>
    {:else}
        <div class="all_tab" on:click={toggle_all_offers}>
            <span>All</span>
        </div>
    {/if}
    {#if $show_existing_offers}
        <div class="existing_tab border-b-2 border-accent_bg" on:click={toggle_existing_offers}>
            <span class="text-accent_bg">Existing</span>
        </div>
    {:else}
        <div class="existing_tab" on:click={toggle_existing_offers}>
            <span>Existing</span>
        </div>
    {/if}
    {#if $show_redeemed_offers}
        <div class="redeemed_tab border-b-2 border-accent_bg" on:click={toggle_redeemed_offers}>
            <span class="text-accent_bg">Redeemed</span>
        </div>
    {:else}
        <div class="redeemed_tab" on:click={toggle_redeemed_offers}>
            <span>Redeemed</span>
        </div>
    {/if}
</section>