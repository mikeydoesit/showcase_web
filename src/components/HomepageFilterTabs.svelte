<script>
    import filter_tabs from '../lib/data/FilterTabs'
</script>

<style lang="postcss">
    .filter_tabs {
        @apply flex flex-row ml-5 py-4 overflow-x-scroll gap-3;
    }
    .filter_tabs::-webkit-scrollbar {
        display: none;
    }
    .tab {
        @apply border border-border_grey rounded-lg px-2.5 py-2.5 flex flex-row w-full h-fit;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }
    .tab .img_wrapper {
        @apply w-10;
    }
    .tab img {
        @apply w-full;
    }
    .tab h4 {
        @apply text-sm mr-1.5;
    }
</style>

<section class="filter_tabs">
    {#each filter_tabs as tab}
        <div class="tab">
            <h4>{tab.text}</h4>
            <div class="img_wrapper">
                <img src={tab.img} alt={tab.text} />
            </div>
        </div>
    {/each}
</section>