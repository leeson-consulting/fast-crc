#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-16/Nguyen_Fx011b:
//  width   = 16-bits
//  poly    = 0x011b
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x8d1c

uint16_t crc16_nguyen_Fx011b(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD6/Fx011b.h"

uint16_t crc16_nguyen_Fx011b(uint8_t const *data, size_t const data_len)
{
  return crc16_Fx011b(/* init = */ 0x0000, data, data_len);
}

#endif
