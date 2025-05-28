
/**
 * LRU (Least Recently Used) Cache implementation
 * Stores key-value pairs with a maximum capacity
 * When capacity is exceeded, removes the least recently used item
 */
export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V>;

  /**
   * Initialize the LRU cache with a given capacity
   * @param capacity - Maximum number of items to store
   */
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<K, V>();
  }

  /**
   * Get a value from the cache
   * If the key exists, move it to the end (mark as recently used)
   * @param key - The key to look up
   * @returns The value if found, undefined otherwise
   */
  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      // Get the value and remove it from current position
      const value = this.cache.get(key)!;
      this.cache.delete(key);
      
      // Re-insert at the end to mark as most recently used
      this.cache.set(key, value);
      
      return value;
    }
    return undefined;
  }

  /**
   * Set a key-value pair in the cache
   * If the key already exists, update it and mark as recently used
   * If cache is at capacity, remove the least recently used item first
   * @param key - The key to set
   * @param value - The value to associate with the key
   */
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      // Key already exists, remove it first
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Cache is full, remove the least recently used item (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
      console.log('LRU Cache: Removed least recently used item:', firstKey);
    }

    // Add the new key-value pair (or re-add existing key)
    this.cache.set(key, value);
  }

  /**
   * Get the current size of the cache
   * @returns Number of items currently in the cache
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get all keys in the cache (in order from least to most recently used)
   * @returns Array of keys
   */
  keys(): K[] {
    return Array.from(this.cache.keys());
  }
}
