<script>
import { dragging } from "./store";
/**
 * mousedown onto the element to register
 *  
*/
let span;
let spanWidth;
let spanHeight;

// Change for the position of the cursor on the object.
$: if(span) {
    spanWidth = span.offsetWidth / 2
    spanHeight = span.offsetHeight / 2
}

let pX = 200;
let pY = 200;

let isMoving = false;

const initiateMove = () => {
    isMoving = true;
}

const moveAround = (e) => {
    if (isMoving){
        pX = e.clientX - spanWidth;
        pY = e.clientY - spanHeight;
        setDragging()
    }
}

const endMove = () => {
    isMoving = false;
    handleDrop();
}

// drag-drop
const setDragging = () => {
    dragging.set({
        x: pX,
        y: pY,
        width: span.offsetWidth,
        height: span.offsetHeight,
    })
}

export const handleDrag = () => {
    
}
export const handleDrop = () => {
    
}
</script>

<svelte:window on:mousemove={moveAround} on:mouseup={endMove}/>

<span on:mousedown={initiateMove}
    bind:this={span}
    style="top: {pY}px; left: {pX}px">
    <slot />
</span>

<style>
    span {
        position: absolute;
    }
</style>