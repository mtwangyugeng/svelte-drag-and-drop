<script context="module">
    /**
     * isCollide:
     * https://codepen.io/mixal_bl4/pen/qZYWOm
     * by mixal_bl4
     * Thank you!
     */
    export function isCollide(a, b) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }
</script>

<script>
    /**
     * the Dropfield must know the exact element droped in
     */
    import {isColliding, collidingWith, dragging, draggingElement, dropFields } from "./store";
    import {createEventDispatcher} from 'svelte';
   
    export let id;

    const dispatch = createEventDispatcher();
    /**
     * Events to emit: 
     * 1. Enter the dropfield
     *      - should only emit once when then draggable first entered
     * 2. Leave the dropfield
     *      - must emit when the droppable enters another dropfield.
     *      - so save the last dropfield the draggable entered
     * 3. Drop into the dropfield
     * 
    */

    // 1. Enter the dropfield
    $: if($dragging){ 
        const tf = isCollide($dragging, info)
        if(tf) {
            // if the entered field is not occupied
            collidingWith.set(info)
            isColliding.set(true) // ?
            dispatch('enter', {
                element: $draggingElement
            })
        }
    }

    // Event: a draggable is droped into the dropfield  
    $: if ( $collidingWith && $collidingWith?.phX == phX && $collidingWith?.phY == phY) {
        console.log(id,"recievedElement")
        if (!$dragging){
            dispatch('receive', {
                element: $draggingElement
            });
        }
    }

    // When dragging element entered the field
   

    let span;
    let placeholder;

    let info;

     let pX;
     let pY;

     let phX;
     let phY;

    $: if(span){
        const bodyRect = span.getBoundingClientRect();
        pX = bodyRect.left;
        pY = bodyRect.top;

        const phRect = placeholder.getBoundingClientRect();
        phX = phRect.left;
        phY = phRect.top;
		info = {
            id:id,
            x:pX,
            y:pY,
            width: span.offsetWidth,
            height: span.offsetHeight,

            phX: phX,
            phY: phY

        }
        dropFields.update(v=>{
            v.push(info);
            return v;
        })
    }

</script>


<section 
    bind:this={span} 
    style="top: {pY}px; left: {pX}px"
    >
    <div class="Placeholder"
        bind:this={placeholder}
    >
        <slot />
    </div>
    
</section>


<style>
    .Placeholder {
        width: 50px;
        height: 50px;
        background: white;
    }

    section {
        background-color: yellow;
        height: 100px;
        width: 100px;
        /* margin: 100px; */
        border: 1px solid black;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>