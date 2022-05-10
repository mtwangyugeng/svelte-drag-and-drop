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
    /**
     *  if a side is won, return the symbol of the side,
     *  o/w 
     */
    const checkWin = (board) => {
        // check rows & cols
        let draw = true;
        for (let i = 0; i < 3; i++){
            draw =  draw && board[0][i] && board[1][i] && board[2][i];
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
        
            console.log("hi " + draw)
        if (draw) {
            return "Draw"
        }
        
        return null;
    }
    $: winner = checkWin(board);



const changeGrid = (i, j) => {
    
    return (newValue)=>{
        if(turn === "O") {
            turn = "X"
        } else {
            turn = "O"
        }
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
        <Generator symbol=O turn={turn} />


        <div class="Board">
        {#each board as row,i (i)}
            <div class="Row">
                {#each row as grid,j (j)}
                    <Grid changeGrid={changeGrid(i, j)} grid={grid}/>
                {/each}
            </div>
        {/each}
        </div>

        <Generator symbol=X turn={turn} />

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
    @media (max-width: 500px) {
        .TicTacToe {
            flex-direction: column;
            margin-top: 10px;
        }
        h1 {
            display: none;
        }
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