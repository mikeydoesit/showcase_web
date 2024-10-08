<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_login, registration_email, registration_password, logging_in } from '$lib/store.js';

    export let signin;

    let valid_email = false
    let valid_pwd = false
    let show_email_error = false
    let show_pwd_error = false

    const hide_element = () => {
        show_login.set(false)
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
.login {
    @apply h-screen bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0 z-30;
}
.login_inner_wrapper {
    @apply h-full w-full relative bg-transparent flex flex-col justify-end;
}
.login_inner {
    @apply bg-main_bg h-auto max-h-[80vh] w-full rounded-t-2xl z-20 px-8 py-8 overflow-y-scroll;
}
.login_header {
    @apply flex flex-row justify-between items-center;
}
.login_header h3 {
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
.login_form_main {
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

/* LOADER STYLES */

.loader_wrapper {
        @apply h-fit w-full flex justify-center items-center;
    }
    .spinner {
        --size: 7.5px;
        --first-block-clr: #990033;
        --second-block-clr: #FFFFFF;
        --clr: #111;
        width: 25px;
        height: 25px;
        position: relative;
    }

    .spinner::after,.spinner::before {
        box-sizing: border-box;
        position: absolute;
        content: "";
        width: var(--size);
        height: var(--size);
        top: 50%;
        animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
        left: 50%;
        background: var(--first-block-clr);
    }

    .spinner::after {
        background: var(--second-block-clr);
        top: calc(50% - var(--size));
        left: calc(50% - var(--size));
        animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
    }

    @keyframes down {
        0%, 100% {
            transform: none;
        }

        25% {
            transform: translateX(100%);
        }

        50% {
            transform: translateX(100%) translateY(100%);
        }

        75% {
            transform: translateY(100%);
        }
    }

    @keyframes up {
        0%, 100% {
            transform: none;
        }

        25% {
            transform: translateX(-100%);
        }

        50% {
            transform: translateX(-100%) translateY(-100%);
        }

        75% {
            transform: translateY(-100%);
        }
    }
</style>

<div class="login">
    <div class="login_inner_wrapper" on:click|self={hide_element}>
        <div class="login_inner" transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            <div class="login_header">
                <h3>Welcome back &#128075;</h3>
            </div>
            <form class="login_form_main">
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
                {#if $logging_in}
                    <div class="sign_up_btn pointer-events-auto cursor-not-allowed opacity-100">
                        <div class="loader_wrapper">
                            <div class="spinner"></div>
                        </div>
                    </div>
                {:else}
                    <div class={`sign_up_btn ${(valid_email && valid_pwd) ? 'pointer-events-auto cursor-pointer opacity-100' : 'pointer-events-none cursor-not-allowed opacity-60'}`} on:click={signin}>
                        <span>Sign in</span>
                    </div>
                {/if}
            </form>
        </div>
    </div>
</div>