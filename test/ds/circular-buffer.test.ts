import CircularBuffer from '../../src/ds/circular-buffer'

describe('Circular Buffer', () => {
  let buffer: CircularBuffer<number>

  beforeEach(() => {
    buffer = new CircularBuffer(4)
  })

  describe('empty', () => {
    it('returns null when dequeue is called on empty buffer', () => {
      expect(buffer.dequeue()).toBe(null)
    })

    it('returns null when peek() is called on empty buffer', () => {
      expect(buffer.peekFront()).toBe(null)
      expect(buffer.peekBack()).toBe(null)
    })

    it('is empty', () => {
      expect(buffer.isEmpty()).toBe(true)
    })
  })

  describe('insertion/deletion', () => {
    it('enqueues', () => {
      buffer.enqueue(1)
      expect(buffer.size()).toBe(1)

      buffer.enqueue(2)
      expect(buffer.size()).toBe(2)

      buffer.enqueue(3)
      expect(buffer.size()).toBe(3)
    })

    it('dequeues', () => {
      buffer.enqueue(1)
      buffer.enqueue(2)
      buffer.enqueue(3)

      buffer.dequeue()
      expect(buffer.size()).toBe(2)

      buffer.dequeue()
      expect(buffer.size()).toBe(1)

      buffer.dequeue()
      expect(buffer.size()).toBe(0)
    })

    it('deletes', () => {
      buffer.enqueue(11)
      buffer.dequeue()
      expect(buffer.size()).toBe(0)
      expect(buffer.dequeue()).toBe(null)
    })

    it('overwrites', () => {
      buffer.enqueue(1)
      buffer.enqueue(2)
      buffer.enqueue(3)
      buffer.enqueue(4)
      buffer.enqueue(5)
      expect(buffer.peekFront()).toBe(2)
      expect(buffer.peekBack()).toBe(5)
    })

    it('clears the buffer', () => {
      buffer.enqueue(1)
      buffer.enqueue(2)
      buffer.enqueue(3)
      buffer.enqueue(4)
      buffer.clear()
      expect(buffer.isEmpty()).toBe(true)

      buffer.enqueue(1)
      buffer.clear()
      expect(buffer.isEmpty()).toBe(true)

      buffer.clear()
      expect(buffer.isEmpty()).toBe(true)
    })

    describe('Accessing', () => {
      it('peeks', () => {
        buffer.enqueue(1)
        expect(buffer.peekFront()).toBe(1)
        expect(buffer.peekBack()).toBe(1)

        buffer.enqueue(2)
        expect(buffer.peekFront()).toBe(1)
        expect(buffer.peekBack()).toBe(2)
      })

      it('peeks back', () => {
        buffer.enqueue(1)
        buffer.enqueue(2)
        buffer.enqueue(3)
        buffer.enqueue(4)
        expect(buffer.peekBack()).toBe(4)
      })
    })
  })
})
