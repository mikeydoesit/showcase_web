<script>
    export let hide_element
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_category_filter_list, show_filter_card } from '$lib/store.js'
    import Categories from '$lib/data/Categories.js'

    let category_filter

    const toggle_category_filter = () => {
        show_category_filter_list.set(!$show_category_filter_list)
    }
</script>

<style lang="postcss">
    .filter_card {
        @apply h-screen bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0;
    }
    .filter_card_inner_wrapper {
        @apply h-full w-full relative bg-transparent;
    }
    .filter_card_inner {
        @apply bg-main_bg absolute bottom-0 h-4/5 w-full rounded-t-3xl px-6 pt-10;
    }
    .filter_card_heading {
        @apply flex flex-col border-b border-border_grey_five mx-2 justify-center items-center pb-6;
    }
    .filter_card_heading_title_wrapper {
        @apply flex flex-row items-center mb-2;
    }
    .filter_icon_wrapper {
        @apply h-auto w-auto mr-3;
    }
    .filter_icon_wrapper img {
        @apply h-5;
    }
    .filter_card_heading_title_wrapper .title {
        @apply text-3xl font-bold text-black;
    }
    .results_length {
        @apply font-semibold text-border_grey_four;
    }
    .filter_card_main {
        @apply mt-8;
    }
    .filter_card_main_item {
        @apply rounded-xl px-4 py-6;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }
    .item_header {
        @apply flex flex-row justify-between items-center cursor-pointer;
    }
    .item_header_title {
        @apply text-xl font-semibold;
    }
    .chevron_icon_wrapper {
        @apply h-auto w-auto;
    }
    .chevron_icon_wrapper img {
        @apply h-6;
    }
    .category_list_item {
        @apply mb-1.5;
    }
    /* From Uiverse.io by DaniloMGutavo */ 
    .checkbox-container {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
    }

    .custom-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    }

    .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 4px;
    transition: background-color 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    }

    .custom-checkbox:checked ~ .checkmark {
    background-color: #2196F3;
    box-shadow: 0 3px 7px rgba(33, 150, 243, 0.3);
    }

    .custom-checkbox:checked ~ .checkmark:after {
    display: block;
    }

    @keyframes checkAnim {
    0% {
        height: 0;
    }

    100% {
        height: 10px;
    }
    }

    .custom-checkbox:checked ~ .checkmark:after {
    animation: checkAnim 0.2s forwards;
    }

</style>

<section class="filter_card">
    <div class="filter_card_inner_wrapper" on:click|self={hide_element}>
        <div class={`filter_card_inner ${$show_filter_card ? "overflow-y-scroll" : ""}`} transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            <div class="filter_card_heading">
                <div class="filter_card_heading_title_wrapper">
                    <div class="filter_icon_wrapper">
                        <img src="/images/filter.png" alt="filter" />
                    </div>
                    <h2 class="title">Filter</h2>
                </div>
                <div class="results_length">
                    <span>2324 items</span>
                </div>
            </div>
            <div class="filter_card_main">
                <div class="filter_card_main_item">
                    <div class={`item_header ${$show_category_filter_list ? "mb-5" : ""}`} on:click={toggle_category_filter}>
                        <h4 class="item_header_title">Category</h4>
                        <div class="chevron_icon_wrapper">
                            <img class={`${$show_category_filter_list ? "rotate-180" : ""}`} src="/images/chevron_down.png" alt="toggle" />
                        </div>
                    </div>
                    {#if $show_category_filter_list}
                        <ul class="category_list" transition:slide={{ delay: 50, duration: 100, easing: quintOut, axis: 'y' }}>
                            {#each Categories as category, index}
                                <li class="category_list_item">
                                    <label class="checkbox-container" for={category.tag}>
                                        <input 
                                            id={category.tag}
                                            class="custom-checkbox"
                                            type="checkbox"
                                            name="category_filter"
                                            bind:group={category_filter} 
                                            value={category.tag}
                                        />
                                        <span class="checkmark"></span>
                                        <p>{category.name}</p>
                                    </label>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>