# @alg/priority-queue

[![JSR](https://jsr.io/badges/@alg/priority-queue)](https://jsr.io/@alg/priority-queue)
[![API](https://img.shields.io/badge/API-blue?logo=readme&logoColor=white)](https://jsr.io/@alg/priority-queue/doc)
[![License](https://img.shields.io/badge/MIT-green?label=license)](https://github.com/alg/priority-queue/blob/main/LICENSE)

A priority queue implemented as a binary heap.

## Install

```
deno add jsr:@alg/priority-queue
```

## Example

```javascript
import {priorityQueue} from "@alg/queues";

const strCmp = (a, b) => a.toUpperCase() < b.toUpperCase();
const initial = ["C", "a", "A", "B"];
const q = priorityQueue(strCmp, initial);  // Look, ma! O(n) heapify!
console.log(q.peek());  // "a" or "A"
console.log(q.pop());  // "a" or "A"
q.push("X");
q.pushAll(["Y", "Z"]);
console.log(q.pop());  // "a" or "A"
console.log(q.size());  // 5
console.log([...q]);  // ["B", "C", "X", "Y", "Z"]
```
