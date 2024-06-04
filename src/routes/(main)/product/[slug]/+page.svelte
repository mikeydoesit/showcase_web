<script>
    import ProductHeading from "../../../../components/ProductHeading.svelte";
    import ProductContent from "../../../../components/ProductContent.svelte";
</script>

<style lang="postcss">
    .product_page_main {
        @apply bg-main_bg h-full w-full mb-16;
    }
</style>

<main class="product_page_main">
    <ProductHeading />
    <ProductContent />
</main>