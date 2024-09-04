<script>
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_registration, registration_email, registration_name, registration_password, registration_number, show_registration_page_one, show_registration_page_two, mobile_money_number, mobile_money_network } from '$lib/store.js';
    import { imask } from '@imask/svelte';

    export let submit_new_user;

    let valid_email = false
    let valid_pwd = false
    let valid_name = false
    let valid_number = false
    let show_email_error = false
    let show_name_error = false
    let show_pwd_error = false
    let show_number_error = false

    // iMask options
    const phone_number_options = {
		mask: '000 000 000 0'
    };

    const hide_element = () => {
        show_registration.set(false)
    }
    const go_to_page_two = () => {
        show_registration_page_one.set(false)
        show_registration_page_two.set(true)
    }

    const set_name = (e) => {
        registration_name.set(e.target.value)
        if ($registration_name.length < 3) {
            show_name_error = true
            valid_name = false
        } else {
            show_name_error = false
            valid_name = true
        }
    }
    const set_mobile_number = ({ detail: imask }) => {
        mobile_money_number.set(imask.el.value)
        const regex = /^\d{3} \d{3} \d{3} \d{1}$/;
        console.log($mobile_money_number)
        if (regex.test($mobile_money_number)) {
            show_number_error = false
            valid_number = true
        } else {
            show_number_error = true
            valid_number = false
        }
    }

    const set_password = (e) => {
        registration_password.set(e.target.value)
        if ($registration_password.length < 8 || $registration_password.length > 72) {
            show_pwd_error = true
            valid_pwd = false
        } else {
            show_pwd_error = false
            valid_pwd = true
        }
    }

    const validate_email = (e) => {
        let email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email_pattern.test(e.target.value)) {
            show_email_error = true
            valid_email = false
        } else {
            show_email_error = false
            valid_email = true
        }
    }
    const set_email = (e) => {
        registration_email.set(e.target.value)
        validate_email(e)
    }
</script>

<style lang="postcss">
.registration {
    @apply h-screen bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0 z-30;
}
.registration_inner_wrapper {
    @apply h-full w-full relative bg-transparent flex flex-col justify-end;
}
.registration_inner {
    @apply bg-main_bg h-auto max-h-[80vh] w-full rounded-t-2xl z-20 px-8 py-8 overflow-y-scroll;
}
.registration_header {
    @apply flex flex-row justify-between items-center;
}
.registration_header h3 {
    @apply text-3xl font-black text-black;
}
.img_upload_wrapper {
    @apply flex flex-col items-center;
}
#img_upload {
    @apply h-0 w-0 opacity-0;
}
.img_upload {
    @apply rounded-full border-[3px] border-splash_bg/40 inline-flex p-3;
}
.img_upload_label {
    @apply text-xs font-black text-border_grey_four/70 mt-2;
}
.registration_form_main {
    @apply mt-12;
}
.form_item {
    @apply border-b-2 mb-9;
}
.form_item label {
    @apply text-border_grey_four/70 text-sm font-black;
}
.form_item_input_wrapper {
    @apply flex flex-row py-1 pl-0.5;
}
.form_item_icon {
    @apply h-auto flex justify-center items-center;
}
.form_item_icon.main img {
    @apply mr-3;
}
.form_item_icon.error img{
    @apply ml-3;
}
.form_item_icon img {
    @apply h-5 w-5 object-cover object-center ;
}
.form_item_input_wrapper input {
    @apply w-[-webkit-fill-available] focus:border-0 focus:outline-0 focus-within:border-0 focus-within:outline-0 focus-visible:border-0 focus-visible:outline-0;
}
.sign_up_btn {
    @apply bg-splash_bg text-main_bg text-lg font-bold w-11/12 py-4 flex justify-center items-center rounded-lg mx-auto mt-2;
}
.card {
    @apply bg-black_mtn rounded-2xl p-6;
}
.network_icon {
    @apply h-9;
}
.network_icon img {
    @apply h-full ;
}
.bottom_half  {
    @apply text-main_bg mt-9;
}
.account_name {
    @apply flex flex-row justify-between items-center;
}
.mobile_money_number {
    @apply text-3xl mb-1 text-main_bg/90 font-medium;
}
.account_name h6 {
    @apply text-lg uppercase text-main_bg/70;
}
.network_selector {
    @apply flex flex-row justify-between items-center my-8 mx-4;
}
.network_selector_item {
    @apply relative border-2 py-2 px-3 rounded-2xl border-border_grey_four/60;
}
.network_selector_item input {
    @apply w-0 h-0 opacity-0 absolute;
}
.network_selector_item:has(> input:checked) {
    @apply border-accent_bg border-[3px];
}
.network_selector_btn {
    @apply h-8;
}
.network_selector_btn img {
    @apply h-full w-auto object-contain object-center;
}
</style>

