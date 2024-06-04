<script>
    export let linkURL
    export let imgURL
    export let title
    export let text
    export let img_class
    export let logo
    export let logo_width
    
</script>

<style lang="postcss">
    .featured_category_card {
        @apply grid grid-cols-featured_grid w-full px-3 mt-10 gap-8;
    }
    .feature_card {
        @apply relative rounded-lg w-full h-80;
    }
    .img_wrapper {
        @apply rounded-lg w-full h-full;
    }
    .img  {
        @apply object-cover h-full w-full rounded-2xl;
    }
    .content_wrapper {
        @apply absolute z-20 top-0 bottom-0 left-0 right-0 p-6 flex flex-col;
    }
    .content_wrapper h3 {
        @apply w-48 text-white text-3xl font-black mb-3 drop-shadow-lg;
    }
    .content_wrapper p {
        @apply text-lg text-white w-48 mb-4 drop-shadow-xl;
    }
    /* .logo_wrapper {
        @apply w-8;
    } */
</style>

<section class="featured_category_card">
        <a href={linkURL} class="feature_card">
            <div class="img_wrapper">
                <img class={`img ${img_class}`}  src={imgURL} alt="feature" />
            </div>
            <div class="content_wrapper">
                <h3>{title}</h3>
                <p>{text}</p>
                <div class={`logo_wrapper ${logo_width}`}>
                    <img src={logo} alt="logo" /> 
                </div>
            </div>
        </a>
</section>