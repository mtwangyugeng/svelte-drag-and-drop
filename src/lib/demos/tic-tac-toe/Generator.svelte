<script>
    import Dragable from "../../drag-and-drop/Dragable.svelte";
    import DropField from "../../drag-and-drop/DropField.svelte";

let ids = [0]

const generate = () => {
    // const neo = {...toGenerate}
    // container.appendChild(neo)
    // console.log(toGenerate)
    // const neo = toGenerate.cloneNode(true);
    // container.appendChild(neo);
    ids = [...ids, ids[ids.length - 1] + 1]
}




</script>

<DropField on:lose={generate}>
    {#each ids as id (id)}
        <Dragable loadValue="O">
            <button>
                O
            </button>
        </Dragable>
    {/each}
</DropField>


<style>
    button {
        background-color: red;
        width: 50px;
        height: 50px;
    }
</style>