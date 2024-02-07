#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_OFFSET_KERNEL16

// CRC-16/IBM3740:
//  width   = 16-bits
//  poly    = 0x1021
//  init    = 0xffff
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x29b1
//  residue = 0x0000

uint16_t crc16_ibm3740_offset(uint8_t const *data, size_t const bit_offset, size_t const bit_length);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Fx1021.h"

uint16_t crc16_ibm3740_offset(uint8_t const *data, size_t const bit_offset, size_t const bit_length)
{
  return calc_crc16_offset(/* crc_msb = */ 16, /* init = */ 0xffff, data, bit_offset, bit_length, &lookup_FPoly1021);
}

#endif
