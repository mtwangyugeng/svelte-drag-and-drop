# Drag and Drop for svelte
Tic-Tac-Toe demo: [Try it!](https://mtwangyugeng.github.io/svelte-drag-and-drop/)
## Usage
Copy the [src/lib/drag-and-drop](https://github.com/mtwangyugeng/svelte-drag-and-drop/tree/master/src/lib/drag-and-drop) folder to you code base.

``` javascript
<div>
    <DropField enabled={true} on:lose={handleLose} on:receive={handleRecieve} on:enter={handleEnter}>
        <Dragable loadValue={anyObject}>
            <button>
                A dragable button.
            </button>
        </Dragable>
    </DropField>
</div>
```

