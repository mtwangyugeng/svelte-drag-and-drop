<script context="module">
    import {writable} from 'svelte/store'

    import {dragging} from './Dragable.svelte'
    


    export const nextId = writable(0);

    // last entered element
    export const focusedField = writable(null);
    export const lastFocusedField = writable(null);

    export const startFocusedField = writable(null)
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
    import {draggingElement} from "./Dragable.svelte";
    import {createEventDispatcher, onDestroy, onMount} from 'svelte';
import { BACK_AMINATION_SPEED } from './const';
   
    export let enabled = true;

    export let getFocus = (focus) => {}
    const dispatch = createEventDispatcher();
    $: focused = (id === $focusedField?.id) && enabled;
    $: getFocus(focused)

    let info;

    const handleClick = () => {
        if(!$startFocusedField) {
            startFocusedField.set(info);
        }
    }
    /**
        The stars are amoung the heavens, 
        you picked one to chase.
        Stepping on the tree trunks, 
        stubborn as the earth.
        Peeking underneath the humanity,
        there lie roots to the abyss.
        Drills deep in the darkness,
        all to fortify the base.
    */
    dragging.subscribe((v)=>{
        if(!enabled)
            return

        if(v) {
            iniInfo();
            if(isCollide(v, info)) { 
                // console.log($focusedField?.id, $lastFocusedField?.id, info.id)
                if ($focusedField?.id !== info.id && $lastFocusedField?.id !== info.id){
                    // console.log("changed")
                    lastFocusedField.set($focusedField)
                    focusedField.set(info)

                    dispatch('enter', {
                        element: $draggingElement
                    });
                } 
            } else {
                if($lastFocusedField?.id === info.id || !$focusedField ) {
                    lastFocusedField.set(null)
                }

                if($focusedField?.id === info.id ) {
                    console.log($focusedField?.id, info.id)
                    focusedField.set(null)
                }
            }
            return;
        }

        // dragging is released
        if (focused) {
            setTimeout(()=>{
                focusedField.set(null);
                lastFocusedField.set(null);
                dispatch('receive', {
                    element: $draggingElement
                });
                // placeholder.appendChild($draggingElement)
            }, BACK_AMINATION_SPEED)

        } 

        if($startFocusedField?.id === info?.id) {
            startFocusedField.set(null);
            if (focused) {
                
            }else {
                if ($focusedField){
                    console.log("lose", info?.id)
                    dispatch('lose', {
                        element: $draggingElement
                    });
                }
            }
        }

    })
     
    // When dragging element entered the field
   
    let span;

    let placeholder;

    

     let pX;
     let pY;

     let phX;
     let phY;

    let id = $nextId;
    nextId.update( v => v + 1 )
    
    let refWrapper={}
    onMount (()=>{
       
        span = refWrapper.span;
        placeholder = refWrapper.placeholder
        iniInfo()
    })
    onDestroy(()=>{
        delete refWrapper.span
        delete refWrapper.placeholder
    })

    const iniInfo = () => {
        

        const bodyRect = span.getBoundingClientRect();
        pX = bodyRect.left;
        pY = bodyRect.top;

        const phRect = placeholder.getBoundingClientRect();
        phX = phRect.left;
        phY = phRect.top;

        

		info = {
            id: id,
            x: pX,
            y: pY,
            width: span.offsetWidth,
            height: span.offsetHeight,

            phX: phX,
            phY: phY

        }
    }
    
    
</script>

<!-- class:Focused = {focused && $dragging} -->
<section 
    bind:this={refWrapper.span} 
    
    >
    <span class="Placeholder"
        bind:this={refWrapper.placeholder}
        on:mousedown={handleClick}
    >
    
        <slot />
</span>
    {#if !enabled}
        <div class=Cover></div>
    {/if}
</section>


<style>
    /* .Focused {
        background-color: green;
    } */

    section {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .Placeholder {
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        background-color: red;
        position: absolute;
    }
    .Cover {
        z-index: 9999;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        /* background-color: rgba(255, 192, 203, 0.575); */
    }
</style>