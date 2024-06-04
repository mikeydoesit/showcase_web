<script>
    export let page_title = '';
    export let back_btn;

    const back_to_prev = () => {
        window.history.back();
    }
</script>

<style lang="postcss">
    .page_heading {
        @apply bg-splash_bg flex justify-center py-4 relative items-center;
    }
    .page_heading h1 {
        @apply text-white text-lg font-bold uppercase;
    }
    .back_btn {
        @apply h-7 w-7 absolute left-6 bg-main_bg bg-opacity-40 rounded-full flex justify-center items-center p-1;
    }
</style>

<section class="page_heading">
    {#if back_btn}
        <div class="back_btn" on:click={back_to_prev}>
            <img src="/images/back_chevron.png" alt='back' />
        </div>
    {/if}
    <h1>{page_title}</h1>
</section>