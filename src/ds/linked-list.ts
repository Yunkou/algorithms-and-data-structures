class LinkedListNode<T> {
  val: T
  next: LinkedListNode<T> | null
  prev: LinkedListNode<T> | null

  constructor(val: T) {
    this.val = val
    this.next = null
    this.prev = null
  }
}

interface List<T> {
  head: LinkedListNode<T>
  tail: LinkedListNode<T>
  size: number
}

const OUT_OF_BOUNDS = 'out of bounds'
const EMPTY = 'empty'
const VALUE_DOES_NOT_EXIST = 'value does not exist'

const defaultEquals = <T>(a: T, b: T): boolean => a === b
interface EqualsFunction<T> {
  (a: T, b: T): boolean
}

export default class LinkedList<T> implements Iterable<T> {
  private list: List<T> | undefined

  constructor() {
    this.list = undefined
  }

  /**
   * Returns size - O(1)
   * @return {number}
   */
  size(): number {
    if (this.list) {
      return this.list.size
    }

    return 0
  }

  /**
   * Returns true if linked list is empty, false otherwise - O(1)
   */
  isEmpty(): boolean {
    return !this.list
  }

  addFront(val: T): void {
    const newNode = new LinkedListNode(val)
    if (this.list) {
      this.list.head.prev = newNode
      newNode.next = this.list.head
      this.list.head = newNode
      this.list.size += 1
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1
      }
    }
  }

  /**
   * Adds node to the tail of the linked list - O(1)
   * @param {T} val - the value to add to list
   * @return {void}
   */
  addBack(val: T): void {
    const newNode = new LinkedListNode(val)

    if (this.list) {
      this.list.tail.next = newNode
      newNode.prev = this.list.tail
      this.list.tail = newNode
      this.list.size += 1
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1
      }
    }
  }

  /**
   * Adds a node at specified index - O(n)
   * @param {number} i  - index
   * @param {T} val - the value to add to list
   * @return {void}
   */
  addAt(i: number, val: T): void {
    if (i === 0) {
      this.addFront(val)
      return
    }

    if (i === this.size()) {
      this.addBack(val)
    }

    if (i < 0 || i > this.size()) {
      throw new Error(OUT_OF_BOUNDS)
    }

    let curr = this.list.head
    for (let j = 0; j < i - 1; j++) {
      curr = curr.next!
    }

    const newNode = new LinkedListNode(val)
    curr.next!.prev = newNode
    newNode.next = curr.next

    newNode.prev = curr
    curr.next = newNode

    this.list.size += 1
  }

  /**
   * Get the value of head - O(1)
   * @return {T} value of head
   */
  peekFront(): T {
    if (!this.list) {
      throw new Error(EMPTY)
    }

    return this.list.head.val
  }

  /**
   * Get the value of tail - O(1)
   * @return {T} value of tail
   */

  peekBack(): T {
    if (!this.list) {
      throw new Error(EMPTY)
    }

    return this.list.tail.val
  }

  /**
   * Get the element at index i - O(n)
   * @param {number} i - index of element
   * @return {T} value of element at index i
   */
  get(i: number): T {
    if (i < 0 || i >= this.size() || !this.list) {
      throw new Error(OUT_OF_BOUNDS)
    }

    let j = 0
    let curr = this.list.head
    while (j < i) {
      curr = curr.next!
      j++
    }

    return curr.val
  }

  /**
   * Equals function must be supplied for non-primitive values.
   * @param {T} value to search for
   * @param {EqualsFunction<T>} equalsFunction - optional function
   * @return {number} the index of the first occurrence of the element, and -1 if the element does not exist
   */
  indexOf(value: T, equalsFunction?: EqualsFunction<T>): number {
    if (!this.list) {
      return -1
    }

    const equalsFn = equalsFunction || defaultEquals
    let i = 0
    let curr = this.list.head

    while (!equalsFn(curr.val, value)) {
      curr = curr.next!
      i++
    }

    return i
  }

  /**
   * Checks if value is in linked list.
   * Equals function must be supplied for non-primitive values.
   * @param {T} value to search for
   * @param {EqualsFunction<T>} equalsFunction - optional function
   * @return {boolean}
   */
  contains(value: T, equalsFunction?: EqualsFunction<T>): boolean {
    const index = this.indexOf(value, equalsFunction)
    return index !== -1
  }

  /**
   * Removes head - O(1)
   * @return {T} - value of head
   */
  removeFront(): T {
    if (!this.list) {
      throw new Error(EMPTY)
    }

    const value = this.list.head.val

    if (this.list.head.next) {
      this.list.head.next.prev = null
      this.list.head = this.list.head.next

      this.list.size--
    } else {
      this.list = null
    }

    return value
  }

  /**
   * Removes tail - O(1)
   * @return {T} - value of tail
   */
  removeTail(): T {
    if (!this.list) {
      throw new Error(EMPTY)
    }

    const value = this.list.tail.val

    if (this.list.tail.prev) {
      this.list.tail.prev.next = null
      this.list.tail = this.list.tail.prev

      this.list.size--
    } else {
      return null
    }

    return value
  }

  /**
   *  Removes first occurrence of node with specified value. Returns true
   *  if removal was successful, and false otherwise. - O(n)
   *  @param {T} val - value to remove
   *  @return {T} - value of removed
   */
  remove(val: T): T {
    const index = this.indexOf(val)
    if (index === -1) {
      throw new Error(VALUE_DOES_NOT_EXIST)
    }

    return this.removeAt(index)
  }

  /**
   * Removes node at specified index - O(n)
   * @param {number} i - index to remove
   * @return {T} - value of removed
   */
  removeAt(i: number): T {
    if (i === 0) {
      return this.removeFront()
    }

    if (i === this.size() - 1) {
      return this.removeTail()
    }

    if (i < 0 || i >= this.size() || !this.list) {
      throw new Error(EMPTY)
    }

    let j = 0
    let curr = this.list.head
    while (j < i) {
      curr = curr.next!
      j++
    }

    curr.next!.prev = curr.prev
    curr.prev!.next = curr.next
    this.list.size--
    return curr.val
  }

  /**
   * Deletes all elements - O(1)
   */
  clear(): void {
    this.list = null
  }

  /**
   * Appends values from an array to list - O()
   *
   */
  fromArray(A: T[]): LinkedList<T> {
    for (const a of A) {
      this.addBack(a)
    }

    return this
  }

  *[Symbol.iterator](): Iterator<T> {
    if (!this.list) {
      return
    }

    let curr: LinkedListNode<T> | null

    for (curr = this.list.head; curr !== null; curr = curr.next) {
      yield curr.val
    }
  }
}
