<script>
    export let link_text;
    export let link_url;
</script>
<style lang="postcss">
    .full_width_link_btn {
        @apply mx-5 mt-4 mb-8;
    }
    .full_width_link_btn a {
        @apply flex items-center justify-center bg-splash_bg py-3.5 rounded-xl;
    }
    .full_width_link_btn a span {
        @apply text-main_bg text-xl font-semibold;
    }
</style>
<section class="full_width_link_btn">
    <a href={link_url}>
        <span>{link_text}</span>
    </a>
</section>