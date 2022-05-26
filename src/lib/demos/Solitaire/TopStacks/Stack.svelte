<script>
import Dragable from "$src/lib/drag-and-drop/Dragable.svelte";
import Card from "../Card.svelte";

    export let symbol = "";
    export let stack = [];
    $: topOfStack = stack.length < 1 ? null : stack[stack.length - 1]
    $: secondOfStack = stack.length <= 1 ? null : stack[stack.length - 2]

    function onPop() {
        stack.pop();
        stack = stack;
    }
</script>

<section class=Card>
    {#if topOfStack}
        <span>
            <Dragable>
                <Card card={topOfStack}/>
            </Dragable>
        </span>
    {/if}

{#if secondOfStack}
    <Card card={secondOfStack}/>
{/if}

</section>


<style>
    span {
        position: absolute;
        z-index: 1;
    }
    section {
        margin: 10px;
    }
</style>