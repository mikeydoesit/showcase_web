<script>
    const back_to_prev = () => {
        window.history.back();
    }
</script>

<style lang="postcss">
    .profile_heading {
        @apply h-72 w-full flex justify-center items-center relative;
    }
    .bgd_wrapper {
        @apply h-full w-full overflow-y-hidden;
    }
    .bgd {
        @apply blur-3xl object-cover object-center h-full w-full;
    }
    .profile_content {
        @apply absolute z-10 h-full w-full flex-col flex justify-center items-center mt-10;
    }
    .avatar_wrapper {
        @apply w-auto h-auto bg-main_bg rounded-full border-2 border-border_grey_two;
    }
    .avatar_wrapper img {
        @apply w-24 h-24 object-cover object-center rounded-full;
    }
    .profile_content h5 {
        @apply mt-4 text-main_bg text-lg font-medium;
    }
    .profile_content .email {
        @apply text-main_bg;
    }
    .notification, .back_btn {
        @apply absolute top-7 z-20;
    }
    .back_btn {
        @apply bg-white left-7 bg-opacity-40 rounded-full flex justify-center items-center p-1;
    }
    .notification {
        @apply right-7 pt-1;
    }
    .notification img, .back_btn img {
        @apply w-7 h-7;
    }
</style>

<section class="profile_heading">
    <div class="bgd_wrapper">
        <img class="bgd" src="/images/profile_pic.jpeg" />
    </div>
    <div class="profile_content">
        <div class="avatar_wrapper">
            <img src="/images/profile_pic.jpeg" alt="profile_pic"/>
        </div>
        <h5>Sabrina Medhurst</h5>
        <p class="email">sabrinam@gmail.com</p>
    </div>
    <div class="back_btn" on:click={back_to_prev}>
        <img src="/images/back_chevron.png" alt="back"/>
    </div>
    <div class="notification">
        <img src="/images/bell.png" alt="bell"/>
    </div>
</section>