<script>
    import Dragable from "./Dragable.svelte";
    import DropField from "./DropField.svelte";



</script>

<section>
<Dragable>
    <button>
    </button>
</Dragable>

<DropField id=1>
    <Dragable>
        <button>
        </button>
    </Dragable>
</DropField>

<DropField id=2>
</DropField>

<DropField id=3>
</DropField>
</section>

<style>
    section {
        margin: 100px;
    }
    button {
        background-color: red;
        width: 50px;
        height: 50px;
    }
</style>