#pragma once

#include "crc_kernel_common.c"

typedef crcx_t (* Lookup_CRCx)(size_t const idx);

///////////////////////////////////////////////////////////////////////////////
//
// Reflected CRC Kernel Functions

// calc_crcx_r84 calculates the reversed CRC from @crc and the 8 LSB of @data_byte using the 4-bit @lookup_crcx table

static inline crcx_t calc_crcx_r84(size_t const UNUSED(crc_msb), crcx_t crc, uint8_t const data_byte, Lookup_CRCx const lookup_crcx)
{
  crc = lookup_crcx((crc ^ data_byte) & 0x0f) ^ (crc >> 4);
  crc = lookup_crcx((crc ^ (data_byte >> 4)) & 0x0f) ^ (crc >> 4);
  return crc;
}

///////////////////////////////////////////////////////////////////////////////
//
// Forward CRC Kernel Functions

// calc_crcx_f84 calculates the forward CRC from @crc and the 8 LSB of @data_byte using the 4-bit @lookup_crcx table

static inline crcx_t calc_crcx_f84(size_t const crc_msb, crcx_t crc, uint8_t const data_byte, Lookup_CRCx const lookup_crcx)
{
  crc = lookup_crcx(((crc >> (crc_msb - 4)) ^ (data_byte >> 4)) & 0x0f) ^ (crc << 4);
  crc = lookup_crcx(((crc >> (crc_msb - 4)) ^ data_byte) & 0x0f) ^ (crc << 4);
  return crc;
}

///////////////////////////////////////////////////////////////////////////////
//
// Shared CRC Kernel Functions

static crcx_t calc_crcx(size_t const crc_msb, crcx_t const init, uint8_t const * data, size_t data_len, Lookup_CRCx const lookup_crcx)
{
  crcx_t crc = init;

  while (data_len--) {

    if (crc_msb == 0) {
      crc = calc_crcx_r84(crc_msb, crc, *data, lookup_crcx);
    } else {
      crc = calc_crcx_f84(crc_msb, crc, *data, lookup_crcx);
    }

    data++;
  }

  return crc;
}
