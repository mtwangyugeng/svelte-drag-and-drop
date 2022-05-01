<script>
import { dropFields } from "./store";



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
        dropFields.update(v=>{
            v.push(info);
            return v;
        })
    }

</script>


<div 
    bind:this={span} 
    style="top: {pY}px; left: {pX}px">
    <slot />
</div>


<style>
    div {
        background-color: yellow;
        height: 100px;
        width: 100px;
        margin: 100px;
        border: 1px solid black;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>