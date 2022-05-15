<script>
import Dragable from "$src/lib/drag-and-drop/Dragable.svelte";
import Card from "./Card.svelte";

    export let card = null;
</script>

<Dragable >
<section>
    {#if card}
        <div class=Card>
            <Card card={card}/>
        </div>
    {/if}

    <div class=Child>
        <slot />
    </div>
</section>
</Dragable>

<style>
    section { 
        position: relative;
    }
    .Child {
        top: 30px;
        position: absolute;
    }
</style>