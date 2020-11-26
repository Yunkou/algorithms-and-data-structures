class CircularBuffer<T> {
  private list: T[]
  private sz: number
  private capacity: number

  private readIndex: number
  private writeIndex: number

  constructor(capacity: number) {
    this.list = new Array(capacity)
    this.sz = 0
    this.capacity = capacity

    this.readIndex = 0
    this.writeIndex = 0
  }

  /**
   * Returns size of circular buffer - O(1)
   */
  size(): number {
    return this.sz
  }

  /**
   * Returns true if buffer is empty, false otherwise - O(1)
   */
  isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * Deletes all elements in buffer - O(capacity)
   */
  clear(): void {
    this.list = new Array(this.capacity)
    this.sz = 0
  }

  /**
   * Enqueues element into queue - O(1)
   * @param {T} element - element to be enqueued
   */
  enqueue(element: T): void {
    this.list[this.writeIndex] = element

    const elementIsOverWritten = this.sz !== 0 && this.writeIndex === this.readIndex
    if (elementIsOverWritten) {
      this.readIndex = (this.readIndex + 1) % this.capacity
    }

    this.writeIndex = (this.writeIndex + 1) % this.capacity

    this.sz += 1
  }

  /**
   * Dequeues element from queue - O(1)
   * @returns {T}
   */
  dequeue(): T | null {
    if (this.isEmpty()) return null

    const removedVal = this.list[this.readIndex]
    this.readIndex = (this.readIndex + 1) % this.capacity

    this.sz -= 1

    return removedVal
  }

  /**
   * Peeks the element at the front of the buffer - O(1)
   * @returns {T} - Frontmost element
   */
  peekFront(): T | null {
    if (this.isEmpty()) return null

    return this.list[this.readIndex]
  }

  /**
   * Peeks the element at the back of the buffer - O(1)
   * @returns {T} - Backmost element
   */
  peekBack(): T | null {
    if (this.isEmpty()) return null

    let i = this.writeIndex - 1
    if (i < 0) i = this.capacity - 1

    return this.list[i]
  }
}

export default CircularBuffer
