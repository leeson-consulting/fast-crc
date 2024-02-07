#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_KERNEL8

// CRC-8/Koopman:
//  width   = 8-bits
//  poly    = 0x4d
//  init    = 0xff
//  refin   = true
//  refout  = true
//  xorout  = 0xff
//  check   = 0xd8

uint8_t crc8_koopman(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Rx4d.h"

uint8_t crc8_koopman(uint8_t const *data, size_t const data_len)
{
  return calc_crc8(/* crc_msb = */ 0, /* init = */ 0xff, data, data_len, lookup_RPoly4d) ^ /* xorout = */ 0xff;
}

#endif
