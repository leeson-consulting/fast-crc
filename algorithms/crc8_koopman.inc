#if crc_algorithms_inc == INCLUDE_INTERFACE

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
  return crc8_Rx4d(/* init = */ 0xff, data, data_len) ^ /* xorout = */ 0xff;
}

#endif
