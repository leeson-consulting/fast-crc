#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-16/MCRFXX:
//  width   = 16-bits
//  poly    = 0x1021
//  init    = 0xffff
//  refin   = true
//  refout  = true
//  xorout  = 0x0000
//  check   = 0x6f91
//  residue = 0x0000

uint16_t crc16_mcrfxx(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Rx1021.h"

uint16_t crc16_mcrfxx(uint8_t const *data, size_t const data_len)
{
  return crc16_Rx1021(/* init = */ 0xffff, data, data_len);
}

#endif
