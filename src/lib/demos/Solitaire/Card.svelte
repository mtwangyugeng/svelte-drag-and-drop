<script>
    export let card = "";
</script>

<section>
    {card}
    <slot/>
</section>


<style>
    section {
        width: 100px;
        height: 160px;
        border-radius: 5px;

        background-color: #fff;
        -webkit-box-shadow: 1px 0px 34px -4px rgba(0,0,0,0.44); 
box-shadow: 1px 0px 34px -4px rgba(0,0,0,0.44);
    }
</style>