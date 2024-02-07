#pragma once

#include "crc_kernel_common.c"

typedef crc64_t (* Lookup_CRC64)(size_t const idx);

///////////////////////////////////////////////////////////////////////////////
//
// Reflected CRC Kernel Functions

// calc_crc64_r84 calculates the reversed CRC from @crc and the 8 LSB of @data_byte using the 4-bit @lookup_crc64 table

static inline crc64_t calc_crc64_r84(size_t const UNUSED(crc_msb), crc64_t crc, uint8_t const data_byte, Lookup_CRC64 const lookup_crc64)
{
  crc = lookup_crc64((crc ^ data_byte) & 0x0f) ^ (crc >> 4);
  crc = lookup_crc64((crc ^ (data_byte >> 4)) & 0x0f) ^ (crc >> 4);
  return crc;
}

///////////////////////////////////////////////////////////////////////////////
//
// Forward CRC Kernel Functions

// calc_crc64_f84 calculates the forward CRC from @crc and the 8 LSB of @data_byte using the 4-bit @lookup_crc64 table

static inline crc64_t calc_crc64_f84(size_t const crc_msb, crc64_t crc, uint8_t const data_byte, Lookup_CRC64 const lookup_crc64)
{
  crc = lookup_crc64(((crc >> (crc_msb - 4)) ^ (data_byte >> 4)) & 0x0f) ^ (crc << 4);
  crc = lookup_crc64(((crc >> (crc_msb - 4)) ^ data_byte) & 0x0f) ^ (crc << 4);
  return crc;
}

///////////////////////////////////////////////////////////////////////////////
//
// Shared CRC Kernel Functions

static crc64_t calc_crc64(size_t const crc_msb, crc64_t const init, uint8_t const * data, size_t data_len, Lookup_CRC64 const lookup_crc64)
{
  crc64_t crc = init;

  while (data_len--) {

    if (crc_msb == 0) {
      crc = calc_crc64_r84(crc_msb, crc, *data, lookup_crc64);
    } else {
      crc = calc_crc64_f84(crc_msb, crc, *data, lookup_crc64);
    }

    data++;
  }

  return crc;
}
