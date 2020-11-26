import LinkedList from './linked-list'

export default class Stack<T> implements Iterable<T> {
  private list: LinkedList<T>
  constructor() {
    this.list = new LinkedList()
  }

  /**
   * Returns size - O(1)
   * @return {number}
   */
  size(): number {
    if (this.list) {
      return this.list.size()
    }

    return 0
  }

  /**
   * Returns true if linked list is empty, false otherwise - O(1)
   */
  isEmpty(): boolean {
    return this.list.isEmpty()
  }

  /**
   * Deletes all elements - O(1)
   */
  clear(): void {
    this.list.clear()
  }

  /**
   * Pushes element onto the stack - O(1)
   * @param {T} element - element to push on stack
   */

  push(element: T): void {
    this.list.addBack(element)
  }

  /**
   * Pops an element off the stack - O(1)
   * @returns {T} - Element which was popped off
   */
  pop(): T | null {
    if (this.isEmpty()) return null
    return this.list.removeTail()
  }

  /**
   * Peeks at the top most element on the stack - O(1)
   * @returns {T} - Topmost element
   */
  peek(): T | null {
    if (this.isEmpty()) return null
    return this.list.peekBack()
  }

  /**
   * Checks if value is in stack - O(n)
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
