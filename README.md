# @alg/priority-queue

[![JSR](https://jsr.io/badges/@alg/priority-queue)](https://jsr.io/@alg/priority-queue)
[![License](https://img.shields.io/badge/Apache--2.0-green?label=license)](https://github.com/alg-js/priority-queue/blob/main/LICENSE)

A priority queue implemented as a binary heap.

## Install

```
deno add jsr:@alg/priority-queue
```

## Example

A `gt` function defining greater priority can be provided to constructor methods
as an option. By default, `>` is used.

```javascript
import {PriorityQueue} from "@alg/priority-queue";

// Look, ma! O(n) heapify!
const q = PriorityQueue.from([2, 4, 3], {gt: (a, b) => a < b});

console.log(q.length);  // 3

console.log(q.peek());  // 2
console.log(q.pop());  // 2

q.push(1);
q.pushAll([2, 5]);

console.log([...q]);  // [1, 2, 3, 4, 5]
```
