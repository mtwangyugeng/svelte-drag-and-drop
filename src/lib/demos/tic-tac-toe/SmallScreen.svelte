<script>
    export let board;
    export let winner;
    export let turn;
    
    $: message = winner? "The winner is " + winner + " !" : 
                        "It is " + turn + "'s turn."
</script>


<section>
    <div class="Board">
    {#each board as row,i (i)}
        <div class="Row">
            {#each row as grid,j (j)}
                <div class="Grid"> {grid ? grid : " "} </div>
            {/each}
        </div>
    {/each}
    </div>
    <div class="Message">{message}</div>
</section>


<style>
    section {
        padding: 10px;
        background-color: rgb(46, 122, 80);
        font-family: "Lucida Console", "Courier New", monospace;
        display: flex;
        justify-content: center;
        align-items: center;


        border-radius: 8px;
        width: 280px;
        height: 100px;
    }

    .Message {
        background-color: rgb(62, 133, 94);
        width: 150px;
        height: 45px;
        padding: 5px;
        overflow: hidden;
        text-align: center;
    }

    .Board {
        margin-right: 10px
    }

    .Row {
        display: flex;
    }

    .Grid {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 20px;
        width: 20px;

        background-color: rgb(62, 133, 94);
        margin: 2px;
    }
</style>