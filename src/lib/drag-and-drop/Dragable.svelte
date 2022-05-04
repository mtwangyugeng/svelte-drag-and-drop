<script context="module">
import { writable } from "svelte/store";

export const dragging = writable(null);
export const draggingElement = writable(null);
</script>

<script>

import {focusedField} from "./DropField.svelte"

let originX;
let originY;

let pX;
let pY;

let span;
let spanWidth;
let spanHeight;

export let loadValue = "loadValue shouldn't be empty."

// Change for the position of the cursor on the object.
$: if(span) {
    spanWidth = span.offsetWidth / 2
    spanHeight = span.offsetHeight / 2
    span.attributes.loadValue = loadValue
    console.log(span.attributes.loadValue)
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
        draggingElement.set(span)
        setDragging()
    }
}

const endMove = () => {
    if(isMoving ){
        if (!$focusedField) {
            pX = originX;
            pY = originY;
        } else {
            pX = $focusedField.phX
            pY = $focusedField.phY
            
        }
    }
    dragging.set(null);
    goingBack = true;
    setTimeout(()=>{
        goingBack = false;
        isMoving = false;
    }, 200)
}

// drag-drop
const setDragging = () => {
    dragging.set({
        x: pX,
        y: pY,
        width: span.offsetWidth,
        height: span.offsetHeight,
    })
    // runCheckCollision()
}

</script>


<svelte:window on:mousemove={moveAround} on:mouseup={endMove}/>

<span on:mousedown={initiateMove}
    bind:this={span}
    class:Dragging = {isMoving}
    class:GoBack={goingBack}
    style="top: {pY}px; left: {pX}px"
>
    <slot />
</span>

<style>

    span{
        user-select: none;
        position: absolute;
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