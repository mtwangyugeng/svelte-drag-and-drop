<script>
import Card from "./Card.svelte";
import Container from "./Container.svelte";

let testArr = [0, 1, 2, 3, 4]

</script>

<section>
    <div>
        <Container stack={testArr} index={0}>
        </Container>
    </div>
</section>

<style>
    section {
        background-color: red;
        display: flex;
    }
    div {
        width: 200px
    }
</style>