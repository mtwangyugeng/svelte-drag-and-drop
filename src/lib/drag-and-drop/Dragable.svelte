<script>
import { runCheckCollision, dragging, isColliding } from "./store";

export let originX = 200;
export let originY = 200;

let pX = originX;
let pY = originY;

let span;
let spanWidth;
let spanHeight;

// Change for the position of the cursor on the object.
$: if(span) {
    spanWidth = span.offsetWidth / 2
    spanHeight = span.offsetHeight / 2
}



let isMoving = false;

const initiateMove = () => {
    isMoving = true;
}

const moveAround = (e) => {
    if (isMoving){
        pX = e.clientX - spanWidth;
        pY = e.clientY - spanHeight;
        collisionCheck()
    }
}

const endMove = () => {
    handleDrop();
    if (isMoving && !$isColliding) {
        pX = originX;
        pY = originY;
    }
    isMoving = false;
    
}

// drag-drop
const collisionCheck = () => {
    dragging.set({
        x: pX,
        y: pY,
        width: span.offsetWidth,
        height: span.offsetHeight,
    })
    runCheckCollision()
}

const setDragging = () => {
    
}

export const handleDrag = () => {
    
}
export const handleDrop = () => {
}
</script>

<svelte:window on:mousemove={moveAround} on:mouseup={endMove}/>

<span on:mousedown={initiateMove}
    bind:this={span}
    class:GoBack={!isMoving}
    style="top: {pY}px; left: {pX}px">
    <slot />
</span>

<style>
    span {
        position: absolute;
        
    }

    .GoBack {
        transition: all 0.2s ease;
        transition-property: top, left;
    }
</style>