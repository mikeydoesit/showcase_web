<script>
    export let action;
</script>

<style lang="postcss">
    .filter_toggle {
        @apply flex flex-row px-6 my-6 justify-between;
    }
    .sort_wrapper, .filter_btn_wrapper {
        @apply flex flex-row items-center cursor-pointer;
    }
    h6 {
        @apply text-base text-black font-semibold mr-3;
    }
    img {
        @apply h-4 w-4;
    }
</style>

<section class="filter_toggle">
    <div class="sort_wrapper">
        <h6>Sort by</h6>
        <img src="/images/down_chevron.png" alt="icon" />
    </div>
    <div class="filter_btn_wrapper" on:click={action}>
        <h6>Filter</h6>
        <img src="/images/filter.png" alt="icon" />
    </div>
</section>