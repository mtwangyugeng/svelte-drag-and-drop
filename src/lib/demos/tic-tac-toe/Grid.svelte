<script>
import DropField from "$src/lib/drag-and-drop/DropField.svelte";

    export let changeGrid;

    export let grid;
    // The grid need to know what dropped in fully.
    const handleRecieve = (e) => {
        const receivedElement = e.detail.element
        changeGrid(receivedElement.attributes.loadValue)
    }
</script>

<div class = Grid>
<DropField on:receive = {handleRecieve} enabled={!grid}>
    {#if !grid}
    <div class=Placeholder></div>
    {/if}
</DropField>
</div>

<style>
    .Grid {
        position: relative;
        background-color: yellow;
        height: 100px;
        width: 100px;
        border: 1px solid black;
    }

    .Grid > :global(*) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .Placeholder {
        width: 50px;
        height: 50px;
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