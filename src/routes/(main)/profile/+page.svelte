<script>
    import { PUBLIC_PAYSTACK_KEY, PUBLIC_PAYSTACK_PLAN, PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import ProfileHeading from "../../../components/ProfileHeading.svelte";
    import ProfileMenu from "../../../components/ProfileMenu.svelte";
    import Register from "../../../components/Register.svelte"
    import Login from "../../../components/Login.svelte"
    import AvatarUploader from '../../../components/AvatarUploader.svelte'
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import { show_registration, show_login, registration_email, registration_name, registration_password, show_avatar_uploader_form, avatar_uploader_input, mobile_money_network, mobile_money_number, term_length, payment_method } from '$lib/store'
    import { pocketbase, currentUser } from '$lib/pocketbase.js'

    let popup
    
    onMount(async () => {
        const module = await import('@paystack/inline-js');
        const Paystack = module.default;
        popup = new Paystack();
    })

    let authorised = false
    let unauthorised = true

    const userData = new FormData()

    const show_registration_form = () => {
        show_registration.set(true)
    }

    const show_login_form = () => {
        show_login.set(true)
    }

    const set_avatar = async () => {
        for (let file of $avatar_uploader_input) {
            userData.append('avatar', file);
        }

        try {
            const record = await pocketbase.collection('users').update($currentUser.id, userData);
        } catch (error) {
            console.log(error)
        } finally {
            show_avatar_uploader_form.set(false)
            goto('/profile')
        }
    }

    const login = async () => {
        try {
            const authData = await pocketbase.collection('users').authWithPassword(
                $registration_email,
                $registration_password,
            );
        } catch (error) {
            console.log(error)
        } finally {
            if($show_login) {
                show_login.set(false)
                goto('/profile')
            }
        }
        pocketbase.collection('users').unsubscribe('*');
    }
    const signup = async () => {

        submitting_new_user = true

        if($payment_method == 'momo') {
            const new_user = {
                name: $registration_name,
                email: $registration_email,
                auth: $registration_password,
                network: $mobile_money_network,
                momo_number: $mobile_money_number,
                term_length: $term_length,
                method: $payment_method
            }
            try {
                // Send user and payment details to the backend
                const response = await fetch(`${PUBLIC_POCKETBASE_URL}/api/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(new_user),
                });

                const data = await response.json();

                if(data.data.status == "success") {
                    try {
                        // Subscribe to changes in any users record
                        await pocketbase.collection('users').subscribe(`*`, function (e) {
                            if(e.record.email == $registration_email && e.record.is_subscriber) {
                                login()
                            }
                        });
                    } catch (error) {
                        console.error(error)
                    }
                }
                
            } catch (error) {
                console.error(error)
            }
        }

        if($payment_method == 'card') {
            const new_user = {
                name: $registration_name,
                email: $registration_email,
                auth: $registration_password,
                term_length: $term_length,
                method: $payment_method
            }

            try {
                // Send user and payment details to the backend
                const response = await fetch(`${PUBLIC_POCKETBASE_URL}/api/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(new_user),
                });

                const data = await response.json();

                if(data.status == true) {
                    popup.resumeTransaction(data.data.access_code)

                    try {
                        // Subscribe to changes in any users record
                        await pocketbase.collection('users').subscribe(`*`, function (e) {
                            if(e.record.email == $registration_email && e.record.is_subscriber) {
                                login()
                            }
                        });
                    } catch (error) {
                        console.error(error)
                    } 
                }
                
            } catch (error) {
                console.error(error)
            }
        }
    }
</script>

<style lang="postcss">
    .profile_main {
        @apply w-full h-screen;
    }
    .authorised {
        @apply bg-main_bg h-full w-full mb-16 relative;
    }
    .unauthorised {
        @apply h-screen w-full relative;
    }
    .auth_bg {
        @apply absolute object-center object-cover h-full w-full;
    }
    .overlay {
        @apply bg-main_bg/20 z-10 absolute top-0 bottom-0 left-0 right-0;
    }
    .unauthorised_landing {
        @apply z-20 absolute h-full w-full px-10 py-16 flex flex-col justify-between;
    }
    .title {
        @apply text-main_bg text-3xl font-semibold mt-8 drop-shadow-xl leading-10;
    }
    .btns_wrapper {
        @apply flex flex-col gap-4;
    }
    .btn {
        @apply w-full py-4 flex justify-center items-center rounded-lg cursor-pointer;
    }
    .btn:first-of-type {
        @apply bg-splash_bg text-main_bg text-lg font-bold;
    }
    .btn:last-of-type {
        @apply bg-main_bg text-splash_bg text-lg font-bold;
    }
</style>

<main class={`profile_main ${($show_avatar_uploader_form) ? 'overflow-y-hidden' : ''}`}>
    {#if $currentUser != null}
        {#if pocketbase?.authStore.isValid}
            <div class="authorised">
                <ProfileHeading />
                <ProfileMenu />
                {#if $show_avatar_uploader_form}
                    <AvatarUploader
                        submit_avatar={set_avatar}
                    />
                {/if}
            </div>
        {/if}
    {/if}
    {#if $currentUser == null}
        <div class="unauthorised">
            <img class="auth_bg" src={`/images/auth_bg_${(Math.ceil(Math.random() * 15))}.jpg`} alt="bg" />
            <div class="overlay"></div>
            <div class="unauthorised_landing">
                <div class="header">
                    <img src="/images/mango.png" alt="mango" />
                    <h2 class="title">Discover Accra's Hidden Gems</h2>
                </div>
                <div class="btns_wrapper">
                    <div class="btn" on:click={show_registration_form}>
                        <span>Sign up</span>
                    </div>
                    <div class="btn" on:click={show_login_form}>
                        <span>Sign in</span>
                    </div>
                </div>
            </div>
            {#if $show_registration}
                <Register 
                    submit_new_user={signup}
                />
            {/if}
            {#if $show_login}
                <Login 
                    signin={login}
                />
            {/if}
        </div>
    {/if}
</main>