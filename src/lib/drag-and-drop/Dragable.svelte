<script context="module">
import { writable } from "svelte/store";
import { BACK_AMINATION_SPEED } from "./const";

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
    // spanWidth = span.offsetWidth / 2
    // spanHeight = span.offsetHeight / 2
    span.attributes.loadValue = loadValue
    // console.log(span.attributes.loadValue)
}

const setMousePos = (bodyRect, clientX, clientY) => {
    spanWidth = clientX - bodyRect.left;
    spanHeight = clientY - bodyRect.top;
}

let isMoving = false;

const initiateMove = (e) => {
    const bodyRect = span.getBoundingClientRect();
    if (e.type === "mousedown"){
        setMousePos(bodyRect, e.clientX, e.clientY)
        // pX = e.clientX - spanWidth;
        // pY = e.clientY - spanHeight;
    } else {
        setMousePos(bodyRect, e.touches[0].clientX, e.touches[0].clientY)
        // pX = e.touches[0].clientX - spanWidth;
        // pY = e.touches[0].clientY - spanHeight;
    }

    
    originX = bodyRect.left;
    originY = bodyRect.top;
    pX = originX;
    pY = originY;

    isMoving = true;
    setDragging()
}
let goingBack = false;
const moveAround = (e) => {
    if (isMoving && !goingBack){
        if (e.type === "mousemove"){
            pX = e.clientX - spanWidth;
            pY = e.clientY - spanHeight;
        } else {
            pX = e.touches[0].clientX - spanWidth;
            pY = e.touches[0].clientY - spanHeight;
        }
        
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
        dragging.set(null);
        goingBack = true;
        setTimeout(()=>{
            goingBack = false;
            isMoving = false;
        }, BACK_AMINATION_SPEED)
    }
    
}

// drag-drop
const setDragging = () => {
    dragging.set({
        x: pX,
        y: pY,
        width: span.offsetWidth,
        height: span.offsetHeight,
    })
    draggingElement.set(span)
    // runCheckCollision()
}

</script>


<svelte:window on:mousemove={moveAround} on:touchmove={moveAround} on:mouseup={endMove} on:touchend={endMove}/>

<span on:mousedown|stopPropagation={initiateMove}
    on:touchstart|stopPropagation={initiateMove}
    bind:this={span}
    class:Rigid = {!isMoving}
    class:Dragging = {isMoving}
    class:GoBack={goingBack}
    style="top: {pY}px; left: {pX}px"
>
    <slot />
</span>

<style>
    .Rigid {
        position: static;
    }
    span{
        user-select: none;
        position: static;
    }

    .Dragging {
        position: fixed;
        z-index: 99;
    }

    .GoBack {
        /* position: relative; */
        position: fixed;
        transition: all 0.2s ease;
        transition-property: top, left;
    }
</style>