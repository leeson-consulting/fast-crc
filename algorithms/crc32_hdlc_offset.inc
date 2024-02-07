#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_OFFSET_KERNEL32

// CRC-32/ISO-HDLC:
//  width   = 32-bits
//  poly    = 0x04c11db7
//  init    = 0xffffffff
//  refin   = true
//  refout  = true
//  xorout  = 0xffffffff
//  check   = 0xcbf43926
//  residue = 0xdebb20e3

uint32_t crc32_hdlc_offset(uint8_t const *data, size_t const bit_offset, size_t const bit_length);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Rx04c11db7.h"

uint32_t crc32_hdlc_offset(uint8_t const *data, size_t const bit_offset, size_t const bit_length)
{
  return calc_crc32_offset(/* crc_msb = */ 0, /* init = */ 0xffffffff, data, bit_offset, bit_length, &lookup_RPoly04c11db7) ^ /* xorout = */ 0xffffffff;
}

#endif
