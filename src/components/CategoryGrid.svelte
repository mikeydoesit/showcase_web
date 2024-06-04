<script>
    import CategoryItems from '../lib/data/Categories'
</script>

<style lang="postcss">
    .category_grid {
        @apply grid grid-cols-category_grid gap-5 px-2.5 mt-8;
    }
    .category_grid a {
        @apply bg-border_grey_three flex justify-center items-center text-center px-4 h-12 rounded-md;
    }
</style>
<section class="category_grid">
    {#each CategoryItems as category}
        <a href={`/category/${category.tag}`} class="grid_item">
            <span>{category.name}</span>
        </a>
    {/each}
</section>  