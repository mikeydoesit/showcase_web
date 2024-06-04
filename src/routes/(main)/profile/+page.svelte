<script>
    import ProfileHeading from "../../../components/ProfileHeading.svelte";
    import ProfileMenu from "../../../components/ProfileMenu.svelte";
</script>

<style lang="posstcss">
    .profile_main {
        @apply bg-main_bg h-full w-full mb-16;
    }
</style>

<main class="profile_main">
    <ProfileHeading />
    <ProfileMenu />
</main>