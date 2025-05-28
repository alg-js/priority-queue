# @alg/priority-queue

[![JSR](https://jsr.io/badges/@alg/priority-queue)](https://jsr.io/@alg/priority-queue)
[![License](https://img.shields.io/badge/Apache--2.0-green?label=license)](https://github.com/alg-js/priority-queue/blob/main/LICENSE)

A priority queue implemented as a binary heap.

## Install

```
deno add jsr:@alg/priority-queue
```

## Example

```javascript
import {PriorityQueue} from "@alg/priority-queue";

const strCmp = (a, b) => a.toUpperCase() < b.toUpperCase();
const initial = ["C", "a", "A", "B"];
const q = PriorityQueue.from(initial, strCmp);  // Look, ma! O(n) heapify!
console.log(q.peek());  // "a" or "A"
console.log(q.pop());  // "a" or "A"
q.push("X");
q.pushAll(["Y", "Z"]);
console.log(q.pop());  // "a" or "A"
console.log(q.length);  // 5
console.log([...q]);  // ["B", "C", "X", "Y", "Z"]
```
