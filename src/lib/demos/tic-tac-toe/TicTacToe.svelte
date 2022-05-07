<script>
import Generator from "./Generator.svelte";
    import Grid from "./Grid.svelte";
import SmallScreen from "./SmallScreen.svelte";

    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    /**
     *  if a side is won, return the symbol of the side,
     *  o/w 
     */
    const checkWin = (board) => {
        // check rows & cols
        for (let i = 0; i < 3; i++){
            console.log(i)
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0]
            }
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i]
            }
        }
        
        // check cross
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] || 
            board[0][2] === board[1][1] && board[1][1] === board[2][0]
            ) {
                return board[1][1]
            }
        return null;
    }
    $: winner = checkWin(board);

    let turn = "O"

const changeGrid = (i, j) => {
    if(turn === "O") {
        turn = "X"
    } else {
        turn = "O"
    }
    return (newValue)=>{
        board[i][j] = newValue;        
    }
}

</script>

<section>
<SmallScreen board = {board} winner={winner}/>

<div class=TicTacToe>
    <Generator symbol=O turn={turn}/>
    <div class="Board">
    {#each board as row,i (i)}
        <div class="Row">
            {#each row as grid,j (j)}
                <Grid changeGrid={changeGrid(i, j)}/>
            {/each}
        </div>
    {/each}
    </div>

    <Generator symbol=X turn={turn}/>
</div>

</section>

<style>
    section {
        margin: 200px;
        background-color: blue;
    }

    .Row {
        display: flex
    }

    .TicTacToe {
        display: flex;
        align-items: center;
    }
</style>