<div class="registration">
    <div class="registration_inner_wrapper" on:click|self={hide_element}>
        <div class="registration_inner" transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            <div class="registration_header">
                {#if $show_registration_page_one}
                    <h3>New<br/>account</h3>
                {/if}
                {#if $show_registration_page_two}
                    <h3>Payment</h3>
                {/if}
                {#if $show_registration_page_one}
                    <div class="img_upload_wrapper">
                        <label for="img_upload" class="img_uploader">
                            <div class="img_upload">
                                <img src="/images/camera.png" alt="upload" />
                            </div>
                        </label>
                        <input id="img_upload" type="file" />
                        <span class="img_upload_label">Upload picture</span>
                    </div>
                {/if}
            </div>
            <form class="registration_form_main">
                {#if $show_registration_page_one}
                    <div class={`form_item ${(show_email_error) ? 'border-red' : 'border-splash_bg/40'}`}>
                        <label for="email_input">Email</label>
                        <div class="form_item_input_wrapper">
                            <div class={`form_item_icon main ${(show_email_error) ? 'w-[-webkit-fill-available]' : 'w-auto'}`}>
                                <img src="/images/mail.png" alt="mail" />
                            </div>
                            <input 
                                id="email_input"
                                type="email" 
                                on:input={set_email}
                                on:blur={validate_email}
                            />
                            {#if show_email_error}
                                <div class={`form_item_icon error ${(show_email_error) ? 'w-[-webkit-fill-available]' : 'w-auto'}`}>
                                    <img src="/images/info.png" alt="mail" />
                                </div>
                            {/if}
                        </div>
                    </div>
                    <div class={`form_item ${(show_name_error) ? 'border-red' : 'border-splash_bg/40'}`}>
                        <label for="name_input">Name</label>
                        <div class="form_item_input_wrapper">
                            <div class={`form_item_icon main ${(show_name_error) ? 'w-[-webkit-fill-available]' : 'w-auto'}`}>
                                <img src="/images/user_icon.png" alt="name" />
                            </div>
                            <input 
                                id="name_input" 
                                type="text"
                                on:input={set_name}
                            />
                            {#if show_name_error}
                                <div class={`form_item_icon error ${(show_name_error) ? 'w-[-webkit-fill-available]' : 'w-auto'}`}>
                                    <img src="/images/info.png" alt="mail" />
                                </div>
                            {/if}
                        </div>
                    </div>
                    <div class={`form_item ${(show_pwd_error) ? 'border-red' : 'border-splash_bg/40'}`}>
                        <label for="password_input">Password</label>
                        <div class="form_item_input_wrapper">
                            <div class={`form_item_icon main ${(show_pwd_error) ? 'w-[-webkit-fill-available]' : 'w-auto'}`}>
                                <img src="/images/key.png" alt="key" />
                            </div>
                            <input 
                                id="password_input" 
                                type="password"
                                on:input={set_password}
                            />
                            {#if show_pwd_error}
                                <div class={`form_item_icon error ${(show_pwd_error) ? 'w-[-webkit-fill-available]' : 'w-auto'}`}>
                                    <img src="/images/info.png" alt="mail" />
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class={`sign_up_btn ${(valid_email && valid_pwd && valid_name) ? 'pointer-events-auto cursor-pointer opacity-100' : 'pointer-events-none cursor-not-allowed opacity-60'}`} on:click={go_to_page_two}>
                        <span>Next</span>
                    </div>
                {/if}
                {#if $show_registration_page_two}
                    <div class="payment_section">
                        <div class="card">
                            <div class="network_icon">
                                {#if $mobile_money_network == "mtn"}
                                    <img src="/images/mtn_logo.png" />
                                {/if}
                                {#if $mobile_money_network == "atl"}
                                    <img src="/images/at_logo.png" />
                                {/if}
                                {#if $mobile_money_network == "vod"}
                                    <img src="/images/telecel.png" />
                                {/if}
                            </div>
                            <div class="bottom_half">
                                <div class="mobile_money_number">
                                    <h4>
                                        {#if $mobile_money_number.length == 0}
                                            ### ### ### #
                                        {:else}
                                            {$mobile_money_number}
                                        {/if}
                                    </h4>
                                </div>
                                <div class="account_name">
                                    <h6>{$registration_name}</h6>
                                    <div class="chip_icon_wrapper">
                                        <img src="/images/chip.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="network_selector">
                            <div class="network_selector_item">
                                <input id="mtn" type="radio" name="network" bind:group={$mobile_money_network} value="mtn"/>
                                <label for="mtn">
                                    <div class="network_selector_btn">
                                        <img src="/images/mtn_btn_logo.png" alt="mtn" />
                                    </div>
                                </label>
                            </div>
                            <div class="network_selector_item">
                                <input id="airtel" type="radio" name="network" bind:group={$mobile_money_network} value="atl" />
                                <label for="airtel">
                                    <div class="network_selector_btn">
                                        <img src="/images/at_logo.png" alt="airtel" />
                                    </div>
                                </label>
                            </div>
                            <div class="network_selector_item">
                                <input id="telecel" type="radio" name="network" bind:group={$mobile_money_network} value="vod" />
                                <label for="telecel">
                                    <div class="network_selector_btn">
                                        <img src="/images/telecel_btn_logo.png" alt="telecel" />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class={`form_item ${(show_number_error) ? 'border-red' : 'border-splash_bg/40'}`}>
                            <label for="mobile_number_input">Phone</label>
                            <div class="form_item_input_wrapper">
                                <div class={`form_item_icon main ${(show_number_error) ? 'w-[-webkit-fill-available]' : 'w-auto'}`}>
                                    <img src="/images/mobile_phone.png" alt="Mobile phone icon" />
                                </div>
                                <input 
                                    id="mobile_number_input" 
                                    type="tel"
                                    pattern="\d{3} \d{3} \d{3} \d{1}"
                                    on:accept={set_mobile_number}
                                    use:imask={phone_number_options}
                                />
                                {#if show_number_error}
                                    <div class={`form_item_icon error ${(show_number_error) ? 'w-[-webkit-fill-available]' : 'w-auto'}`}>
                                        <img src="/images/info.png" alt="error" />
                                    </div>
                                {/if}
                            </div>
                        </div>
                        <div class={`sign_up_btn ${(valid_number) ? 'pointer-events-auto cursor-pointer opacity-100' : 'pointer-events-none cursor-not-allowed opacity-60'}`} on:click={submit_new_user}>
                            <span>Pay GH&#8373; 200</span>
                        </div>
                    </div>
                {/if}
            </form>
        </div>
    </div>
</div>