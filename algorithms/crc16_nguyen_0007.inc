#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-16/Nguyen_0007:
//  width   = 16-bits
//  poly    = 0x0007
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0xef6f

uint16_t crc16_nguyen_0007(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Fx0007.h"

uint16_t crc16_nguyen_0007(uint8_t const *data, size_t const data_len)
{
  return crc16_Fx0007(/* init = */ 0x0000, data, data_len);
}

#endif
