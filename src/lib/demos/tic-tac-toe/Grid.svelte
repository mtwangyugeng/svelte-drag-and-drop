<script>
import { dragging } from "$src/lib/drag-and-drop/Dragable.svelte";

import DropField from "$src/lib/drag-and-drop/DropField.svelte";

    export let changeGrid;
    
    export let grid;
    let isFocusing = false;
    // The grid need to know what dropped in fully.
    const handleRecieve = (e) => {
        const receivedElement = e.detail.element
        changeGrid(receivedElement.attributes.loadValue)
    }
</script>

<div class = Grid class:Focusing={isFocusing}>
<DropField on:receive = {handleRecieve} enabled={!grid} getFocus={(focus)=> isFocusing = focus}>
    {#if !grid && $dragging}
    <div class=Placeholder></div>
    {/if}
</DropField>
</div>

<style>
    .Grid {
        position: relative;
        background-color: rgb(255, 145, 0);
        height: 100px;
        width: 100px;
        margin: 5px;
        border-radius: 5px;
    }
    .Focusing {
        background-color: green;
    }

    .Grid > :global(*) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .Placeholder {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: white;
    }

    /* .Cover {
        z-index: 9999;
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: rgba(255, 192, 203, 0.575);
    } */
</style>