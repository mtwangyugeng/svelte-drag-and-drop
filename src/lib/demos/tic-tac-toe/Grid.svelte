<script>
import DropField from "$src/lib/drag-and-drop/DropField.svelte";

    export let grid;

    export let changeGrid;

    // The grid need to know what dropped in fully.
    const handleRecieve = (e) => {
        const receivedElement = e.detail.element
        changeGrid(receivedElement.attributes.loadValue)
    }
</script>

<div>
{grid}
<DropField on:receive = {handleRecieve}>

</DropField>
</div>