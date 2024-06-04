<script>
    export let title_text;
</script>

<style lang="postcss">
    .section_title {
        @apply px-5 mt-4 mb-2;
    }
    .section_title h3 {
        @apply text-2xl text-splash_bg font-medium;
    }
</style>
<section class="section_title">
    <h3>{title_text}</h3>
</section>