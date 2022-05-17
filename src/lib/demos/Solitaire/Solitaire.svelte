<script>
import Card from "./Card.svelte";
import Container, { dragging } from "./Container.svelte";

let testArr = 
[
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
]

function handleRecieve(stackI) {
    return () =>{
        const neo = [...testArr]
        const dc = neo[$dragging.stackI].splice($dragging.index)
        console.log(dc)
        neo[stackI] = neo[stackI].concat(dc)
        console.log(stackI)
        testArr = neo

        dragging.set(null)
    }
}

</script>

<section>
    {#each testArr as stack,i (i)}
        <div>
            <Container stack={stack} index={0} stackI={i} handleRecieve={handleRecieve} />
        </div>
    {/each}
</section>

<style>
    section {
        background-color: darkgreen;
        display: flex;
        height: 100%;
        /* transform: rotate(-90deg); */
    }
    div {
        width: 200px
    }
</style>