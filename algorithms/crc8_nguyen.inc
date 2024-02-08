#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_KERNEL8

// CRC-8/Nguyen:
//  width   = 8-bits
//  poly    = 0x07
//  init    = 0x00
//  refin   = false
//  refout  = false
//  xorout  = 0x00
//  check   = 0xf4

uint8_t crc8_nguyen(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Fx07.h"

uint8_t crc8_nguyen(uint8_t const *data, size_t const data_len)
{
  return calc_crc8(/* crc_msb = */ 8, /* init = */ 0x00, data, data_len, &lookup_FPoly07);
}

#endif
