import {writable} from 'svelte/store'

export const dragging = writable({});

export function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

export const isColliding = writable(false);

// draggbles id: x, y, width, height, dropfieldId
// dropFields id: x, y, width, height, draggbleId