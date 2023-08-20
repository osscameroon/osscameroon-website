# Simple/Basic Cache
# with expiration life

import time
from typing import Any


class Cache(object):
    _cache_: dict = {}
    VALUE = 0
    EXPIRES = 1

    @classmethod
    def get(cls, key: str) -> Any:
        """Get the value from the cache stored with 'key' if it exists"""
        try:
            if cls._cache_[key][cls.EXPIRES] > time.time():
                return cls._cache_[key][cls.VALUE]
            else:
                del cls._cache_[key]  # Delete the item if it has expired
                return None
        except KeyError:
            return None

    @classmethod
    def set(cls, key, value, duration=3600) -> None:
        """
        Store/overwite a value in the cache with 'key' and an optional
        duration (seconds)
        """
        try:
            expires = time.time() + duration
        except TypeError:
            raise TypeError("Duration must be numeric")

        cls._cache_[key] = (value, expires)
        return cls.get(key)

    @classmethod
    def clean(cls) -> None:
        """Remove all expired items from the cache"""
        for key in cls._cache_.keys():
            cls.get(key)  # Attempting to fetch an expired item deletes it

    @classmethod
    def purge(cls) -> None:
        """Remove all items from the cache"""
        cls._cache_ = {}
