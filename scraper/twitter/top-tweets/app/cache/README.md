## Least recently used

```shell
import lru

size = 100          # Size of the cache. The maximum number of key/value
                    # pairs you want the cache to hold.

cache = lru.lrucache(size)
                    # Create a cache object.

value = cache[key]  # Lookup a value given its key.
cache[key] = value  # Insert a key/value pair.
del cache[key]      # Delete a value given its key.
                    #
                    # These three operations affect the order of the cache.
                    # Lookup and insert both move the key/value to the most
                    # recently used position. Delete (obviously) removes a
                    # key/value from whatever position it was in.

key in cache        # Test for membership. Does not affect the cache order.

value = cache.peek(key)
                    # Lookup a value given its key. Does not affect the
                    # cache order.

cache.keys()        # Return an iterator over the keys in the cache
cache.values()      # Return an iterator over the values in the cache
cache.items()       # Return an iterator over the (key, value) pairs in the
                    # cache.
                    #
                    # These calls have no effect on the cache order.
                    # lrucache is scan resistant when these calls are used.
                    # The iterators iterate over their respective elements
                    # in the order of most recently used to least recently
                    # used.
                    #
                    # WARNING - While these iterators do not affect the
                    # cache order the lookup, insert, and delete operations
                    # do. The result of changing the cache's order
                    # during iteration is undefined. If you really need to
                    # do something of the sort use list(cache.keys()), then
                    # loop over the list elements.

for key in cache:   # Caches support __iter__ so you can use them directly
    pass            # in a for loop to loop over the keys just like
                    # cache.keys()

cache.size()        # Returns the size of the cache
cache.size(x)       # Changes the size of the cache. x MUST be greater than
                    # zero. Returns the new size x.

x = len(cache)      # Returns the number of items stored in the cache.
                    # x will be less than or equal to cache.size()

cache.clear()       # Remove all items from the cache.
```
