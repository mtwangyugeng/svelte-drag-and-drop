<script>
    import Dragable from "../../drag-and-drop/Dragable.svelte";
    import DropField from "../../drag-and-drop/DropField.svelte";
    import Grid from "./Grid.svelte";
import SmallScreen from "./SmallScreen.svelte";

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
    <SmallScreen board = {board} />
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
                <Grid changeGrid={changeGrid(i, j)}/>
            {/each}
        </div>
    {/each}
    </div>
</section>

<style>
    section {
        margin: 200px;
        background-color: blue;
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