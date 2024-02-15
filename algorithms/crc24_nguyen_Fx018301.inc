#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-24/Nguyen_Fx018301:
//  width   = 24-bits
//  poly    = 0x018301
//  init    = 0x000000
//  refin   = false
//  refout  = false
//  xorout  = 0x000000
//  check   = 0x8a7d1b

uint32_t crc24_nguyen_Fx018301(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Fx018301.h"

uint32_t crc24_nguyen_Fx018301(uint8_t const *data, size_t const data_len)
{
  return crc24_Fx018301(/* init = */ 0x000000, data, data_len);
}

#endif
