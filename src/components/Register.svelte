<script>
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_registration, registration_email, registration_name, registration_password, registration_number, show_registration_page_one, show_registration_page_two, show_registration_page_three, mobile_money_number, mobile_money_network } from '$lib/store.js';
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

    let payment_method = "momo"
    let term_length = "monthly"

    // iMask options
    const phone_number_options = {
		mask: '000 000 000 0'
    };

    const hide_element = () => {
        show_registration.set(false)
    }
    const go_to_page_two = () => {
        show_registration_page_one.set(false)
        show_registration_page_three.set(false)
        show_registration_page_two.set(true)
    }
    const go_to_page_one = () => {
        show_registration_page_three.set(false)
        show_registration_page_two.set(false)
        show_registration_page_one.set(true)
    }
    const go_to_page_three = () => {
        show_registration_page_one.set(false)
        show_registration_page_two.set(false)
        show_registration_page_three.set(true)
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
    @apply bg-main_bg h-auto max-h-[80vh] w-full rounded-t-2xl z-20 px-6 py-8 overflow-y-scroll;
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
    @apply mt-10;
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
    @apply text-2xl mb-2 text-main_bg/90 font-medium;
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
.method_selector {
    @apply flex flex-col gap-2 mt-6;
}
.method_selector_item {
    @apply relative px-2 py-3;
}
.cell_bg {
    @apply absolute top-0 bottom-0 left-0 right-0 -z-10 rounded-xl;
}
.method_selector_item_input {
    @apply h-0 w-0 opacity-0 absolute;
}
.method_selector_item_label {
    @apply w-full h-full;
}
.item_label_inner {
    @apply flex flex-row justify-between;
}
.item_label_inner_main_col {
    @apply flex flex-col;
}
.item_label_inner_main_col h4 {
    @apply text-lg font-medium text-black mt-2;
}
.method_logos {
    @apply flex flex-row items-center gap-2.5;
}
.method_logo_wrapper {
    @apply h-9;
}
.method_logo_wrapper img {
    @apply w-auto h-full;
}
.checked_icon {
    @apply w-6 flex items-center justify-center;
}
.checked_icon img {
    @apply w-full h-auto;
}
.method_selector_item_input:checked + .cell_bg {
    @apply bg-accent_bg/40;
}
.disclaimer {
    @apply flex flex-row justify-center py-3 pr-4 pl-2 bg-accent_bg/10 rounded-xl my-6;
}
.badge {
    @apply w-14 mr-2 flex items-center justify-center;
}
.badge img {
    @apply w-full h-auto;
}
.text {
    @apply text-xs flex items-center justify-center;
}
.text p {
    @apply text-justify;
}
.plan_selector {
    @apply relative min-h-32 rounded-xl bg-gradient-to-t from-splash_bg to-highlight_bg to-85% mb-8;
}
.abstract_dots {
    @apply absolute top-0 left-0 p-2 opacity-20 w-full;
}
.plan_selector_content {
    @apply px-6 py-6 z-10 relative;
}
.plan_selector_content .main_price {
    @apply flex flex-row text-main_bg items-center;
}
.plan_selector_content .main_price h3 {
    @apply font-semibold text-3xl m-0;
}
.plan_desc {
    @apply my-4 text-main_bg;
}
.plan_desc .title {
    @apply text-lg font-medium;
}
.plan_desc .desc {
    @apply mt-1 opacity-70 leading-5;
}
.term_length_selector {
    @apply bg-main_bg rounded-xl;
}
.term_length_item {
    @apply relative;
}
.term_length_item_input {
    @apply h-0 w-0 opacity-0 absolute;
}
.item_bg {
    @apply  absolute w-full h-full;
}
.term_length_selector .item_bg.top {
    @apply  rounded-t-xl;
}
.term_length_selector .item_bg.bottom {
    @apply  rounded-b-xl;
}
.term_length_item_input:checked + .item_bg {
    @apply bg-accent_bg;
}
.term_length_item_label {
    @apply z-10 relative;
}
.item_label_inner {
    @apply flex flex-row justify-between items-center px-4 py-3;
}
.item_label_inner .checkbox {
    @apply w-4;
}
.item_label_inner .checkbox img {
    @apply w-full h-auto;
}
.item_label_inner .item_title {
    @apply font-semibold text-lg;
}
.savings {
    @apply font-semibold text-xs text-accent_bg rounded-lg py-0.5 px-1.5;
}
.nav_wrapper {
    @apply flex flex-row gap-2 h-auto;
}
.nav_wrapper .back_btn {
    @apply bg-splash_bg rounded-lg flex justify-center items-center h-[inherit] mt-2 px-3.5;
}
.nav_wrapper .back_btn img {
    @apply h-8;
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
                    <h3>Select your term length</h3>
                {/if}
                {#if $show_registration_page_three}
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
                    <div class="payment_method">
                        <div class="plan_selector">
                            <img class="abstract_dots" src="/images/dots.png" alt="dots" />
                            <div class="plan_selector_content">
                                <div class="main_price">
                                    {#if term_length == "monthly"}
                                        <h3>GH&#8373; 200</h3>
                                    {:else if term_length == "quarterly"}
                                        <h3>GH&#8373; 180</h3>
                                    {:else if term_length == "biannually"}
                                        <h3>GH&#8373; 170</h3>
                                    {:else if term_length == "annually"}
                                        <h3>GH&#8373; 150</h3>
                                    {/if}
                                    <p>/month</p>
                                </div>
                                <div class="plan_desc">
                                    <h5 class="title">Mango  
                                    {#if term_length == "monthly"}
                                        Monthly
                                    {:else if term_length == "quarterly"}
                                        Quarterly
                                    {:else if term_length == "biannually"}
                                        Biannual
                                    {:else if term_length == "annually"}
                                        Annual
                                    {/if}
                                    Accra Pass</h5>
                                    <p class="desc">Enjoy complete access to Mango dicounts and offers for   
                                        {#if term_length == "monthly"}
                                            one month.
                                        {:else if term_length == "quarterly"}
                                            three months.
                                        {:else if term_length == "biannually"}
                                            six months.
                                        {:else if term_length == "annually"}
                                            a whole year.
                                        {/if}</p>
                                </div>
                                <div class="term_length_selector">
                                    <div class="term_length_item">
                                        <input id="monthly" type="radio" name="term_length" class="term_length_item_input" value="monthly" bind:group={term_length} />
                                        <div class="item_bg top"></div>
                                        <label for="monthly" class="term_length_item_label">
                                            <div class="item_label_inner">
                                                <div class="checkbox">
                                                    {#if term_length == "monthly"}
                                                        <img src="/images/check_blue.png" alt="monthly" />
                                                    {:else}
                                                        <img src="/images/circle_blue.png" alt="monthly" />
                                                    {/if}
                                                </div>
                                                <span class={`item_title ${term_length == "monthly" ? "text-main_bg" : "text-accent_bg"}`}>1 Month</span>
                                                <div class="savings">
                                                    <span></span>
                                                </div>
                                            </div>
                                        </label> 
                                    </div>
                                    <div class="term_length_item">
                                        <input id="quarterly" type="radio" name="term_length" class="term_length_item_input" value="quarterly" bind:group={term_length} />
                                        <div class="item_bg"></div>
                                        <label for="quarterly" class="term_length_item_label">
                                            <div class="item_label_inner">
                                                <div class="checkbox">
                                                    {#if term_length == "quarterly"}
                                                        <img src="/images/check_blue.png" alt="quarterly" />
                                                    {:else}
                                                        <img src="/images/circle_blue.png" alt="quarterly" />
                                                    {/if}
                                                </div>
                                                <span class={`item_title ${term_length == "quarterly" ? "text-main_bg" : "text-accent_bg"}`}>3 Months</span>
                                                <div class={`savings ${term_length == "quarterly" ? "bg-main_bg" : ""}`}>
                                                    <span>Save GH&#8373; 240*</span>
                                                </div>
                                            </div>
                                        </label> 
                                    </div>
                                    <div class="term_length_item">
                                        <input id="biannually" type="radio" name="term_length" class="term_length_item_input" value="biannually" bind:group={term_length} />
                                        <div class="item_bg"></div>
                                        <label for="biannually" class="term_length_item_label">
                                            <div class="item_label_inner">
                                                <div class="checkbox">
                                                    {#if term_length == "biannually"}
                                                        <img src="/images/check_blue.png" alt="biannually" />
                                                    {:else}
                                                        <img src="/images/circle_blue.png" alt="biannually" />
                                                    {/if}
                                                </div>
                                                <span class={`item_title ${term_length == "biannually" ? "text-main_bg" : "text-accent_bg"}`}>6 Months</span>
                                                <div class={`savings ${term_length == "biannually" ? "bg-main_bg" : ""}`}>
                                                    <span>Save GH&#8373; 360*</span>
                                                </div>
                                            </div>
                                        </label> 
                                    </div>
                                    <div class="term_length_item">
                                        <input id="annually" type="radio" name="term_length" class="term_length_item_input" value="annually" bind:group={term_length} />
                                        <div class="item_bg bottom"></div>
                                        <label for="annually" class="term_length_item_label">
                                            <div class="item_label_inner">
                                                <div class="checkbox">
                                                    {#if term_length == "annually"}
                                                        <img src="/images/check_blue.png" alt="annually" />
                                                    {:else}
                                                        <img src="/images/circle_blue.png" alt="annually" />
                                                    {/if}
                                                </div>
                                                <span class={`item_title ${term_length == "annually" ? "text-main_bg" : "text-accent_bg"}`}>12 Months</span>
                                                <div class={`savings ${term_length == "annually" ? "bg-main_bg" : ""}`}>
                                                    <span>Save GH&#8373; 600</span>
                                                </div>
                                            </div>
                                        </label> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="registration_header">
                            <h3>Choose your payment method</h3>
                        </div>
                        <div class="method_selector">
                            <div class="method_selector_item">
                                <input value="momo" id="momo" class="method_selector_item_input" type="radio" name="payment_method" bind:group={payment_method}/>
                                <div class="cell_bg"></div>
                                <label for="momo" class="method_selector_item_label">
                                    <div class="item_label_inner">
                                        <div class="item_label_inner_main_col">
                                            <div class="method_logos">
                                                <div class="method_logo_wrapper">
                                                    <img src="/images/momo.png" alt="momo" />
                                                </div>
                                            </div>
                                            <!-- <h4>Mobile Money</h4> -->
                                        </div>
                                        <div class="checked_icon">
                                            {#if payment_method == "momo"}
                                                <img src="/images/checked.png" alt="" />
                                            {/if}
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div class="method_selector_item">
                                <input value="card" id="card" class="method_selector_item_input" type="radio" name="payment_method" bind:group={payment_method}/>
                                <div class="cell_bg"></div>
                                <label for="card" class="method_selector_item_label">
                                    <div class="item_label_inner">
                                        <div class="item_label_inner_main_col">
                                            <div class="method_logos">
                                                <div class="method_logo_wrapper">
                                                    <img src="/images/card.png" alt="card" />
                                                </div>
                                            </div>
                                            <!-- <h4>Credit/Debit Card</h4> -->
                                        </div>
                                        <div class="checked_icon">
                                            {#if payment_method == "card"}
                                                <img src="/images/checked.png" alt="" />
                                            {/if}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="disclaimer">
                            <div class="badge">
                                <img src="/images/shield.png" alt="shield" />
                            </div>
                            <div class="text">
                                <p>We adhere entirely to the data security standards of the payment industry.</p>
                            </div>
                        </div>
                    </div>

                    <div class="nav_wrapper">
                        <div class="back_btn" on:click={go_to_page_one}>
                            <img src="/images/back_chevron.png" alt="back" />
                        </div>
                        <div class={`sign_up_btn pointer-events-auto cursor-pointer opacity-100`} on:click={go_to_page_three}>
                            <span>Next</span>
                        </div>
                    </div>
                {/if}
                {#if $show_registration_page_three}
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