/* @ts-self-types="./types.d.ts" */

/**
 * Creates a priority queue with the given comparator function and
 * initial values.
 *
 * @template T
 * @param {(a: T, b: T) => boolean} comparator comparison function
 * implementing the > relation: `a > b`
 * @param {Iterable<T> | null} initial
 * @returns {PriorityQueue<T>}
 */
export function priorityQueue(comparator, initial = null) {
    return new PriorityQueue(comparator, initial);
}


/**
 * @template T
 */
export class PriorityQueue {
    /** @type {T[]} */
    #arr;
    /** @type {(a: T, b: T) => boolean} */
    #comparator;

    /**
     * Creates a priority queue with the given comparator function and
     * initial values.
     *
     * @param {(a: T, b: T) => boolean} comparator comparison function
     * implementing the `>` priority relation: `a > b`
     * @param {Iterable<T> | null} initial
     */
    constructor(comparator, initial = null) {
        this.#arr = [];
        this.#comparator = comparator;
        if (initial !== null) {
            this.#arr = [...initial];
            this.#heapify();
        }
    }

    /**
     * Returns the size of the priority queue
     *
     * @returns {number}
     */
    size() {
        return this.#arr.length;
    }

    /**
     * Adds an item to the priority queue
     *
     * @param {T} item
     */
    push(item) {
        this.#arr.push(item);
        this.#percolateUp(this.#arr.length - 1);
    }

    /**
     * Adds all items to the priority queue
     *
     * @param {Iterable<T>} items
     */
    pushAll(items) {
        for (const item of items) {
            this.push(item);
        }
    }

    /**
     * Pops and returns a highest priority item from the priority queue
     *
     * @returns {T}
     */
    pop() {
        if (this.size() === 0) {
            throw new Error("Called `.pop` on empty priorityQueue");
        } else {
            const result = this.#arr[0];
            this.#arr[0] = this.#arr.pop();
            this.#percolateDown(0);
            return result;
        }
    }

    /**
     * Returns a highest priority item from the priority queue
     *
     * @returns {T}
     */
    peek() {
        if (this.size() === 0) {
            throw new Error("Called `.peek` on empty priorityQueue");
        } else {
            return this.#arr[0];
        }
    }

    /**
     * Iterates over items from the priority queue is descending priority order.
     * Behaviour is not defined if items are added, removed, or peeked during
     * iteration.
     *
     * @returns {Generator<T, void, void>}
     */
    * [Symbol.iterator]() {
        yield* this.#arr.toSorted((a, b) => this.#comparator(a, b) ? -1 : 1);
    }

    #swap(i, j) {
        [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
    }

    #compare(i, j) {
        return this.#comparator(this.#arr[i], this.#arr[j]);
    }

    #priorityChild(i) {
        const left = i * 2 + 1;
        const right = i * 2 + 2;
        if (right >= this.size() || this.#compare(left, right)) {
            return left;
        } else {
            return right;
        }
    }

    #heapify() {
        const len = Math.floor(this.#arr.length / 2) - 1;
        for (let i = len; i >= 0; i--) {
            this.#percolateDown(i);
        }
    }

    #percolateDown(i) {
        let child = this.#priorityChild(i);
        while (i < Math.floor(this.size() / 2) && this.#compare(child, i)) {
            this.#swap(child, i);
            i = child;
            child = this.#priorityChild(i);
        }
    }

    #percolateUp(i) {
        let parent = Math.floor((i - 1) / 2);
        while (i > 0 && this.#compare(i, parent)) {
            this.#swap(i, parent);
            i = parent;
            parent = Math.floor((i - 1) / 2);
        }
    }
}
