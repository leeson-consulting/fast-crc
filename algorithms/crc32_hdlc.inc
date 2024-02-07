#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_KERNEL32

// CRC-32/ISO-HDLC:
//  width   = 32-bits
//  poly    = 0x04c11db7
//  init    = 0xffffffff
//  refin   = true
//  refout  = true
//  xorout  = 0xffffffff
//  check   = 0xcbf43926
//  residue = 0xdebb20e3

uint32_t crc32_hdlc(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Rx04c11db7.h"

uint32_t crc32_hdlc(uint8_t const *data, size_t const data_len)
{
  return calc_crc32(/* crc_msb = */ 0, /* init = */ 0xffffffff, data, data_len, &lookup_RPoly04c11db7) ^ /* xorout = */ 0xffffffff;
}

#endif
