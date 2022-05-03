import {writable, get} from 'svelte/store'

export const dragging = writable(null);
export const draggingElement = writable(null);

export const dropFields = writable([]);


export const isColliding = writable(false);

export const collidingWith = writable(null);

function checkCollision (draggable, dropFields) {
    for (let dropField of dropFields) {
        if (isCollide(dropField, draggable)){
            console.log('colliding with' + dropField.id)
            collidingWith.set(dropField)
            return true;
        }
    }
    return false
}

// export function runCheckCollision () {
//     isColliding.set(checkCollision(get(dragging), get(dropFields)))
// }


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
