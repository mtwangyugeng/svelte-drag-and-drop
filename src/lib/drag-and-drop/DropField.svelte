<script>
    /**
     * the Dropfield must know the exact element droped in
     */
import { collidingWith, dragging, draggingElement, dropFields } from "./store";
import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    export let id;

    $: if (!$dragging && $collidingWith && $collidingWith?.phX == phX && $collidingWith?.phY == phY) {
        console.log(id,"recievedElement")
        dispatch('receive', {
            element: $draggingElement
        });
        
    }
    // When draggable is recieved.

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
    style="top: {pY}px; left: {pX}px">

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