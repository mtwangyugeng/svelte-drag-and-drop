<script>
import Dragable from "./Dragable.svelte";
import DropField from "./DropField.svelte";

</script>

<DropField >
    <Dragable>
        <button>
        </button>
    </Dragable>
</DropField>

<style>
    button {
        background-color: red;
        width: 50px;
        height: 50px;
    }
</style>