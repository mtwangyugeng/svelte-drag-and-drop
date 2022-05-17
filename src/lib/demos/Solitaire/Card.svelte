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
        border: 2px solid #000;

        background-color: #fff;
    }
</style>