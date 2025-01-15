<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_account_status, show_renewal_form } from '$lib/store.js';
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import { currentUser } from '$lib/pocketbase.js'

    export let purchase_subscription;

    const hide_element = () => {
        show_account_status.set(false)
    }
    // const set_avatar = (e) => {
    //     avatar_uploader_input.set(e.target.files)
    //     avatar_preview_url = URL.createObjectURL($avatar_uploader_input[0])
    // }
    const today = new Date()
    const expiration = new Date($currentUser.exp)
</script>

<style lang="postcss">
    .account_status {
        @apply bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0 z-30 h-screen;
    }
    .account_status_inner_wrapper {
        @apply h-full w-full relative bg-transparent flex flex-col justify-end;
    }
    .account_status_inner {
        @apply bg-main_bg h-fit max-h-[80vh] absolute w-full rounded-t-2xl z-20 px-8 py-8;
    }
    .account_status_header {
        @apply flex flex-row justify-between items-center;
    }
    .account_status_header h3 {
        @apply text-3xl font-black text-black;
    }
    .account_status_main {
        @apply mt-12;
    }
    .account_status_main_content {
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
    .expiration {
        @apply flex flex-row justify-between items-center mt-6 text-black;
    }
    .expiration h5 {
        @apply font-bold text-xl;
    }
</style>

<div class="account_status">
    <div class="account_status_inner_wrapper" on:click|self={hide_element}>
        <div class={`account_status_inner ${expiration ? "overflow-y-scroll" : ""}`} transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            {#if expiration}

                <div class="account_status_header">
                    <h3>Account status</h3>
                </div>
                {#if expiration > today}
                <div class="expiration">
                    <h5>Expires on</h5>
                    <p><i>{expiration.toDateString()}</i></p>
                </div>
                {:else}
                <div class="expiration">
                    <h5>Expired</h5>
                    <div class="sign_up_btn pointer-events-auto cursor-pointer opacity-100" on:click={purchase_subscription}>
                        <span>Renew</span>
                    </div>
                </div>
                {/if}
            {:else}
                <div class="renewal_form">
                    <div class="slider">

                    </div>
                    <div class="plans">
                        <div class="plan" >
                            <span class="plan_text">1 month/GH&#8373; 199</span>
                        </div>
                        <div class="plan">
                            <span class="plan_text">3 months/GH&#8373; 549</span>
                        </div>
                        <div class="plan">
                            <span class="plan_text">6 months/GH&#8373; 999</span>
                        </div>
                        <div class="plan">
                            <span class="plan_text">12 months/GH&#8373; 1799</span>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>