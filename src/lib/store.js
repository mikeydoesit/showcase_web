import { writable } from 'svelte/store'

export const show_registration = writable(false)
export const show_registration_page_one = writable(true)
export const show_registration_page_two = writable(false)
export const show_registration_page_three = writable(false)

export const show_login = writable(false)

export const registration_email = writable('')
export const registration_name = writable('')
export const registration_password = writable('')
export const registration_number = writable('')

export const mobile_money_network = writable('mtn')
export const mobile_money_number = writable('')

export const show_avatar_uploader_form = writable(false)
export const show_eula = writable(false)
export const show_tos = writable(false)
export const avatar_uploader_input = writable([])

export const show_all_offers = writable(true)
export const show_existing_offers = writable(false)
export const show_redeemed_offers = writable(false)

export const otp_code = writable('')

export const term_length = writable('monthly')
export const payment_method = writable('momo')
export const gateway_provider = writable('visa')
export const cc_number = writable('')
export const cc_number_to_display = writable([])
export const secure_code = writable('')
export const expiry_date = writable('')