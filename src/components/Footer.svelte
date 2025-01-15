<script>
    const time = new Date();
    const current_year = time.getFullYear();
</script>

<style lang="postcss">
    footer {
        @apply bg-gradient-to-tl from-splash_bg to-highlight_bg to-95% px-4 text-white;
    }
    .socials {
        @apply flex flex-row;
    }
</style>

<footer>
    <div class="footer_menu">

    </div>
    <div class="socials_wrapper">
        <h4>Follow us on</h4>
        <div class="socials">
            <a href="#">
                <img src="#" alt="tesomame on tiktok" />
            </a>
            <a href="#">
                <img src="#" alt="tesomame on instagram" />
            </a>
            <a href="#">
                <img src="#" alt="tesomame on youtube" />
            </a>
        </div>
    </div>
    <div class="copyright_wrapper">
        <span>&copy; {current_year} Tesomame Ltd</span>
    </div>
</footer>