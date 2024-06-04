<script>
  import "../../styles/global.css";
  import Tapbar from "../../components/Tapbar.svelte";
</script>

<style lang="postcss">
  .tapbar_menu_layout {
    @apply h-full relative;
  }
</style>
  
<div class="tapbar_menu_layout">
  <slot />
  <Tapbar />
</div>