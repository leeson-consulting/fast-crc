#pragma once

#include <stdint.h>

#include "endianness.h"

#if !defined(__has_builtin)
#define __has_builtin(x) (0)
#endif

static inline uint8_t bit_reverse_8(uint8_t const data)
{
#if __has_builtin(__builtin_bitreverse8)

  return __builtin_bitreverse8(data);

#else

  uint8_t result = data;

  uint8_t const bit_swap_mask[] =
  {
    0x55,   // 1-bit pairs, ie. individual bits
    0x33,   // 2-bit pairs,
    0x0F,   // 4-bit pairs, ie. nibbles
  };

  result = (bit_swap_mask[0] & (result >> 1)) | ((result & bit_swap_mask[0]) << 1);
  result = (bit_swap_mask[1] & (result >> 2)) | ((result & bit_swap_mask[1]) << 2);
  result = (bit_swap_mask[2] & (result >> 4)) | ((result & bit_swap_mask[2]) << 4);

  return result;

#endif // __has_builtin(__builtin_bitreverse8)
}

static inline uint16_t bit_reverse_16(uint16_t const data)
{
#if __has_builtin(__builtin_bitreverse16)

  return __builtin_bitreverse16(data);

#else

  uint16_t result = data;

  // 1. Reverse all bits in each byte

  uint16_t const bit_swap_mask[] =
  {
    0x5555,   // 1-bit pairs, ie. individual bits
    0x3333,   // 2-bit pairs,
    0x0F0F,   // 4-bit pairs, ie. nibbles
  };

  result = (bit_swap_mask[0] & (result >> 1)) | ((result & bit_swap_mask[0]) << 1);
  result = (bit_swap_mask[1] & (result >> 2)) | ((result & bit_swap_mask[1]) << 2);
  result = (bit_swap_mask[2] & (result >> 4)) | ((result & bit_swap_mask[2]) << 4);

  // 2. Reverse all bytes

  result = bswap16(result);

  return result;

#endif // __has_builtin(__builtin_bitreverse16)

}

static inline uint32_t bit_reverse_32(uint32_t const data)
{
#if __has_builtin(__builtin_bitreverse32)

  return __builtin_bitreverse32(data);

#else

  uint32_t result = data;

  // 1. Reverse all bits in each byte

  uint32_t const bit_swap_mask[] =
  {
    0x55555555,   // 1-bit pairs, ie. individual bits
    0x33333333,   // 2-bit pairs,
    0x0F0F0F0F,   // 4-bit pairs, ie. nibbles
  };

  result = (bit_swap_mask[0] & (result >> 1)) | ((result & bit_swap_mask[0]) << 1);
  result = (bit_swap_mask[1] & (result >> 2)) | ((result & bit_swap_mask[1]) << 2);
  result = (bit_swap_mask[2] & (result >> 4)) | ((result & bit_swap_mask[2]) << 4);

  // 2. Reverse all bytes

  result = bswap32(result);

  return result;

#endif // __has_builtin(__builtin_bitreverse32)
}

static inline uint64_t bit_reverse_64(uint64_t const data)
{
#if __has_builtin(__builtin_bitreverse64)

  return __builtin_bitreverse64(data);

#else

  uint64_t result = data;

  // 1. Reverse all bits in each byte

  uint64_t const bit_swap_mask[] =
  {
    0x5555555555555555,   // 1-bit pairs, ie. individual bits
    0x3333333333333333,   // 2-bit pairs,
    0x0F0F0F0F0F0F0F0F,   // 4-bit pairs, ie. nibbles
  };

  result = (bit_swap_mask[0] & (result >> 1)) | ((result & bit_swap_mask[0]) << 1);
  result = (bit_swap_mask[1] & (result >> 2)) | ((result & bit_swap_mask[1]) << 2);
  result = (bit_swap_mask[2] & (result >> 4)) | ((result & bit_swap_mask[2]) << 4);

  // 2. Reverse all bytes

  result = bswap64(result);

  return result;

#endif // __has_builtin(__builtin_bitreverse64)
}

