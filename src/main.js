/* Copyright 2025 James Finnie-Ansley
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @ts-self-types="./main.d.ts" */


export class PriorityQueue {
    #arr;
    #compare;

    constructor(compare = (a, b) => a > b) {
        this.#arr = [];
        this.#compare = compare;
        Object.defineProperty(this, "length", {get: () => this.#arr.length});
    }

    static from(collection, compare = (a, b) => a > b) {
        const pq = new PriorityQueue(compare);
        pq.#arr = [...collection];
        pq.#heapify();
        return pq;
    }

    push(item) {
        this.#arr.push(item);
        this.#percolateUp(this.#arr.length - 1);
    }

    pushAll(items) {
        for (const item of items) {
            this.push(item);
        }
    }

    pop() {
        if (this.length === 0) {
            throw Error("Called `pop` on an empty priority queue");
        } else if (this.length === 1) {
            const result = this.#arr[0];
            this.#arr = [];
            return result;
        }else {
            const result = this.#arr[0];
            this.#arr[0] = this.#arr.pop();
            this.#percolateDown(0);
            return result;
        }
    }

    popK(k) {
        if (this.length < k) {
            throw Error(
                "Called `popK` on a priority queue with fewer than k items",
            );
        } else {
            const result = [];
            for (let i = 0; i < k; i++) {
                result.push(this.pop());
            }
            return result;
        }
    }

    peek() {
        if (this.length === 0) {
            throw Error(
                "Called `peek` on an empty priority queue",
            );
        } else {
            return this.#arr[0];
        }
    }

    peekK(k) {
        if (this.length === 0) {
            throw Error(
                "Called `peekK` on a priority queue with fewer than k items",
            );
        } else {
            // Do NOT call `.peekK` on this
            const q = new PriorityQueue((a, b) => this.#compareIndex(a, b));
            const result = [];
            q.push(0);
            while (result.length < k) {
                const i = q.pop();
                result.push(i);
                q.push(i * 2 + 1);
                q.push(i * 2 + 2);
            }
            return result.map((i) => this.#arr[i]);
        }
    }

    * [Symbol.iterator]() {
        yield* this.#arr.toSorted((a, b) => this.#compare(a, b) ? -1 : 1);
    }

    #swap(i, j) {
        [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
    }

    #compareIndex(i, j) {
        return this.#compare(this.#arr[i], this.#arr[j]);
    }

    #priorityChild(i) {
        const left = i * 2 + 1;
        const right = i * 2 + 2;
        if (right >= this.length || this.#compareIndex(left, right)) {
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
        while (
            i < Math.floor(this.length / 2)
            && this.#compareIndex(child, i)
            ) {
            this.#swap(child, i);
            i = child;
            child = this.#priorityChild(i);
        }
    }

    #percolateUp(i) {
        let parent = Math.floor((i - 1) / 2);
        while (i > 0 && this.#compareIndex(i, parent)) {
            this.#swap(i, parent);
            i = parent;
            parent = Math.floor((i - 1) / 2);
        }
    }
}
