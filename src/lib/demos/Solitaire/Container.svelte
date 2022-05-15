<script>
import Dragable from "$src/lib/drag-and-drop/Dragable.svelte";
import Card from "./Card.svelte";
    export let stack;
    export let index;
</script>


<Dragable >
    
<section>
   
        <div class=Card>
            <Card card={index}/>
        </div>

    <div class=Child>
        {#if stack.length - 1 < index}
            {stack.length} {index}
        {:else}
            <svelte:self stack={stack} index={(index + 1)} />
        {/if}
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