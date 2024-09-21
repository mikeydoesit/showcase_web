<script>
    import { PUBLIC_PAYSTACK_KEY, PUBLIC_PAYSTACK_PLAN, PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import SvelteOtp from "@k4ung/svelte-otp";
    import { otp_code } from '$lib/store.js'

    export let seller_obj

    if (seller_obj.business_name) {
        console.log(seller_obj)
    }

    const redeem = async () => {
        if($otp_code.length == 6) {
            const redemption_code = {
                merchant: seller_obj.id,
                otp: $otp_code
            }
            try {
                const response = await fetch(`${PUBLIC_POCKETBASE_URL}/api/redeem`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(redemption_code),
                });

                const data = response;

                if(data.data) {
                    console.log(data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
</script>

<style lang="postcss">
    .redemption {
        @apply mt-40 px-4;
    }
    .redemption h2 {
        @apply font-bold text-2xl text-black;
    }
    .redemption_code_wrapper {
        @apply grid grid-cols-otp_grid w-full gap-4 mt-6;
    }
    .redemption_code_wrapper input {
        @apply bg-otp_error_grey w-full rounded-lg border-2 border-otp_blue p-2 text-2xl text-center;
    }
    .redeem_btn {
        @apply flex items-center justify-center bg-splash_bg py-3.5 rounded-xl mt-6;
    }
    .redeem_btn span {
        @apply text-main_bg text-xl font-semibold;
    }
</style>

<section class="redemption">
    <h2>Redeem offer</h2>
    <p>Ask a representative of {#if seller_obj.business_name}{seller_obj.business_name}{/if} to enter their 6 digit code to redeem this offer.</p>
    <!-- <div class="redemption_code_wrapper">
        <input type="text" inputmode="numeric" minlength="1" maxlength="1" />
        <input type="text" inputmode="numeric" minlength="1" maxlength="1" />
        <input type="text" inputmode="numeric" minlength="1" maxlength="1" />
        <input type="text" inputmode="numeric" minlength="1" maxlength="1" />
        <input type="text" inputmode="numeric" minlength="1" maxlength="1" />
        <input type="text" inputmode="numeric" minlength="1" maxlength="1" />
    </div> -->
    <SvelteOtp
        bind:value={$otp_code}
        numOfInputs={6}
        numberOnly
	    inputClass="bg-otp_error_grey w-full rounded-lg border-2 border-otp_blue p-2 text-2xl text-center"
        wrapperClass="grid grid-cols-otp_grid w-full gap-4 mt-6"
        disableDefaultStyle
    />
    <div class="redeem_btn" on:click={redeem}>
        <span>Redeem</span>
    </div>
</section>