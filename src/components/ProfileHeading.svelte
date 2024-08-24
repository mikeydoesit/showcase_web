<script>
    import { currentUser } from '$lib/pocketbase.js';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import { show_avatar_uploader_form } from '$lib/store.js';

    const back_to_prev = () => {
        window.history.back();
    }
    const show_avatar_uploader = () => {
        show_avatar_uploader_form.set(true)
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
        @apply relative w-auto h-auto bg-main_bg rounded-full border-2 border-border_grey_two cursor-pointer;
    }
    .avatar_wrapper .avatar {
        @apply w-24 h-24 object-cover object-center rounded-full;
    }
    .avatar_wrapper .add_profile_pic {
        @apply absolute bg-accent_bg rounded-full z-10 right-0.5 bottom-0.5 flex justify-center items-center h-7 w-7 p-0.5;
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
        {#if $currentUser.avatar == ""}
            <img class="bgd" src="/images/avatar_placeholder.jpg" />
        {:else}
            <img class="bgd" src={`${PUBLIC_POCKETBASE_URL}/api/files/users/${$currentUser.id}/${$currentUser.avatar}`} alt="profile" />
        {/if}
    </div>
    <div class="profile_content">
        <div class="avatar_wrapper" on:click={show_avatar_uploader}>
            {#if $currentUser.avatar == ""}
                <img class="avatar" src="/images/avatar_placeholder.jpg" />
            {:else}
                <img class="avatar" src={`${PUBLIC_POCKETBASE_URL}/api/files/users/${$currentUser.id}/${$currentUser.avatar}`} alt="profile" />
            {/if}
            <div class="add_profile_pic">
                <img src="/images/plus.png" alt="add" />
            </div>
        </div>
        <h5>{$currentUser.name}</h5>
        <p class="email">{$currentUser.email}</p>
    </div>
    <div class="back_btn" on:click={back_to_prev}>
        <img src="/images/back_chevron.png" alt="back"/>
    </div>
    <div class="notification">
        <img src="/images/bell.png" alt="bell"/>
    </div>
</section>