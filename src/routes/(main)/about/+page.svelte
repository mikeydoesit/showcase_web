<script>
    import PageTitle from "../../../components/PageTitle.svelte";
    import SectionTitle from "../../../components/SectionTitle.svelte"

    import { show_eula, show_tos } from '$lib/store.js'
	import Eula from "../../../components/EULA.svelte";
	import Tos from "../../../components/TOS.svelte";

    const toggle_tos = () => {
        show_eula.set(false)
        show_tos.set(true)
    }
    const toggle_eula = () => {
        show_tos.set(false)
        show_eula.set(true)
    }
</script>

<style lang="postcss">
    .about {
        @apply relative h-screen;
    }
    .about_list {
        @apply px-8 pt-4;
    }
    .about_list_item {
        @apply flex flex-row justify-between items-center pr-3 border-b-2 py-3.5 border-border_grey_three cursor-pointer;
    }
    .about_list_item span {
        @apply text-lg font-semibold text-black;
    }
    .icon_wrapper {
        @apply flex flex-row items-center justify-center;
    }
    .icon_wrapper img {
        @apply w-5 h-5;
    }
</style>

<section class="about">
    <PageTitle
        back_btn
        page_title={'About'}
    />
    <ul class="about_list">
        <li class="about_list_item" on:click={toggle_tos}>
            <span>Terms of use</span>
        </li>
        <li class="about_list_item" on:click={toggle_eula}>
            <span>EULA</span>
        </li>
    </ul>
    {#if $show_eula}
        <Eula />
    {/if}
    {#if $show_tos}
        <Tos />
    {/if}
</section>