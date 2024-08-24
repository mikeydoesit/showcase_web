import { writable } from 'svelte/store'

export const show_registration = writable(false)
export const show_login = writable(false)

export const registration_email = writable('')
export const registration_name = writable('')
export const registration_password = writable('')

export const show_avatar_uploader_form = writable(false)
export const show_eula = writable(false)
export const show_tos = writable(false)
export const avatar_uploader_input = writable([])