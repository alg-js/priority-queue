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

import {assertEquals, assertThrows} from "jsr:@std/assert@1";
import fc from "npm:fast-check";
import {PriorityQueue} from "../src/main.js";

const lt = ((a, b) => a < b);

Deno.test({
    name: "priority queues can be heapified",
    fn: () => {
        const q = PriorityQueue.from([5, 4, 3, 2, 1], lt);
        assertEquals(q.peek(), 1);
        assertEquals([...q], [1, 2, 3, 4, 5]);

        const q1 = PriorityQueue.from([5, 4, 3, 7, 6, 2, 1, 8], lt);
        assertEquals(q1.peek(), 1);
        assertEquals([...q1], [1, 2, 3, 4, 5, 6, 7, 8]);

        const q3 = PriorityQueue.from([5, 4, 3, 2, 1]);
        assertEquals(q3.peek(), 5);
        assertEquals([...q3], [5, 4, 3, 2, 1]);
    },
});


Deno.test({
    name: "items can be pushed to priority queues",
    fn: () => {
        const q = new PriorityQueue(lt);
        [5, 2, 4, 1, 3].forEach((e) => q.push(e));
        assertEquals([...q], [1, 2, 3, 4, 5]);

        const q1 = new PriorityQueue(lt);
        [5, 4, 3, 7, 6, 2, 1, 8].forEach((e) => q1.push(e));
        assertEquals([...q1], [1, 2, 3, 4, 5, 6, 7, 8]);

        const q2 = new PriorityQueue();
        [5, 2, 4, 1, 3].forEach((e) => q2.push(e));
        assertEquals([...q2], [5, 4, 3, 2, 1]);
    },
});


Deno.test({
    name: "multiple items can be pushed to priority queues",
    fn: () => {
        const q = new PriorityQueue(lt);
        q.pushAll([5, 2, 4, 1, 3]);
        assertEquals([...q], [1, 2, 3, 4, 5]);

        const q1 = new PriorityQueue(lt);
        q1.pushAll([5, 4, 3, 7, 6, 2, 1, 8]);
        assertEquals([...q1], [1, 2, 3, 4, 5, 6, 7, 8]);
    },
});

Deno.test({
    name: "Items added to queue",
    fn: () => {
        fc.assert(fc.property(
            fc.array(fc.nat()),
            (data) => {
                const q = new PriorityQueue();
                data.forEach((e) => q.push(e));
                assertEquals([...q], data.toSorted((a, b) => a > b ? -1 : 1));
                data.forEach(() => q.pop());
                assertEquals([...q], []);
            },
        ));
    },
});


Deno.test({
    name: "items can be peeked from priority queues",
    fn: () => {
        const q = new PriorityQueue(lt);
        [5, 2, 4, 1, 3].forEach((e) => q.push(e));
        assertEquals(q.peek(), 1);
        assertEquals(q.peekK(1), [1]);
        assertEquals(q.peekK(3), [1, 2, 3]);

        const q1 = new PriorityQueue(lt);
        [5, 4, 3, 7, 6, 2, 1, 8].forEach((e) => q1.push(e));
        assertEquals(q1.peek(), 1);
        assertEquals(q1.peekK(1), [1]);
        assertEquals(q1.peekK(3), [1, 2, 3]);
    },
});


Deno.test({
    name: "items can be popped from priority queues",
    fn: () => {
        const q = new PriorityQueue(lt);
        [5, 2, 4, 1, 3].forEach((e) => q.push(e));
        assertEquals(q.pop(), 1);
        assertEquals([...q], [2, 3, 4, 5]);
        assertEquals(q.popK(3), [2, 3, 4]);
        assertEquals([...q], [5]);

        const q1 = new PriorityQueue(lt);
        q1.push(1)
        assertEquals(q1.pop(), 1);
        assertEquals([...q1], []);
    },
});


Deno.test({
    name: "Empty priority queues cannot be popped or peeked",
    fn: () => {
        const q = new PriorityQueue();
        assertThrows(() => q.peek());
        assertThrows(() => q.peekK(1));
        assertThrows(() => q.pop());
        assertThrows(() => q.popK(1));
    },
});


Deno.test({
    name: "priority queues can be iterated",
    fn: () => {
        const q = PriorityQueue.from([5, 4, 3, 7, 6, 2, 1, 8], lt);
        assertEquals([...q], [1, 2, 3, 4, 5, 6, 7, 8]);
        assertEquals([...q], [1, 2, 3, 4, 5, 6, 7, 8]);

        assertEquals([...new PriorityQueue()], []);
    },
});
