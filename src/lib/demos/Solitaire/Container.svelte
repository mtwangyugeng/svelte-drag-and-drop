<script context="module">
    import { writable } from "svelte/store";
    export const dragging = writable(null);

    
    function handleMouseDown(stackI, index) {
        return () => {
            dragging.set({
                stackI,
                index
            })
        }
    }
</script>

<script>
import Dragable from "$src/lib/drag-and-drop/Dragable.svelte";
import DropField from "$src/lib/drag-and-drop/DropField.svelte";
import Card from "./Card.svelte";

    export let stack;

    export let index;

    export let stackI;
    
    export let handleRecieve;

</script>


<Dragable >
    <section on:mousedown={handleMouseDown(stackI, index)}>
    
        <div class=Card>
            <Card card={stack[index] + " " + stackI}/>
        </div>

        <div class=Child>
        {#if stack.length - 1 <= index}
            {#if $dragging && $dragging.stackI !== stackI}
                <span class=DropField>
                    <Card>
                        <DropField on:receive={handleRecieve(stackI)}/>
                    </Card>
                </span>
            {/if}
        {:else}
        
            <svelte:self stack={stack} index={(index + 1)} stackI={stackI} handleRecieve={handleRecieve}/>
        
        {/if}
        </div>
    </section>
</Dragable>

<style>
    .DropField {
        position: absolute;
        top:0;
        background-color: green;
        opacity: 0;
    }
    section { 
        position: relative;
    }
    .Child {
        top: 30px;
        position: absolute;
    }
</style>