<script>
export let winner = "O"
export let reset;

let curtainUp;
const handleClick = () => {
    curtainUp = true;
    setTimeout(()=>{
        reset();
        curtainUp = false;
    }, 500)
}
</script>

<section class:CurtainUp={curtainUp}>
    <div class=Window>
        <div class=Message>{(winner === 'Draw')? winner: ('Player ' + winner + ' win!')}</div>
        <button class=Reset on:click={handleClick}>Play Again!</button>
    </div>
</section>


<style>
    .CurtainUp {
        animation: curtainUp 0.5s;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
    }
    @keyframes curtainUp {
        0% {top: 0%;}
        100% {top: -100%;}
    }

    .Reset {
        height: 50px;
        width: 150px;
        position: absolute;
        bottom: -25px;

        background-color: white;
        border-radius: 10PX;
        color: rgb(224, 52, 0);
    }
    .Reset:hover {
        background-color: rgb(224, 52, 0);
        color: white;
    }

    .Window {
        background-color: rgb(224, 120, 0);
        width: 500px;
        height: 200px;
        position: absolute;
        left: 50%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: translate(-50%,-50%);
        
        animation: downShake 0.5s;
        /* animation-timing-function: ease; */
        animation-fill-mode: forwards;
        border-radius: 10px;
    }

    .Message {
        color: white;
        font-size: 20px;
        font-weight: bold;
        user-select: none;
        /* margin-bottom: 10px; */
    }

    @media (max-width: 500px) {
        .Window {
            height: 100%;
            width: 100%;
        }
        .Reset {
            position: static;
        }
        .Message {
            margin-bottom: 10px;
        }
    }
    @keyframes downShake {
        0% {top: -100%;}
        50% {top: 50%;}
        60% {top: 51%;}
        70% {top: 49%;}
        80% {top: 50.5%;}
        90% {top: 49.5%;}
        100% {top: 50%;}
    }

    section {
        background-color: rgba(255, 0, 0, 0.281)(70, 70, 70);
        height: 100%;
        width: 100%;
        z-index: 999999;
        position: fixed;
        top: 0;
        left: 0;
    }
</style>