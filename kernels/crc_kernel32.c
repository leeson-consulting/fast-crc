#pragma once

#include "crc_kernel_common.c"

typedef crc32_t (* Lookup_CRC32)(size_t const idx);

///////////////////////////////////////////////////////////////////////////////
//
// Reflected CRC Kernel Functions

// calc_crc32_r84 calculates the reversed CRC from @crc and the 8 LSB of @data_byte using the 4-bit @lookup_crc32 table

static inline crc32_t calc_crc32_r84(size_t const UNUSED(crc_msb), crc32_t crc, uint8_t const data_byte, Lookup_CRC32 const lookup_crc32)
{
  crc = lookup_crc32((crc ^ data_byte) & 0x0f) ^ (crc >> 4);
  crc = lookup_crc32((crc ^ (data_byte >> 4)) & 0x0f) ^ (crc >> 4);
  return crc;
}

///////////////////////////////////////////////////////////////////////////////
//
// Forward CRC Kernel Functions

// calc_crc32_f84 calculates the forward CRC from @crc and the 8 LSB of @data_byte using the 4-bit @lookup_crc32 table

static inline crc32_t calc_crc32_f84(size_t const crc_msb, crc32_t crc, uint8_t const data_byte, Lookup_CRC32 const lookup_crc32)
{
  crc = lookup_crc32(((crc >> (crc_msb - 4)) ^ (data_byte >> 4)) & 0x0f) ^ (crc << 4);
  crc = lookup_crc32(((crc >> (crc_msb - 4)) ^ data_byte) & 0x0f) ^ (crc << 4);
  return crc;
}

///////////////////////////////////////////////////////////////////////////////
//
// Shared CRC Kernel Functions

static crc32_t calc_crc32(size_t const crc_msb, crc32_t const init, uint8_t const * data, size_t data_len, Lookup_CRC32 const lookup_crc32)
{
  crc32_t crc = init;

  while (data_len--) {

    if (crc_msb == 0) {
      crc = calc_crc32_r84(crc_msb, crc, *data, lookup_crc32);
    } else {
      crc = calc_crc32_f84(crc_msb, crc, *data, lookup_crc32);
    }

    data++;
  }

  return crc;
}
