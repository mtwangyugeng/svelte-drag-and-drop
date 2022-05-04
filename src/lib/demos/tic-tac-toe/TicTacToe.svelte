<script>
    import Dragable from "../../drag-and-drop/Dragable.svelte";
    import DropField from "../../drag-and-drop/DropField.svelte";
    import Grid from "./Grid.svelte";

    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

const changeGrid = (i, j) => {
    return (newValue)=>{
        board[i][j] = newValue;        
    }
}

</script>

<section>
<DropField>
    <Dragable loadValue="O">
        <button>
            O
        </button>
    </Dragable>
</DropField>

<DropField>
    <Dragable loadValue="X">
        <button>
            X
        </button>
    </Dragable>
</DropField>


    <div class="Board">
    {#each board as row,i (i)}
        <div class="Row">
            {#each row as grid,j (j)}
                <Grid grid={grid} changeGrid={changeGrid(i, j)}/>
            {/each}
        </div>
    {/each}
    </div>
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

    .Row {
        display: flex
    }
</style>