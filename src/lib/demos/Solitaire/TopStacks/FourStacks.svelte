<script>
import Stack from "./Stack.svelte";


    export let stacks = {
        spade: [],
        heart: [],
        clover: [],
        diamond: []
    }
</script>

<section>
    {#each Object.keys(stacks) as symbol (symbol)}
        <Stack symbol={symbol} stack={stacks[symbol]}/>
    {/each}
    

</section>


<style>
    section {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>