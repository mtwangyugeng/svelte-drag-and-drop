<script>
import Dragable from "../../drag-and-drop/Dragable.svelte";
import DropField from "../../drag-and-drop/DropField.svelte";

export let turn;
export let symbol;
let ids = [0]

let isDroping = false
const generate = () => {
    ids = [...ids, ids[ids.length - 1] + 1]
    isDroping = true;
    setTimeout(()=>{isDroping = false}, 200)
}

const reset = (ini) => {
    ids = [0]
}

export let ini;
$: reset(ini)
</script>

<section class:Droping={isDroping}>
<DropField on:lose={generate} enabled={turn === symbol}>
    {#each ids as id (id)}
            {#key ini}
            <Dragable loadValue={symbol}>
                <button>
                    {symbol}
                </button>
            </Dragable>
            {/key}
    {/each}
</DropField>
</section>


<style>
    @keyframes curtainUp {
        0% {top: 0%;}
        100% {top: 50%;}
    }

    section > :global(*) {
        display: flex;
        justify-content: center;
    }

    .Droping :global(.Placeholder) {
        
        animation: curtainUp 0.2s;
        animation-timing-function: ease-in;
    }
    section :global(.Placeholder) {
        position: relative;
        top: 50%;
    }


    section {
        width: 50px;
        height:500px;
        background-color: pink;
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

    button {
        background-color: red;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>