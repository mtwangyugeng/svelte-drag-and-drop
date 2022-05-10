<script>
import Dragable from "../../drag-and-drop/Dragable.svelte";
import DropField from "../../drag-and-drop/DropField.svelte";
import Peice from "./Peice.svelte";

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
<!-- <DropField enabled={turn === symbol}> -->
    {#if turn === symbol}
    <span class=Dropping>
    <Dragable loadValue={symbol}>
        <Peice grid={symbol} />
    </Dragable>
    </span>
    {/if}
<!-- </DropField> -->
</section>


<style>
    @keyframes curtainUp {
        0% {transform: translateY(-300px);}
        100% {transform: translateY(0px);}
    }


    .Dropping {
        position: relative;
        animation: curtainUp 0.2s;
        animation-timing-function: ease-in;
    }

    section {
        width: 50px;
        height:500px;
        display:flex;
        align-items: center;
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