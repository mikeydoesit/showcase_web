<script>
    import { page } from '$app/stores'

</script>
<style lang="postcss">
    .tapbar_wrapper {
        @apply fixed bottom-0 w-[-webkit-fill-available] bg-main_bg;
        /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; */
        box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 15px -10px inset;
    }
    .tapBarMenu {
        @apply  grid grid-cols-tapbarmenu grid-rows-tapbarmenu z-20 max-w-[576px] relative;
    }
    .menuItem {
        @apply w-full flex justify-center items-center py-5 z-20;
    }
    img {
        @apply w-7 h-7;
    }
</style>


<section class='tapbar_wrapper'>
    <div class="tapBarMenu">
        {#if $page.url.pathname == "/home"}
            <a href="/home" class="menuItem">
                <img src="/images/home_active.png" alt="Home menu icon" />
            </a>
        {:else}
            <a href="/home" class="menuItem">
                <img src="/images/home.png" alt="Home menu icon" />
            </a>
        {/if}
        {#if $page.url.pathname.startsWith('/category')}
            <a href="/category" class="menuItem">
                <img src="/images/categories_active.png" alt="offers icon" />
            </a>
        {:else}
            <a href="/category" class="menuItem">
                <img src="/images/categories.png" alt="offers icon" />
            </a>
        {/if}
        <!-- {#if $page.url.pathname.startsWith('/wishlist')}
            <a href="/wishlist" class="menuItem second_item">
                <img src="/images/heart_active.png" alt="wishlist icon" />
            </a>
        {:else}
            <a href="/wishlist" class="menuItem second_item">
                <img src="/images/heart.png" alt="wishlist icon" />
            </a>
        {/if} -->
        {#if $page.url.pathname.startsWith('/my-offers')}
            <a href="/my-offers" class="menuItem fourth_item">
                <img src="/images/offers_active.png" alt="offers icon" />
            </a>
        {:else}
            <a href="/my-offers" class="menuItem fourth_item">
                <img src="/images/offers.png" alt="offers icon" />
            </a>
        {/if}
        {#if $page.url.pathname.startsWith('/profile')}
            <a href="/profile" class="menuItem">
                <img src="/images/user_placeholder_active.png" alt="User icon" />
            </a>
        {:else}
            <a href="/profile" class="menuItem">
                <img src="/images/user_placeholder.png" alt="User icon" />
            </a>
        {/if}
    </div>
</section>