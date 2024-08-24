<script>
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    export let seller_obj
    export let header_img

    const go_back = () => {
        window.history.back()
    }
</script>

<style lang="postcss">
    .product_heading {
        @apply h-44 w-full relative;
    }
    .bgd {
        @apply h-full w-full object-center object-cover;
    }
    .top_icons {
        @apply absolute h-1/5 w-full flex flex-row top-5 justify-between px-4;
    }
    .icon_wrapper {
        @apply w-8 h-8 bg-main_bg bg-opacity-60 p-2 rounded-full flex justify-center items-center;
    }
    .floating_card_wrapper {
        @apply h-full px-8 pb-4 w-full absolute top-3/4 z-20;
    }
    .floating_card {
        @apply h-full bg-main_bg w-full rounded-xl          flex flex-col items-center py-2.5;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }
    .floating_card_content {
        @apply flex flex-col justify-evenly h-[-webkit-fill-available];
    }
    .logo_wrapper {
        @apply h-9 my-1.5;
    }
    .logo_wrapper img {
        @apply h-full;
    }
    .merchant {
        @apply text-splash_bg font-bold text-xl text-center;
    }
    .rating {
        @apply flex flex-row justify-center items-center;
    }
    .rating img {
        @apply h-3.5 w-3.5;
    }
    .basic_info {
        @apply flex flex-row justify-center items-center mt-1;
    }
    .location_wrapper {
        @apply flex flex-row items-center mr-4;
    }
    .location_wrapper img {
        @apply h-4 mr-1;
    }
    .location {
        @apply text-xs text-text_grey;
    }
    .opening_times_wrapper {
        @apply flex flex-row items-center;
    }
    .opening_times_wrapper img {
        @apply h-3 mr-2;
    }
    .opening_times {
        @apply text-xs text-text_grey;
    }
    .opening_times span {
        @apply text-xs text-accent_bg font-bold;
    }
</style>

<section class="product_heading">
    {#if header_img}
        <img class="bgd" src={header_img} alt="icon" />
    {/if}
    <div class="top_icons">
        <div class="icon_wrapper" on:click={go_back}>  
            <img src="/images/left_chevron_splash.png" alt="icon"/>
        </div>
        <div class="icon_wrapper">
            <img src="/images/share.png" alt="icon"/>
        </div>
    </div>
    <div class="floating_card_wrapper">
        <div class="floating_card">
            <div class="logo_wrapper">
                {#if seller_obj.logo != ''}
                    <img src={`${PUBLIC_POCKETBASE_URL}/api/files/merchants/${seller_obj.id}/${seller_obj.logo}`} alt="logo"/>
                {/if}
            </div>
            <div class="floating_card_content">
                {#if seller_obj.business_name}
                    <h4 class="merchant">{seller_obj.business_name}</h4>
                {/if}
                <div class="rating">
                    <img src="/images/star.png" alt="star" />
                    <img src="/images/star.png" alt="star" />
                    <img src="/images/star.png" alt="star" />
                    <img src="/images/star.png" alt="star" />
                    <img src="/images/star_grey.png" alt="star" />
                </div>
                <div class="basic_info">
                    <div class="location_wrapper">
                        {#if seller_obj.location}
                            <img src="/images/location_pin.png" />
                            <p class="location">{seller_obj.location}</p>
                        {/if}
                    </div>
                    <div class="opening_times_wrapper">
                        <img src="/images/clock.png" />
                        <p class="opening_times"><span>Open </span>10am - 10pm</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>