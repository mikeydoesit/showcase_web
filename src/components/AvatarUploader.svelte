<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_avatar_uploader_form, avatar_uploader_input } from '$lib/store.js';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import { currentUser } from '$lib/pocketbase.js'

    export let submit_avatar;

    let avatar_preview_url

    const hide_element = () => {
        show_avatar_uploader_form.set(false)
    }
    const set_avatar = (e) => {
        avatar_uploader_input.set(e.target.files)
        avatar_preview_url = URL.createObjectURL($avatar_uploader_input[0])
    }
</script>

<style lang="postcss">
    .avatar_uploader {
        @apply bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0 z-30;
    }
    .avatar_uploader_inner_wrapper {
        @apply h-full w-full relative bg-transparent flex flex-col justify-end;
    }
    .avatar_uploader_inner {
        @apply bg-main_bg h-auto max-h-[80vh] w-full rounded-t-2xl z-20 px-8 py-8 overflow-y-scroll;
    }
    .avatar_uploader_header {
        @apply flex flex-row justify-between items-center;
    }
    .avatar_uploader_header h3 {
        @apply text-3xl font-black text-black;
    }
    .avatar_uploader_main {
        @apply mt-12;
    }
    .avatar_uploader_main_content {
        @apply flex flex-row items-center w-full mb-10;
    }
    .avatar_preview {
        @apply h-fit w-fit mr-6 rounded-full;
    }
    .avatar_preview img {
        @apply h-16 w-16 object-center object-cover rounded-full;
    }
    .avatar_uploader_input_wrapper {
        @apply block relative;
    }
    #avatar_uploader_input {
        @apply absolute h-0 w-0 opacity-0;
    }
    .avatar_uploader_label_inner {
        @apply flex flex-row bg-main_bg border-2 border-accent_bg items-center w-full py-1.5 px-4 rounded-lg cursor-pointer;
    }
    .avatar_uploader_btn_text {
        @apply text-xs text-accent_bg font-bold ml-2;
    }
    .sign_up_btn {
        @apply bg-splash_bg text-main_bg text-lg font-bold w-11/12 py-4 flex justify-center items-center rounded-lg mx-auto mt-2;
    }
</style>

<div class="avatar_uploader">
    <div class="avatar_uploader_inner_wrapper" on:click|self={hide_element}>
        <div class="avatar_uploader_inner" transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            <div class="avatar_uploader_header">
                <h3>Profile picture</h3>
            </div>
            <form class="avatar_uploader_main">
                <div class="avatar_uploader_main_content">
                    <div class="avatar_preview">
                        {#if $currentUser.avatar != "" && $avatar_uploader_input.length == 0}
                            <img src={`${PUBLIC_POCKETBASE_URL}/api/files/users/${$currentUser.id}/${$currentUser.avatar}`} alt="avatar"/>
                        {/if}
                        {#if $currentUser.avatar != "" && $avatar_uploader_input.length > 0}
                            <img src={avatar_preview_url} alt="avatar" />
                        {/if}
                        {#if $currentUser.avatar == "" && $avatar_uploader_input.length > 0}
                            <img src={avatar_preview_url} alt="avatar" />
                        {/if}
                        {#if $currentUser.avatar == "" && $avatar_uploader_input.length == 0}
                            <img src="/images/avatar_placeholder.jpg" alt="avatar" />
                        {/if}
                    </div>
                    <div class="avatar_uploader_input_wrapper">
                        <input id="avatar_uploader_input" type="file" accept="jpg/jpeg/png" on:input={set_avatar}/>
                        <label class="avatar_uploader_label" for="avatar_uploader_input">
                            <div class="avatar_uploader_label_inner">
                                <div class="avatar_uploader_btn">
                                    <img src="/images/upload_icon.png" />
                                </div>
                                <p class="avatar_uploader_btn_text">Select new profile picture</p>
                            </div>
                        </label>
                    </div>
                </div>
                <div class={`sign_up_btn ${($avatar_uploader_input.length > 0) ? 'pointer-events-auto cursor-pointer opacity-100' : 'pointer-events-none cursor-not-allowed opacity-60'}`} on:click={submit_avatar}>
                    <span>Upload</span>
                </div>
            </form>
        </div>
    </div>
</div>