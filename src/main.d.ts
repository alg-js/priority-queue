/* Copyright 2025 @alg/priority-queue contributors
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

/**
 * @template T
 */
export class PriorityQueue<T> {
  /** The size of the priority queue */
  readonly length: number;

  /**
   * Creates a priority queue.
   *
   * The `gt` function defines `>` relation indicating priority. That is,
   * `a > b` indicates `a` is higher priority than `b`. By default, `>` is used.
   *
   * @param {Object} options
   * @param {(a: T, b: T) => boolean} options.gt The priority relation
   */
  constructor(options?: {gt?: (a: T, b: T) => boolean});

  /**
   * Creates a priority queue from the given items
   *
   * The `gt` function defines `>` relation indicating priority. That is,
   * `a > b` indicates `a` is higher priority than `b`. By default, `>` is used.
   *
   * @param items
   * @param {Object=} options
   * @param {(a: T, b: T) => boolean=} options.gt
   */
  static from<T>(
    items: Iterable<T>,
    options?: {gt?: (a: T, b: T) => boolean},
  ): PriorityQueue<T>;

  /**
   * Adds an item to the priority queue
   *
   * @param {T} item
   */
  push(item: T): void;

  /**
   * Adds all items to the priority queue
   *
   * @param {Iterable<T>} items
   */
  pushAll(items: Iterable<T>): void;

  /**
   * Pops and returns a highest priority item from the priority queue
   *
   * @returns {T}
   * @throws {Error} if the queue is empty
   */
  pop(): T;

  /**
   * Pops and returns the K highest priority items from the priority queue
   *
   * @returns {T}
   * @throws {Error} if the queue has fewer than k items
   */
  popK(k: number): T[];

  /**
   * Returns a highest priority item from the priority queue
   *
   * @returns {T}
   * @throws {Error} if the queue is empty
   */
  peek(): T;

  /**
   * Returns the K highest priority items from the priority queue
   *
   * @returns {T}
   * @throws {Error} if the queue has fewer than k items
   */
  peekK(k: number): T[];

  /**
   * Iterates over items from the priority queue is descending priority order.
   * Behaviour is not defined if items are added, removed, or peeked during
   * iteration.
   *
   * @returns {Generator<T, void, void>}
   */
  [Symbol.iterator](): Generator<T, void, void>;
}
