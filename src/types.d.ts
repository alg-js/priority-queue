/**
 * Every day I pray for <https://tc39.es/proposal-type-annotations/>
 */

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
export function priorityQueue<T>(
  comparator: (a: T, b: T) => boolean,
  initial?: Iterable<T> | null,
): PriorityQueue<T>;

/**
 * @template T
 */
export class PriorityQueue<T> {
  /**
   * Creates a priority queue with the given comparator function and
   * initial values.
   *
   * @param {(a: T, b: T) => boolean} comparator comparison function
   * implementing the `>` priority relation: `a > b`
   * @param {Iterable<T> | null} initial
   */
  constructor(
    comparator: (a: T, b: T) => boolean,
    initial?: Iterable<T> | null,
  );
  /**
   * Returns the size of the priority queue
   *
   * @returns {number}
   */
  size(): number;
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
   */
  pop(): T;
  /**
   * Returns a highest priority item from the priority queue
   *
   * @returns {T}
   */
  peek(): T;
  /**
   * Iterates over items from the priority queue is descending priority order.
   * Behaviour is not defined if items are added, removed, or peeked during
   * iteration.
   *
   * @returns {Generator<T, void, void>}
   */
  [Symbol.iterator](): Generator<T, void, void>;
}
