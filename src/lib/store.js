import { writable } from 'svelte/store'

export const show_registration = writable(false)
export const show_registration_page_one = writable(true)
export const show_registration_page_two = writable(false)
export const show_registration_page_three = writable(false)
export const show_registration_page_four = writable(false)
export const show_registration_page_five = writable(false)

export const show_login = writable(false)

export const registration_avatar_uploader_input = writable([])
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

export const submitting_new_user = writable(false)
export const logging_in = writable(false)


export const show_deal = writable(true)
export const show_business_review = writable(false)
export const show_business_info = writable(false)