import LinkedList from './linked-list'

class Queue<T> implements Iterable<T> {
  private list: LinkedList<T>
  constructor() {
    this.list = new LinkedList()
  }

  /**
   * Returns size of queue - O(1)
   */
  size(): number {
    return this.list.size()
  }

  /**
   * Returns true if queue is empty, false otherwise - O(1)
   */
  isEmpty(): boolean {
    return this.list.isEmpty()
  }

  /**
   * Deletes all elements in queue - O(1)
   */
  clear(): void {
    this.list.clear()
  }

  /**
   * Enqueues element into queue - O(1)
   * @param {T} element - element to be enqueued
   */
  enqueue(element: T): void {
    this.list.addFront(element)
  }

  /**
   * Dequeues element from queue - O(1)
   * @returns {T}
   */

  dequeue(): T | null {
    if (this.isEmpty()) return null
    return this.list.removeTail()
  }

  /**
   * Peeks at the element at the front of the queue - O(1)
   * @returns {T} - Frontmost element
   */
  peekFront(): T | null {
    if (this.isEmpty()) return null
    return this.list.peekBack()
  }

  /**
   * Peeks at the element at the back of the queue - O(1)
   * @returns {T} - Backmost element
   */
  peekBack(): T | null {
    if (this.isEmpty()) return null
    return this.list.peekFront()
  }

  /**
   * Checks if value is in queue - O(n)
   * @param {T} element  - element to search for
   * @returns {boolean}
   */
  contains(element: T): boolean {
    return this.list.contains(element)
  }

  [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]()
  }
}

export default Queue
