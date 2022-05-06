<script>
import DropField from "$src/lib/drag-and-drop/DropField.svelte";

    export let changeGrid;

    let isCovered = false
    // The grid need to know what dropped in fully.
    const handleRecieve = (e) => {
        const receivedElement = e.detail.element
        changeGrid(receivedElement.attributes.loadValue)
        // isCovered = true;
    }
</script>

<div class = Grid>
{#if isCovered}
    <div class = Cover />
{/if}
<DropField on:receive = {handleRecieve} enabled={!isCovered}>

</DropField>
</div>

<style>
    .Grid {
        position: relative;
    }
    .Cover {
        z-index: 9999;
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: rgba(255, 192, 203, 0.575);
    }
</style>