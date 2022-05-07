<script>
import DropField from "$src/lib/drag-and-drop/DropField.svelte";

    export let changeGrid;

    let enabled = true;
    // The grid need to know what dropped in fully.
    const handleRecieve = (e) => {
        const receivedElement = e.detail.element
        changeGrid(receivedElement.attributes.loadValue)
        enabled = false;
    }
</script>

<div class = Grid>
<DropField on:receive = {handleRecieve} enabled={enabled}>

</DropField>
</div>

<style>
    .Grid {
        position: relative;
    }
    /* .Cover {
        z-index: 9999;
        height: 100%;
        width: 100%;
        position: absolute;
        background-color: rgba(255, 192, 203, 0.575);
    } */
</style>