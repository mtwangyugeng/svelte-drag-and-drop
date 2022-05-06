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
    import {createEventDispatcher} from 'svelte';
import { BACK_AMINATION_SPEED } from './const';
   
    export let enabled = true;

    const dispatch = createEventDispatcher();
    $: focused = (id === $focusedField?.id) && enabled;

    // 1. focus the dropfield
    dragging.subscribe((v)=>{
        
        if(v) {
            iniInfo();
            if(isCollide(v, info)){ 
                console.log($focusedField?.id, $lastFocusedField?.id, info.id)
                if ($focusedField?.id !== info.id && $lastFocusedField?.id !== info.id){
                    console.log("changed")
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

                // lastFocusedField.update(v=>{
                //     // console.log($focusedField?.id, info.id)
                //     if(v?.id === info.id || !$focusedField){
                //         return null;
                //     } else {
                //         return v;
                //     }
                // })

                if($focusedField?.id === info.id ) {
                    console.log($focusedField?.id, info.id)
                    focusedField.set(null)
                }
                // focusedField.update(v=>{
                //     // console.log($focusedField?.id, info.id)
                //     if(v?.id === info.id){
                //         return null;
                //     } else {
                //         return v;
                //     }
                // })
            }
        } else {
            if ( focused) {
                setTimeout(()=>{
                    focusedField.set(null);
                    lastFocusedField.set(null);
                    placeholder.appendChild($draggingElement)
                }, BACK_AMINATION_SPEED)
                dispatch('receive', {
                    element: $draggingElement
                });
            } 
            // how to tell if the field lost a element
            // if dragging element was the child of the field
            //   and element
        }
    })
     
    // When dragging element entered the field
   

    let span;
    let placeholder;

    let info;

     let pX;
     let pY;

     let phX;
     let phY;

    let id = $nextId;
    nextId.update( v => v + 1 )

    $: if(span){
        iniInfo()
    }

    const iniInfo = () => {
        // console.log("IniInfo")
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


<section 
    bind:this={span} 
    class:Focused = {focused && $dragging}
    >
    <div class="Placeholder"
        bind:this={placeholder}
    >
    
        <slot />
    </div>
    
</section>


<style>
    .Focused {
        background-color: green;
    }
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