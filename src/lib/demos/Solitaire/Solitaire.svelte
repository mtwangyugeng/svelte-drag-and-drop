<script context="module">
    const SYMBOLS = ['square', 'flower', 'heart', 'spade'];
    const DECK = []
    for (let s of SYMBOLS) {
        for (let i = 0; i < 13; i++) {
            DECK.push([s, i])
        }
    }

    function shuffleDeck (array) {
        const res = [...array]
        for (let i = res.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [res[i], res[j]] = [res[j], res[i]];
        }
        return res
    }
</script>

<script>
import Container, { dragging } from "./Container.svelte";
import Deck from "./Deck.svelte";

let deck = [...DECK]

deck = shuffleDeck(deck)

let board = Array(7).fill(null).map(v=>[]);
async function distributeBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j=0; j < i + 1; j++) {
            const temp = deck.pop()
            deck = [...deck]
            // play the animation
            await new Promise(resolve => setTimeout(resolve, 50));
            board[i]=[...board[i], temp]
            

            
        }
    }
}
distributeBoard();


function handleRecieve(stackI) {
    return () =>{
        const neo = [...board]
        const dc = neo[$dragging.stackI].splice($dragging.index)
        console.log(dc)
        neo[stackI] = neo[stackI].concat(dc)
        console.log(stackI)
        board = neo

        dragging.set(null)
    }
}

</script>

<Deck deck={deck}/>
<section>
    <div class=Board>
    {#each board as stack,i (i)}
        <div>
            <Container stack={stack} index={0} stackI={i} handleRecieve={handleRecieve} />
        </div>
    {/each}
    </div>
</section>

<style>
    section {
        background-color: darkgreen;
        display: flex;
        justify-content: center;
        height: 100%;
        /* transform: rotate(-90deg); */
    }
    div {
        width: 200px
    }
    .Board {
        background-color: green;
        width: 90%;
        display: flex;
        justify-content: space-around;
    }
</style>