<script>
import Dragable from "../../drag-and-drop/Dragable.svelte";
import DropField from "../../drag-and-drop/DropField.svelte";
import Peice from "../Peice.svelte";

export let turn;
export let symbol;


let ids = []

let isDroping = false
const generate = () => {
    isDroping = true;
    setTimeout(()=>{isDroping = false}, 200)
}
$: if(turn === symbol){
    generate()
}
</script>

<section class:Droping={isDroping}>
<DropField enabled={turn === symbol}>
    {#if turn === symbol}
    <Dragable loadValue={symbol}>
        <Peice grid={symbol} />
    </Dragable>
    {/if}
</DropField>
</section>


<style>
    @keyframes curtainUp {
        0% {top: -50%;}
        100% {top: 0%;}
    }

    section > :global(*) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .Droping :global(.Placeholder) {
        
        animation: curtainUp 0.2s;
        animation-timing-function: ease-in;
    }
    section :global(.Placeholder) {
        position: relative;
    }


    section {
        width: 50px;
        height:500px;
        /* background-color: pink; */
    }
    @media (max-width: 500px) {
        section {
            width: 90vw;
            height: 50px;
        }
        .Droping :global(.Placeholder) {
            animation: none;
        }
        section :global(.Placeholder) {
            position: relative;
            top: 0%;
        }
    }

</style>