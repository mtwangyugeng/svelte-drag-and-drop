<script>
import { runCheckCollision, dragging, isColliding } from "./store";

let originX;
let originY;

let pX;
let pY;

let span;
let spanWidth;
let spanHeight;


// Change for the position of the cursor on the object.
$: if(span) {
    spanWidth = span.offsetWidth / 2
    spanHeight = span.offsetHeight / 2
}

let isMoving = false;

const initiateMove = (e) => {
    isMoving = true;
    pX = e.clientX - spanWidth;
    pY = e.clientY - spanHeight;

    const bodyRect = span.getBoundingClientRect();
    originX = bodyRect.left;
    originY = bodyRect.top;
}
let goingBack = false;
const moveAround = (e) => {
    if (isMoving && !goingBack){
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

    goingBack = true;
    setTimeout(()=>{
        goingBack = false;
        isMoving = false;
    }, 200)
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
    class:Dragging = {isMoving}
    class:GoBack={goingBack}
    style="top: {pY}px; left: {pX}px">
    <slot />
</span>

<style>

    span{
        user-select: none;
        position: fixed;
    }

    .Dragging {
       
        z-index: 99;
    }

    .GoBack {
        /* position: fixed; */
        transition: all 0.2s ease;
        transition-property: top, left;
    }
</style>