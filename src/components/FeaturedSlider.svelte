<style lang="postcss">
    .featured_slider_main {
        @apply h-80;
    }
    .slider_container {
        @apply h-full w-full;
    }
    .slide {
        @apply relative h-full
    }
    .slide_bg_img {
        @apply object-cover object-center absolute h-full w-full;
    }
    .slide_bg_gradient_one {
        @apply absolute w-full h-full z-10 bg-gradient-to-t from-splash_bg from-10% to-highlight_bg opacity-20;
    }
    .slide_bg_gradient_two {
        @apply absolute w-full h-full z-10 bg-gradient-to-t from-splash_bg from-15%;
    }
    .slide_content {
        @apply z-20 absolute w-full h-full flex justify-end flex-col px-5 py-10;
    }
    .offer_title {
        @apply text-white text-2xl font-bold mb-2.5;
    }
    .offer_summary {
        @apply flex flex-row justify-between;
    }
    .offer_desc {
        @apply text-sm text-white;
    }
    .offer_link {
        @apply ml-8 border border-white rounded-xl px-3.5 h-fit py-2;
    }
    .offer_link span {
        @apply text-white font-semibold;
    }
</style>

<section class="featured_slider_main">
    <div class="slider_container">
        <div class="slide">
            <img class="slide_bg_img" src="/images/drc_bumper_cars.jpeg" alt="slide_bg_img"/>
            <div class="slide_bg_gradient_one"></div>
            <div class="slide_bg_gradient_two"></div>
            <div class="slide_content">
                <h2 class="offer_title">Buckle up for laughs!<br/>The fun starts now.</h2>
                <div class="offer_summary">
                    <p class="offer_desc">Enjoy a free Bumper car pass when a pass of equal value or greater is purchased.</p>
                    <a href="#" class="offer_link">
                        <span>Explore</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="slide_bullets">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</section>                                                                                                      