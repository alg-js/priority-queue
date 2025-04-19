import {assertEquals, assertThrows} from "@std/assert";
import {priorityQueue} from "@alg/priority-queue";


function popAll(q) {
    const result = [];
    const size = q.size();
    for (let i = 0; i < size; i++) {
        result.push(q.pop());
    }
    return result;
}

function pushAll(q, items) {
    for (const item of items) {
        q.push(item);
    }
}

const lt = ((a, b) => a < b);

Deno.test({
    name: "priority queues can be heapified",
    fn: () => {
        const q = priorityQueue(lt, [5, 4, 3, 2, 1]);
        assertEquals(q.peek(), 1);
        assertEquals(popAll(q), [1, 2, 3, 4, 5]);

        const q1 = priorityQueue(lt, [5, 4, 3, 7, 6, 2, 1, 8]);
        assertEquals(q1.peek(), 1);
        assertEquals(popAll(q1), [1, 2, 3, 4, 5, 6, 7, 8]);
    },
});


Deno.test({
    name: "items can be pushed to priority queues",
    fn: () => {
        const q = priorityQueue(lt);
        pushAll(q, [5, 2, 4, 1, 3]);
        assertEquals(q.peek(), 1);
        assertEquals(popAll(q), [1, 2, 3, 4, 5]);
        const q1 = priorityQueue(lt);
        pushAll(q1, [5, 4, 3, 7, 6, 2, 1, 8]);
        assertEquals(q1.peek(), 1);
        assertEquals(popAll(q1), [1, 2, 3, 4, 5, 6, 7, 8]);
    },
});


Deno.test({
    name: "multiple items can be pushed to priority queues",
    fn: () => {
        const q = priorityQueue(lt);
        q.pushAll([5, 2, 4, 1, 3]);
        assertEquals(q.peek(), 1);
        assertEquals(popAll(q), [1, 2, 3, 4, 5]);
        const q1 = priorityQueue(lt);
        q1.pushAll([5, 4, 3, 7, 6, 2, 1, 8]);
        assertEquals(q1.peek(), 1);
        assertEquals(popAll(q1), [1, 2, 3, 4, 5, 6, 7, 8]);
    },
});


Deno.test({
    name: "Empty priority queues cannot be popped or peeked",
    fn: () => {
        const q = priorityQueue(lt);
        assertThrows(() => q.peek());
        assertThrows(() => q.pop());
    },
});


Deno.test({
    name: "priority queues can be iterated",
    fn: () => {
        const q = priorityQueue(lt, [5, 4, 3, 7, 6, 2, 1, 8]);
        assertEquals([...q], [1, 2, 3, 4, 5, 6, 7, 8]);
        assertEquals(popAll(q), [1, 2, 3, 4, 5, 6, 7, 8]);

        assertEquals([...priorityQueue(lt)], []);
    },
});