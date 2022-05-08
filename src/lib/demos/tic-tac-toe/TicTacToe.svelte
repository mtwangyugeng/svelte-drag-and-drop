<script>
import Curtain from "./Curtain.svelte";
import Generator from "./Generator.svelte";
    import Grid from "./Grid.svelte";
import SmallScreen from "./SmallScreen.svelte";

    let turn = "O"
    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    let xScore = 0;
    let OScore = 0;
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

let ini = true;
const reset = () => {
    ini = !ini;
    turn = "O"
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

</script>

{#if winner}
<Curtain reset={reset} winner={winner}/>
{/if}

<section>
    <h1>Svelte-Drag-Drop Demo: Tic Tac Toe</h1>
    <SmallScreen board = {board} winner={winner} turn={turn}/>

    <div class=TicTacToe>
        <Generator symbol=O turn={turn} ini={ini}/>


        <div class="Board">
        {#each board as row,i (i)}
            <div class="Row">
                {#each row as grid,j (j)}
                    <Grid changeGrid={changeGrid(i, j)} grid={grid}/>
                {/each}
            </div>
        {/each}
        </div>

        <Generator symbol=X turn={turn} ini={ini}/>

    </div>

</section>

<style>
    h1 {
		text-align: center;
		padding: 20px;
		color: #fff;
	}
    section {
        background-color: rgb(240, 160, 56);
        height: 100vh;

        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .Board {
        margin: 10px;
    }
    .Row {
        display: flex
    }

    .TicTacToe {
        display: flex;
        align-items: center;
    }
</style>