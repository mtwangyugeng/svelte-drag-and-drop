<script>
import { dragging, isCollide, isColliding } from "./store";


    let span;
    let info;

    export let pX = 0;
    export let pY = 0;

    // let isColliding = false;
    $: if (span) {
        info = {
            x:pX,
            y:pY,
            width: span.offsetWidth,
            height: span.offsetHeight,
        }
        const tf = isCollide($dragging, info);
        isColliding.update(v=>v||tf)
    }
    $: console.log($isColliding)
</script>


<span 
    bind:this={span} 
    style="top: {pY}px; left: {pX}px">
    <div/>
</span>


<style>
    div {
        background-color: yellow;
        height: 100px;
        width: 100px;
        
    }

    span {
        position: absolute;
    }
</style>