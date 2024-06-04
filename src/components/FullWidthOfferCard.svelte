<style lang="postcss">
    .full_width_offer_card {
        @apply px-4;
    }
    .card {
        @apply flex flex-col rounded-xl mb-6;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }
    .card_img_wrapper {
        @apply w-full h-48 relative rounded-t-xl;
    }
    .card_img_wrapper img {
        @apply w-full h-full object-cover object-center rounded-t-xl;
    }
    .logo_wrapper {
        @apply absolute left-0 top-4 bg-main_bg w-16 px-2 py-1;
    }
    .offer_details_wrapper {
        @apply flex flex-row justify-between rounded-bl-xl;
    }
    .offer_details_main {
        @apply pl-2 rounded-bl-xl pb-3;
    }
    .company {
        @apply mt-2 text-lg text-splash_bg font-medium;
    }
    .product {
        @apply text-text_grey text-sm;
    }
    .price_wrapper {
        @apply flex flex-row items-center mt-2;
    }
    .price_wrapper img {
        @apply w-4 h-4 mr-2;
    }
    .old_price {
        @apply text-xs text-text_grey;
    }
    .slash {
        @apply mx-1 text-xs text-text_grey;
    }
    .new_price {
        @apply text-accent_bg font-semibold text-lg;
    }
    .offer_more_info {
        @apply flex flex-row items-center mt-1;
    }
    .time_left_wrapper {
        @apply flex flex-row items-center mr-3.5;
    }
    .time_left {
        @apply text-xs text-highlight_bg;
    }
    .time_left_wrapper img {
        @apply w-4 h-4 mr-1;
    }
    .location_wrapper {
        @apply flex flex-row items-center;
    }
    .location_wrapper img {
        @apply h-4 mr-1;
    }
    .location {
        @apply text-xs text-text_grey;
    }
    .offer_coupon {
        @apply flex flex-col items-center justify-center bg-splash_bg text-main_bg px-3 border-l-2 border-dotted rounded-br-xl;
    }
    .offer_coupon img {
        @apply w-6 h-6;
    }
    .offer_coupon span {
        @apply text-xs mt-2;
    }
    .offer_coupon p {
        @apply text-xl font-semibold;
    }
</style>

<section class="full_width_offer_card">
    <a href="/product/test" class="card">
        <div class="card_img_wrapper">
            <img src="/images/drc_bumper_cars.jpeg" alt="offer" />
            <div class="logo_wrapper">
                <img src="/images/drc_logo.png" alt="logo" />
            </div>
        </div>
        <div class="offer_details_wrapper">
            <div class="offer_details_main">
                <h4 class="company">Deon Recreational Centre</h4>
                <h6 class="product">10 minute bumper car joyride</h6>
                <div class="price_wrapper">
                    <img src="/images/checkmark.png" alt="checkmark"/>
                    <span class="old_price"><s>GH&#8373; 50</s></span>
                    <span class="slash">/</span>
                    <p class="new_price">GH&#8373; 40</p>
                </div>
                <div class="offer_more_info">
                    <div class="time_left_wrapper">
                        <img src="/images/time.png" alt="time icon" />
                        <span class="time_left">3 days left</span>
                    </div>
                    <div class="location_wrapper">
                        <img src="/images/location_pin.png" alt="location" />
                        <span class="location">Lashibi Accra</span>
                    </div>
                </div>
            </div>
            <div class="offer_coupon">
                <img src="/images/white_coupon.png" alt="coupon" />
                <span>Save up to</span>
                <p>30%</p>
            </div>
        </div>
    </a>
</section>