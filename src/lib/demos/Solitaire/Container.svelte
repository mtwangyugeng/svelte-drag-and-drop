<script context="module">
    import { writable } from "svelte/store";
    export const dragging = writable(null);

    
    function handleMouseDown(stackI, index) {
        return () => {
            dragging.set({
                from: "board",
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

<div class=Card>
<Dragable>
    <section on:mousedown={handleMouseDown(stackI, index)}>
        {#if stack[index]}
        <div class=Card>
            <Card card={stack[index] + " " + stackI}/>
        </div>
        {/if}

        
        {#if stack.length - 1 <= index}
            {#if !$dragging || $dragging.stackI !== stackI}
                <span class=DropField>
                    <Card>
                        <DropField on:receive={handleRecieve(stackI)}/>
                    </Card>
                </span>
            {/if}
        {:else}
        <div class=Child>
            <svelte:self stack={stack} index={(index + 1)} stackI={stackI} handleRecieve={handleRecieve}/>
        </div>
        {/if}
        
    </section>
</Dragable>
</div>

<style>

    .DropField {
        position: absolute;
        top:0;
        background-color: green;
        opacity: 0.5;
    }
    .DropField  :global(.Placeholder) {
        width: 100%;
        height: 100%;
        top:30px;
        left: 0;
        position: absolute;
        
    }
    section { 
        position: relative;
    }
    .Child {
        top: 30px;
        position: absolute;
    }
    .Card {
        background-color: red;
    }
</style>