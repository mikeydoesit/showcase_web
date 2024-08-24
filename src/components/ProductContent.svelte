<script>
    export let product_obj
</script>

<style lang="postcss">
    .product_content {
        @apply mt-36 px-4;
    }
    .tabs {
        @apply grid grid-cols-product_tab;
    }
    .tab {
        @apply flex flex-row justify-center py-2.5;
    }
    .tab span {
        @apply text-lg font-semibold text-splash_bg;
    }
    .tab:first-of-type {
        @apply border-b-4 border-splash_bg
    }
    .deals_tab_content {
        @apply mt-4;
    }
    .deal {
        @apply rounded-xl pb-1;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
    .deals_img_wrapper {
        @apply h-40 w-full;
    }
    .deals_img_wrapper img {
        @apply h-full w-full object-center object-cover rounded-t-xl;
    }
    .deal_title {
        @apply text-splash_bg mt-4 text-lg font-semibold px-3;
    }
    .time_left_wrapper {
        @apply flex flex-row items-center text-highlight_bg font-semibold text-xs my-2 ml-1 px-3;
    }
    .time_left_wrapper img {
        @apply h-4 w-4 mr-1.5;
    }
    .deal_description {
        @apply text-text_grey text-sm px-3;
    }
    .deals_option {
        @apply mt-6 px-3;
    }
    .deals_option h4 {
        @apply text-xl font-bold text-splash_bg mb-3;
    }
    .option {
        @apply flex flex-row justify-between items-center mb-6;
    }
    .option:last-of-type {
        @apply mb-3;
    }
    .option_title {
        @apply text-splash_bg font-semibold mb-1;
    }
    .pricing {
        @apply flex flex-row items-center;
    }
    .discount {
        @apply bg-splash_bg bg-opacity-20 px-1 py-0.5 rounded-lg mr-3;
    }
    .discount span {
        @apply text-splash_bg text-sm font-semibold;
    }
    .price {
        @apply flex flex-row items-center
    }
    .old_price {
        @apply text-xs text-text_grey mr-2;
    }
    .new_price {
        @apply text-accent_bg font-semibold text-lg;
    }
    .add_btn_wrapper {
        @apply border rounded-lg py-1.5 px-2.5 border-border_grey_five cursor-pointer;
    }
    .add_btn_content {
        @apply flex flex-row items-center;
    }
    .add_btn_content img {
        @apply h-5 w-5 mr-1.5;
    }
    .add_btn_content span {
        @apply text-splash_bg text-lg font-semibold;
    }
</style>

<section class="product_content">
    <div class="tabs">
        <div class="tab">
            <span>Deal</span>
        </div>
        <div class="tab">
            <span>Reviews</span>
        </div>
        <div class="tab">
            <span>Info</span>
        </div>
    </div>
    <div class="deals_tab_content">
        {#if Object.keys(product_obj).length > 0}
            <div class="deal">
                <div class="deals_img_wrapper">
                    <img src={product_obj.stock_images[(Math.floor(Math.random() * product_obj.stock_images.length))].url} alt="deals image"/>
                </div>
                <h3 class="deal_title">{product_obj.product_name}</h3>
                <div class="time_left_wrapper">
                    <img src="/images/time.png" alt="time icon" />
                    <span class="time_left">3 days left</span>
                </div>
                {#if product_obj.discount_type == 'BOGOF'}
                    <p class="deal_description">Enjoy a free {product_obj.product_name} when a {product_obj.product_name} of equal value or greater is purchased.</p>
                {/if}
                {#if product_obj.discount_type == 'Percentage'}
                    <p class="deal_description">Up to {product_obj.discount_value}% off on {product_obj.product_name} at {product_obj.expand.merchant.business_name}.</p>
                {/if}
                <div class="deals_option">
                    <!-- <h4>Purchase options:</h4> -->
                    <div class="option">
                        <div class="option_details">
                            <h5 class="option_title">{product_obj.product_name}</h5>
                            <div class="pricing">
                                <div class="discount">
                                    {#if product_obj.discount_type == 'Percentage'}
                                        <span>{product_obj.discount_value}% Off</span>
                                    {/if}
                                </div>
                                <div class="price">
                                    {#if product_obj.discount_type == 'Percentage'}
                                        <span class="old_price"><s>GH&#8373; {product_obj.original_price}</s></span>
                                        <p class="new_price">GH&#8373; {product_obj.original_price - ((product_obj.original_price/100) * product_obj.discount_value)}</p>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="add_btn_wrapper">
                            <div class="add_btn_content">
                                <img src="/images/add.png" alt="add "/>
                                <span>Add</span>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="option">
                        <div class="option_details">
                            <h5 class="option_title">10 minute bumper car joyride</h5>
                            <div class="pricing">
                                <div class="discount">
                                    <span>10% Off</span>
                                </div>
                                <div class="price">
                                    <span class="old_price"><s>GH&#8373; 50</s></span>
                                    <p class="new_price">GH&#8373; 40</p>
                                </div>
                            </div>
                        </div>
                        <div class="add_btn_wrapper">
                            <div class="add_btn_content">
                                <img src="/images/add.png" alt="add "/>
                                <span>Add</span>
                            </div>
                        </div>
                    </div>
                    <div class="option">
                        <div class="option_details">
                            <h5 class="option_title">10 minute bumper car joyride</h5>
                            <div class="pricing">
                                <div class="discount">
                                    <span>10% Off</span>
                                </div>
                                <div class="price">
                                    <span class="old_price"><s>GH&#8373; 50</s></span>
                                    <p class="new_price">GH&#8373; 40</p>
                                </div>
                            </div>
                        </div>
                        <div class="add_btn_wrapper">
                            <div class="add_btn_content">
                                <img src="/images/add.png" alt="add "/>
                                <span>Add</span>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        {/if}
    </div>
</section>