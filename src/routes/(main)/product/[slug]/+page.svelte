<script>
    import ProductHeading from "../../../../components/ProductHeading.svelte";
    import ProductContent from "../../../../components/ProductContent.svelte";
    import { page } from '$app/stores'
    import { onMount } from 'svelte'
    import { pocketbase } from '$lib/pocketbase';

    let item = $page.params.slug
    let product = {}
    let seller = {}
    let product_img = ''

    onMount(async () => {
        const record = await pocketbase.collection('campaigns').getOne(item, {
            expand: 'merchant'
        });

        product = record
        seller = record.expand.merchant
        product_img = product.stock_images[(Math.floor(Math.random() * product.stock_images.length))].url
    })
</script>

<style lang="postcss">
    .product_page_main {
        @apply bg-main_bg h-full w-full mb-16;
    }
</style>

<main class="product_page_main">
    <ProductHeading 
        header_img={product_img}
        seller_obj={seller}
    />
    <ProductContent
        product_obj={product}
     />
</main>