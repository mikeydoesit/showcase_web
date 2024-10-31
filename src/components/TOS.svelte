<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_tos } from '$lib/store.js';

    const back_to_prev = () => {
        show_tos.set(false)
    }
</script>

<style lang="postcss">
    .tos {
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
    .tos_content {
        @apply px-8 pt-2 pb-4;
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
</style>

<section class="tos" transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
    <div class="page_header">
        <div class="back_btn" on:click={back_to_prev}>
            <img src="/images/back_chevron.png" alt='back' />
        </div>
        <h1>Terms of Service</h1>
    </div>
    <div class="tos_content">
        <p class="updated">Last Modified: 26 August 2024</p>
        <ol class="list">
            <li class="list_item">
                <h4 class="list_item_title">Acceptance of Terms</h4>
                <p>By using the Tesomame app (the "App"), you agree to comply with and be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, do not use the App.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">User Accounts</h4>
                <p>To take advantage of offers, you must create an account by providing a valid email address, name, password, and phone number. The subscription fee is 200 Ghana cedis per month. Users can view offers without an account. There are currently no specific restrictions on account creation.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Subscription and Payment</h4>
                <p>Subscriptions are processed via Paystack. If automatic renewal is not available, you will need to manually renew your subscription or opt for an annual subscription. Refunds are not offered at this time. Trial periods may be considered in the future.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">User Conduct and Content</h4>
                <p>Users may only rate establishments from 1 to 5. Any inappropriate behavior or misuse of the app will not be tolerated.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Termination of Accounts</h4>
                <p>If a user pays for a subscription using fraudulent means, their account will be instantly terminated, and their email address will be blacklisted. Appeals or resolutions must be handled via email.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Disclaimers</h4>
                <p>Accuracy of Information: While we strive to provide accurate and up-to-date information, we do not guarantee the completeness, accuracy, or reliability of the content provided in the app. Users should verify any information before relying on it.</p>
                <p>Availability of Services: The app and its services may experience interruptions or downtime due to maintenance, updates, or other unforeseen factors. We do not guarantee uninterrupted access.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Limitation of Liability</h4>
                <p>To the fullest extent permitted by law, KodeKraft will not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the app, including but not limited to damages for loss of data, business interruption, or personal injury. Our total liability will be limited to the amount paid by you for the subscription.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Changes to Terms</h4>
                <p>We may update these Terms from time to time. Changes will be posted on this page with the updated date. Your continued use of the app after changes are made constitutes your acceptance of the new Terms.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Governing Law</h4>
                <p>These Terms are governed by the laws of Ghana. Any legal disputes will be resolved in the courts of Ghana.</p>
            </li>
            <li class="list_item">
                <h4 class="list_item_title">Contact Information</h4>
                <p>For questions or concerns about these Terms, please contact us at teamkodekraft@gmail.com.</p>
            </li>
        </ol>
    </div>
</section>