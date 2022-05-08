<script>
import TicTacToe from './lib/demos/tic-tac-toe/TicTacToe.svelte';
</script>

<main>
	<TicTacToe />
</main>

<style>

  main {
	  position: relative;
		height: 100vh;
    background-color: rgb(214, 139, 0);
		font-family: Arial, Helvetica, sans-serif;

		overflow: hidden;
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(ul), :global(ol) {
		list-style-type: none;
	}

	:root {
		scroll-behavior: smooth;
	}

	:global(button), :global(input[type="submit"]), :global(input[type="reset"]) {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}

	/* Scrollbars */
	/* Works on Firefox */
	:global(*) {
	scrollbar-width: thin;
	scrollbar-color: rgb(241, 82, 71) orange;
	}

	/* Works on Chrome, Edge, and Safari */
	:global(*)::-webkit-scrollbar {
	width: 5px;
	}

	:global(*)::-webkit-scrollbar-track {
	background: orange;
	}

	:global(*)::-webkit-scrollbar-thumb {
	background-color: rgb(241, 82, 71);
	border-radius: 20px;
	border: 3px solid orange;
	}
</style>
