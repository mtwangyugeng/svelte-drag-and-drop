<script>
import { dragging, isCollide } from "./store";


    let span;
    let info;

    let pX = 0;
    let pY = 0;

    let isColliding = false;
    $: if (span) {
        info = {
            x:pX,
            y:pY,
            width: span.offsetWidth,
            height: span.offsetHeight,
        }
        isColliding = isCollide($dragging, info)
    }
    $: console.log(isColliding)
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
        top: 0;
    }
</style>