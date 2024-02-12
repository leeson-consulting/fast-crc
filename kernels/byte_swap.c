#pragma once

#include <stdint.h>

#if !defined(__has_builtin)
#define __has_builtin(x) (0)
#endif

static inline uint16_t byte_swap_16(uint16_t const data)
{
#if __has_builtin(__builtin_bswap16)
  return __builtin_bswap16(data);
#elif defined(_MSC_VER)
  return _byteswap_ushort(data);
#else
  return (data << 8) | (data >> 8);
#endif // __has_builtin(__builtin_bswap16)
}

static inline uint32_t byte_swap_32(uint32_t const data)
{
#if __has_builtin(__builtin_bswap32)
  return __builtin_bswap32(data);
#elif defined(_MSC_VER)
  return _byteswap_ulong(data);
#else
  return ((uint32_t) byte_swap_16(data) << 16) | ((uint32_t) byte_swap_16(data >> 16));
#endif // __has_builtin(__builtin_bswap32)
}

static inline uint64_t byte_swap_64(uint64_t const data)
{
#if __has_builtin(__builtin_bswap64)
  return __builtin_bswap64(data);
#elif defined(_MSC_VER)
  return _byteswap_uint64(data);
#else
  return ((uint64_t) byte_swap_32(data) << 32) | ((uint64_t) byte_swap_32(data >> 32));
#endif // __has_builtin(__builtin_bswap64)
}

