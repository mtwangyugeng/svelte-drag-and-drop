<script>
import Dragable from "$src/lib/drag-and-drop/Dragable.svelte";

import Card from "./Card.svelte";


    export let deck = [];
</script>

<section>
{#each deck as [symbol, n], i (symbol + n)}
    <span style={`top: ${i}px; left: ${i}px`}>
        <Dragable>
        <Card card={symbol + n} />
        </Dragable>
    </span>
{/each}
</section>


<style>
    section {
        position: inline-block;
        height: 300px
    }

    span {
        position: absolute;
    }
</style>