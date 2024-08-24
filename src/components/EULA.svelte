<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_eula } from '$lib/store.js';

    const back_to_prev = () => {
        show_eula.set(false)
    }
</script>

<style lang="postcss">
    .eula {
        @apply absolute z-10 top-0 left-0 right-0 bg-main_bg h-screen ;
    }
    .page_header {
        @apply bg-splash_bg flex justify-center py-4 relative items-center;
    }
    .page_header h1 {
        @apply text-white text-lg font-bold uppercase;
    }
    .back_btn {
        @apply h-7 w-7 absolute left-6 bg-main_bg bg-opacity-40 rounded-full flex justify-center items-center p-1;
    }
    .eula_content {
        @apply px-8 pt-2 pb-4;
    }
    .eula_content h2 {
        @apply text-xl mt-3;
    }
    .updated {
        @apply my-4;
    }
    .list {
        @apply list-decimal;
    }
    .list_item {
        @apply mb-4;
    }
    .list_item p {
        @apply text-justify;
    }
    .list_item_title {
        @apply underline underline-offset-2 mb-1;
    }
    .sub_list {
        @apply list-disc mt-2;
    }
    .sub_list_item {
        @apply ml-5;
    }
    .sub_list_item p {
        @apply text-justify;
    }
</style>

<section class="eula" transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
    <div class="page_header">
        <div class="back_btn" on:click={back_to_prev}>
            <img src="/images/back_chevron.png" alt='back' />
        </div>
        <h1>EULA</h1>
    </div>
    <div class="eula_content">
        <h2>End User Licence Agreement</h2>
        <p class="updated">Last Modified: 26 August 2024</p>
        <ol class="list">
            <li class="list_item">
                <h4 class="list_item_title">License Grant</h4>
                <p>Subject to your compliance with these terms, KodeKraft grants you a limited, non-exclusive, non-transferable license to access and use the Mango web application (the "App") for personal, non-commercial use.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">License Restrictions</h4>
                <p>You agree not to:</p>
                <ul class="sub_list">
                    <li class="sub_list_item">
                        <p>Copy, modify, or create derivative works of the App.</p>
                    </li>
                    <li class="sub_list_item">
                        <p>Reverse engineer, disassemble, or decompile the App or attempt to derive its source code.</p>
                    </li>
                    <li class="sub_list_item">
                        <p>Distribute, rent, lease, or sell the App or any portion of it.</p>
                    </li>
                    <li class="sub_list_item">
                        <p>Use the App in any manner that could negatively impact KodeKraft's profits, including but not limited to unauthorized sharing or reproduction.</p>
                    </li>
                </ul>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Reservation of Rights</h4>
                <p>All rights not expressly granted to you are reserved by KodeKraft. You do not acquire any ownership interest in the App beyond the rights expressly granted in this EULA.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Updates and Support</h4>
                <p>KodeKraft may, at its discretion, provide updates to the App. Updates will be delivered through the App or via other methods as determined by KodeKraft.</p>
                <p>Support for the App will be provided through teamkodekraft@gmail.com. KodeKraft is not obligated to provide maintenance or support beyond what is outlined here.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Termination</h4>
                <p>This license will terminate automatically if you breach any terms of this EULA. Upon termination, you must cease all use of the App and delete all copies of it from your devices.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Disclaimers</h4>
                <p>The App is provided "as is" without warranties of any kind. KodeKraft does not guarantee the accuracy or reliability of any information provided through the App.</p>
                <p>The App may be interrupted or unavailable due to maintenance or other factors. KodeKraft does not guarantee uninterrupted access.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Limitation of Liability</h4>
                <p>To the fullest extent permitted by law, KodeKraft is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the App. The maximum liability of KodeKraft is limited to the amount paid by you for the subscription.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Governing Law</h4>
                <p>This EULA is governed by the laws of Ghana. Any disputes will be resolved in the courts of Ghana.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Contact Information</h4>
                <p>For questions regarding this EULA, please contact us at teamkodekraft@gmail.com.</p>
            </li>
        </ol>
    </div>
</section>