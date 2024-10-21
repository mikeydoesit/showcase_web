<script>
    export let hide_element
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { show_category_filter_list, show_filter_card, show_price_filter_list, category_filter, bracket_filter } from '$lib/store.js'
    import Categories from '$lib/data/Categories.js'
    import Price_bracket from '$lib/data/Price_bracket.js'
    import { goto } from '$app/navigation';


    const toggle_category_filter = () => {
        show_category_filter_list.set(!$show_category_filter_list)
    }
    const toggle_price_filter = () => {
        show_price_filter_list.set(!$show_price_filter_list)
    }
    const apply_filters = () => {
        let price_thresholds = '';
        if($bracket_filter != '') {
          price_thresholds = `?price_threshold=${$bracket_filter}`;
        }
        window.location.assign(`/category/${$category_filter}${($bracket_filter != '') ? price_thresholds : ""}`)
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
        @apply bg-main_bg absolute bottom-0 h-fit w-full rounded-t-3xl px-6 pt-10 max-h-[80vh];
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
        @apply h-4;
    }
    .filter_card_heading_title_wrapper .title {
        @apply text-2xl font-bold text-black;
    }
    .results_length {
        @apply font-semibold text-border_grey_four;
    }
    .filter_card_main {
        @apply my-8 flex flex-col gap-4;
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
    .category_list_item, .price_list_item {
        @apply mb-4;
    }

    /* Price input styling */
/* 
    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
      .price_list_item_inner input[type=checkbox] {
        --active: #275EFE;
        --active-inner: #fff;
        --focus: 2px rgba(39, 94, 254, .3);
        --border: #BBC1E1;
        --border-hover: #275EFE;
        --background: #fff;
        --disabled: #F6F8FF;
        --disabled-inner: #E1E6F9;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 21px;
        outline: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0;
        cursor: pointer;
        border: 1px solid var(--bc, var(--border));
        background: var(--b, var(--background));
        transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      }
      .price_list_item_inner input[type=checkbox]:after {
        content: "";
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
      }
      .price_list_item_inner input[type=checkbox]:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: .3s;
        --d-t: .6s;
        --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
      }
      .price_list_item_inner input[type=checkbox]:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: 0.9;
      }
      .price_list_item_inner input[type=checkbox]:disabled:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      .price_list_item_inner input[type=checkbox]:disabled + label {
        cursor: not-allowed;
      }
      .price_list_item_inner input[type=checkbox]:hover:not(:checked):not(:disabled) {
        --bc: var(--border-hover);
      }
      .price_list_item_inner input[type=checkbox]:focus {
        box-shadow: 0 0 0 var(--focus);
      }
      .price_list_item_inner input[type=checkbox]:not(.switch) {
        width: 21px;
      }
      .price_list_item_inner input[type=checkbox]:not(.switch):after {
        opacity: var(--o, 0);
      }
      .price_list_item_inner input[type=checkbox]:not(.switch):checked {
        --o: 1;
      }
      .price_list_item_inner input[type=checkbox] + label {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        margin-left: 4px;
      }
  
      .price_list_item_inner input[type=checkbox]:not(.switch) {
        border-radius: 7px;
      }
      .price_list_item_inner input[type=checkbox]:not(.switch):after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 7px;
        top: 4px;
        transform: rotate(var(--r, 20deg));
      }
      .price_list_item_inner input[type=checkbox]:not(.switch):checked {
        --r: 43deg;
      }
    }
  
    .price_list_item_inner * {
      box-sizing: inherit;
    }
    .price_list_item_inner *:before,
    .price_list_item_inner *:after {
      box-sizing: inherit;
    }
 */

/* Category input styling */

    label.category_list_item_inner, label.price_list_item_inner {
      display: block;
      cursor: pointer;
    }
    label.category_list_item_inner input, label.price_list_item_inner input {
      display: none;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
    }
    label.category_list_item_inner input + span, label.price_list_item_inner input + span {
      line-height: 22px;
      height: 22px;
      padding-left: 22px;
      display: block;
      position: relative;
    }
    label.category_list_item_inner input + span:not(:empty), label.price_list_item_inner input + span:not(:empty) {
      padding-left: 30px;
    }
    label.category_list_item_inner input + span:before, label.category_list_item_inner input + span:after , label.price_list_item_inner input + span:before, label.price_list_item_inner input + span:after{
      content: "";
      width: 22px;
      height: 22px;
      display: block;
      border-radius: 50%;
      left: 0;
      top: 0;
      position: absolute;
    }
    label.category_list_item_inner input + span:before, label.price_list_item_inner input + span:before {
      background: #D1D7E3;
      transition: background 0.2s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2);
    }
    label.category_list_item_inner input + span:after, label.price_list_item_inner input + span:after {
      background: #fff;
      transform: scale(0.78);
      transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.4);
    }
    label.category_list_item_inner input:checked + span:before, label.price_list_item_inner input:checked + span:before {
      transform: scale(1.04);
      background: #5D9BFB;
    }
    label.category_list_item_inner input:checked + span:after, label.price_list_item_inner input:checked + span:after {
      transform: scale(0.4);
      transition: transform 0.3s ease;
    }
    label.category_list_item_inner:hover input + span:before, label.price_list_item_inner:hover input + span:before {
      transform: scale(0.92);
    }
    label.category_list_item_inner:hover input + span:after, label.price_list_item_inner:hover input + span:after {
      transform: scale(0.74);
    }
    label.category_list_item_inner:hover input:checked + span:after, label.price_list_item_inner:hover input:checked + span:after {
      transform: scale(0.4);
    }
    .apply_filter_btn {
        @apply bg-splash_bg text-main_bg text-lg font-bold w-full py-4 flex justify-center items-center rounded-lg mx-auto mt-2;
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
                                    <div class="category_list_item_inner">
                                        <label class="category_list_item_inner" for={category.tag}>
                                            <input 
                                                id={category.tag}
                                                type="radio" 
                                                name="category_filter"
                                                bind:group={$category_filter} 
                                                value={category.tag}
                                            />
                                            <span>{category.name}</span>
                                        </label>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
                <div class="filter_card_main_item">
                    <div class={`item_header ${$show_price_filter_list ? "mb-5" : ""}`} on:click={toggle_price_filter}>
                        <h4 class="item_header_title">Price</h4>
                        <div class="chevron_icon_wrapper">
                            <img class={`${$show_price_filter_list ? "rotate-180" : ""}`} src="/images/chevron_down.png" alt="toggle" />
                        </div>
                    </div>
                    {#if $show_price_filter_list}
                        <ul class="price_list" transition:slide={{ delay: 50, duration: 100, easing: quintOut, axis: 'y' }}>
                            {#each Price_bracket as bracket, index}
                                <li class="price_list_item">
                                    <div class="price_list_item_inner">
                                      <label class="price_list_item_inner" for={bracket.tag}>
                                          <input 
                                              id={bracket.tag}
                                              type="radio" 
                                              name="bracket_filter"
                                              bind:group={$bracket_filter} 
                                              value={bracket.tag}
                                          />
                                          <span>{@html bracket.name}</span>
                                      </label>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </div>
            <div class={`apply_filter_btn ${($category_filter != '' || $bracket_filter.length > 0) ? 'pointer-events-auto cursor-pointer opacity-100' : 'pointer-events-none cursor-not-allowed opacity-60'}`} on:click={apply_filters}>
                <span>Apply</span>
            </div>
        </div>
    </div>
</section>
  