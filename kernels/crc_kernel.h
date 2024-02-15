#pragma once

#include <stdint.h>

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial CRC Kernels
//
///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_r8(poly) \
static inline uint_fast8_t crc8_byte_##poly##_impl(uint_fast8_t crc, uint8_t const data_byte) \
{ \
  crc = poly[(crc ^ data_byte) & 0x0f] ^ (crc >> 4); \
  crc = poly[(crc ^ (data_byte >> 4)) & 0x0f] ^ (crc >> 4); \
  return crc; \
} \
\
static inline uint_fast8_t crc8_byte_##poly(uint_fast8_t const crc, uint8_t const data_byte) \
{ \
  return crc8_byte_##poly##_impl(crc, data_byte) & 0xff; \
} \
\
static uint_fast8_t crc8_##poly(uint_fast8_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast8_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc8_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_r12(poly) \
static inline uint_fast16_t crc12_byte_##poly##_impl(uint_fast16_t crc, uint8_t const data_byte) \
{ \
  crc = poly[(crc ^ data_byte) & 0x0f] ^ (crc >> 4); \
  crc = poly[(crc ^ (data_byte >> 4)) & 0x0f] ^ (crc >> 4); \
  return crc; \
} \
\
static inline uint_fast16_t crc12_byte_##poly(uint_fast16_t const crc, uint8_t const data_byte) \
{ \
  return crc12_byte_##poly##_impl(crc, data_byte) & 0xfff; \
} \
\
static uint_fast16_t crc12_##poly(uint_fast16_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast16_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc12_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xfff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_r16(poly) \
static inline uint_fast16_t crc16_byte_##poly##_impl(uint_fast16_t crc, uint8_t const data_byte) \
{ \
  crc = poly[(crc ^ data_byte) & 0x0f] ^ (crc >> 4); \
  crc = poly[(crc ^ (data_byte >> 4)) & 0x0f] ^ (crc >> 4); \
  return crc; \
} \
\
static inline uint_fast16_t crc16_byte_##poly(uint_fast16_t const crc, uint8_t const data_byte) \
{ \
  return crc16_byte_##poly##_impl(crc, data_byte) & 0xffff; \
} \
\
static uint_fast16_t crc16_##poly(uint_fast16_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast16_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc16_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xffff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_r24(poly) \
static inline uint_fast32_t crc24_byte_##poly##_impl(uint_fast32_t crc, uint8_t const data_byte) \
{ \
  crc = poly[(crc ^ data_byte) & 0x0f] ^ (crc >> 4); \
  crc = poly[(crc ^ (data_byte >> 4)) & 0x0f] ^ (crc >> 4); \
  return crc; \
} \
\
static inline uint_fast32_t crc24_byte_##poly(uint_fast32_t const crc, uint8_t const data_byte) \
{ \
  return crc24_byte_##poly##_impl(crc, data_byte) & 0xffffff; \
} \
\
static uint_fast32_t crc24_##poly(uint_fast32_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast32_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc24_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xffffff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_r32(poly) \
static inline uint_fast32_t crc32_byte_##poly##_impl(uint_fast32_t crc, uint8_t const data_byte) \
{ \
  crc = poly[(crc ^ data_byte) & 0x0f] ^ (crc >> 4); \
  crc = poly[(crc ^ (data_byte >> 4)) & 0x0f] ^ (crc >> 4); \
  return crc; \
} \
\
static inline uint_fast32_t crc32_byte_##poly(uint_fast32_t const crc, uint8_t const data_byte) \
{ \
  return crc32_byte_##poly##_impl(crc, data_byte) & 0xffffffff; \
} \
\
static uint_fast32_t crc32_##poly(uint_fast32_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast32_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc32_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xffffffff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_r64(poly) \
static inline uint_fast64_t crc64_byte_##poly##_impl(uint_fast64_t crc, uint8_t const data_byte) \
{ \
  crc = poly[(crc ^ data_byte) & 0x0f] ^ (crc >> 4); \
  crc = poly[(crc ^ (data_byte >> 4)) & 0x0f] ^ (crc >> 4); \
  return crc; \
} \
\
static inline uint_fast64_t crc64_byte_##poly(uint_fast64_t const crc, uint8_t const data_byte) \
{ \
  return crc64_byte_##poly##_impl(crc, data_byte) & 0xffffffffffffffff; \
} \
\
static uint_fast64_t crc64_##poly(uint_fast64_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast64_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc64_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xffffffffffffffff; \
} \

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial CRC Kernels
//
///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_f8(poly) \
static inline uint_fast8_t crc8_byte_##poly##_impl(uint_fast8_t crc, uint8_t const data_byte) \
{ \
  crc = poly[((crc >> (8 - 4)) ^ (data_byte >> 4)) & 0x0f] ^ (crc << 4); \
  crc = poly[((crc >> (8 - 4)) ^ data_byte) & 0x0f] ^ (crc << 4); \
  return crc; \
} \
\
static inline uint_fast8_t crc8_byte_##poly(uint_fast8_t const crc, uint8_t const data_byte) \
{ \
  return crc8_byte_##poly##_impl(crc, data_byte) & 0xff; \
} \
\
static uint_fast8_t crc8_##poly(uint_fast8_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast8_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc8_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_f12(poly) \
static inline uint_fast16_t crc12_byte_##poly##_impl(uint_fast16_t crc, uint8_t const data_byte) \
{ \
  crc = poly[((crc >> (12 - 4)) ^ (data_byte >> 4)) & 0x0f] ^ (crc << 4); \
  crc = poly[((crc >> (12 - 4)) ^ data_byte) & 0x0f] ^ (crc << 4); \
  return crc; \
} \
\
static inline uint_fast16_t crc12_byte_##poly(uint_fast16_t const crc, uint8_t const data_byte) \
{ \
  return crc12_byte_##poly##_impl(crc, data_byte) & 0xfff; \
} \
\
static uint_fast16_t crc12_##poly(uint_fast16_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast16_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc12_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xfff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_f16(poly) \
static inline uint_fast16_t crc16_byte_##poly##_impl(uint_fast16_t crc, uint8_t const data_byte) \
{ \
  crc = poly[((crc >> (16 - 4)) ^ (data_byte >> 4)) & 0x0f] ^ (crc << 4); \
  crc = poly[((crc >> (16 - 4)) ^ data_byte) & 0x0f] ^ (crc << 4); \
  return crc; \
} \
\
static inline uint_fast16_t crc16_byte_##poly(uint_fast16_t const crc, uint8_t const data_byte) \
{ \
  return crc16_byte_##poly##_impl(crc, data_byte) & 0xffff; \
} \
\
static uint_fast16_t crc16_##poly(uint_fast16_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast16_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc16_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xffff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_f24(poly) \
static inline uint_fast32_t crc24_byte_##poly##_impl(uint_fast32_t crc, uint8_t const data_byte) \
{ \
  crc = poly[((crc >> (24 - 4)) ^ (data_byte >> 4)) & 0x0f] ^ (crc << 4); \
  crc = poly[((crc >> (24 - 4)) ^ data_byte) & 0x0f] ^ (crc << 4); \
  return crc; \
} \
\
static inline uint_fast32_t crc24_byte_##poly(uint_fast32_t const crc, uint8_t const data_byte) \
{ \
  return crc24_byte_##poly##_impl(crc, data_byte) & 0xffffff; \
} \
\
static uint_fast32_t crc24_##poly(uint_fast32_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast32_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc24_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xffffff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_f32(poly) \
static inline uint_fast32_t crc32_byte_##poly##_impl(uint_fast32_t crc, uint8_t const data_byte) \
{ \
  crc = poly[((crc >> (32 - 4)) ^ (data_byte >> 4)) & 0x0f] ^ (crc << 4); \
  crc = poly[((crc >> (32 - 4)) ^ data_byte) & 0x0f] ^ (crc << 4); \
  return crc; \
} \
\
static inline uint_fast32_t crc32_byte_##poly(uint_fast32_t const crc, uint8_t const data_byte) \
{ \
  return crc32_byte_##poly##_impl(crc, data_byte) & 0xffffffff; \
} \
\
static uint_fast32_t crc32_##poly(uint_fast32_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast32_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc32_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xffffffff; \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc_kernel_f64(poly) \
static inline uint_fast64_t crc64_byte_##poly##_impl(uint_fast64_t crc, uint8_t const data_byte) \
{ \
  crc = poly[((crc >> (64 - 4)) ^ (data_byte >> 4)) & 0x0f] ^ (crc << 4); \
  crc = poly[((crc >> (64 - 4)) ^ data_byte) & 0x0f] ^ (crc << 4); \
  return crc; \
} \
\
static inline uint_fast64_t crc64_byte_##poly(uint_fast64_t const crc, uint8_t const data_byte) \
{ \
  return crc64_byte_##poly##_impl(crc, data_byte) & 0xffffffffffffffff; \
} \
\
static uint_fast64_t crc64_##poly(uint_fast64_t const init, uint8_t const * data, size_t data_len) \
{ \
  uint_fast64_t crc = init; \
\
  for (size_t i = 0 ; i < data_len ; ++i) { \
    crc = crc64_byte_##poly##_impl(crc, data[i]); \
  } \
\
  return crc & 0xffffffffffffffff; \
} \

