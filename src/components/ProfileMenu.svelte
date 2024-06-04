<style lang="postcss">
    .profile_menu {
        @apply mt-10;
    }
    .menu_list, .secondary_menu {
        @apply px-5;
    }
    .list_item {
        @apply flex flex-row justify-between items-center pr-3 border-b-2 py-3 border-border_grey_three cursor-pointer;
    }
    .list_item:last-of-type {
        @apply border-border_grey_four pb-5;
    }
    .list_item h6 {
        @apply text-lg font-bold text-splash_bg;
    }
    .icon_wrapper {
        @apply flex flex-row items-center justify-center;
    }
    .icon_wrapper img {
        @apply w-5 h-5;
    }
    .secondary_menu .list_item:first-of-type {
        @apply pt-5;
    }
    .secondary_menu .list_item:last-of-type {
        @apply border-none;
    }
    .secondary_menu .list_item h6 {
        @apply text-lg font-normal text-accent_bg;
    }
</style>


<section class="profile_menu">
    <ul class="menu_list">
        <li class="list_item">
            <h6 class="list_item_title">Edit profile</h6>
            <div class="icon_wrapper">
                <img src="/images/right_chevron.png" alt="chevron" />
            </div>
        </li>
        <li class="list_item">
            <h6 class="list_item_title">Purchases</h6>
            <div class="icon_wrapper">
                <img src="/images/right_chevron.png" alt="chevron" />
            </div>
        </li>
        <li class="list_item">
            <h6 class="list_item_title">Notification settings</h6>
            <div class="icon_wrapper">
                <img src="/images/right_chevron.png" alt="chevron" />
            </div>
        </li>
        <li class="list_item">
            <h6 class="list_item_title">Location & privacy</h6>
            <div class="icon_wrapper">
                <img src="/images/right_chevron.png" alt="chevron" />
            </div>
        </li>
        <li class="list_item">
            <h6 class="list_item_title">Terms of service</h6>
            <div class="icon_wrapper">
                <img src="/images/right_chevron.png" alt="chevron" />
            </div>
        </li>
    </ul>
    <ul class="secondary_menu">
        <li class="list_item">
            <h6 class="list_item_title">Contact us</h6>
            <div class="icon_wrapper">
                <img src="/images/right_chevron.png" alt="chevron" />
            </div>
        </li>
        <li class="list_item">
            <h6 class="list_item_title">About Showcasee</h6>
            <div class="icon_wrapper">
                <img src="/images/right_chevron.png" alt="chevron" />
            </div>
        </li>
        <li class="list_item">
            <h6 class="list_item_title">Sign out</h6>
            <div class="icon_wrapper">
                <img src="/images/right_chevron.png" alt="chevron" />
            </div>
        </li>
    </ul>
</section>