<script>
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

let pX = 0;
let pY = 0;

let isMoving = false;

const initiateMove = () => {
    isMoving = true;
}

const moveAround = (e) => {
    if (isMoving){
        pX = e.clientX - spanWidth;
        pY = e.clientY - spanHeight;
    }
}

const endMove = () => {
    isMoving = false;
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