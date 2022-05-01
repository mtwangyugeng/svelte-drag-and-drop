<script>
import { dropFields } from "./store";

    export let id;

    let span;
    let info;

     let pX;
     let pY;

    import { onMount } from 'svelte';

    onMount(async () => {
        const bodyRect = span.getBoundingClientRect();
        pX = bodyRect.left;
        pY = bodyRect.top;
		info = {
            id:id,
            x:pX,
            y:pY,
            width: span.offsetWidth,
            height: span.offsetHeight,
        }
        dropFields.update(v=>{
            v.push(info);
            return v;
        })
	});

</script>


<section 
    bind:this={span} 
    style="top: {pY}px; left: {pX}px">

    <div class="Placeholder">
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
        margin: 100px;
        border: 1px solid black;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>