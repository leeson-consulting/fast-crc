#if crc_algorithms_inc == INCLUDE_INTERFACE

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

#include "../polynomials/HD6/Fx80f.h"

uint16_t crc12_umts(uint8_t const *data, size_t const data_len)
{
  uint16_t crc = crc12_Fx80f(/* init = */ 0x000, data, data_len);
  return bit_reverse_16(crc) >> 4;
}

#endif
