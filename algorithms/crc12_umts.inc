#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_KERNEL12

// CRC-12/UMTS:
//  width   = 12-bits
//  poly    = 0x80f
//  init    = 0x000
//  refin   = false
//  refout  = true
//  xorout  = 0x000
//  check   = 0xdaf
//  residue = 0x000

uint16_t crc12_umts(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Fx80f.h"

uint16_t crc12_umts(uint8_t const *data, size_t const data_len)
{
  uint16_t crc = calc_crc12(/* crc_msb = */ 12, /* init = */ 0x000, data, data_len, &lookup_FPoly80f);
  return bit_reverse_16(crc) >> 4;
}

#endif
