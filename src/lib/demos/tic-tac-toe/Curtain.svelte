<script>
export let winner = "O"
export let reset;
</script>

<section>
    <div class=Window>
        Player {winner} win!
        <button class=Reset on:click={reset}>reset</button>
    </div>
</section>


<style>
    
    .Window {
        background-color: pink;
        width: 500px;
        height: 200px;
        position: absolute;
        left: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        
        animation: shake 0.5s;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
    }

    @media (max-width: 500px) {
        .Window {
            height: 100%;
            width: 100%;
        }
    }
    @keyframes shake {
        from {
            top: -100%;
            transform: translate(-50%,-50%);
        }
        to {
            top: 50%;
            transform: translate(-50%,-50%);
        }
    }

    section {
        background-color: rgba(255, 0, 0, 0.281)(70, 70, 70);
        height: 100%;
        width: 100%;
        z-index: 999999;
        position: fixed;

    }
</style>