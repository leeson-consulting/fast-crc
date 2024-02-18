#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-24/Nguyen_Fx000007:
//  width   = 24-bits
//  poly    = 0x000007
//  init    = 0x000000
//  refin   = false
//  refout  = false
//  xorout  = 0x000000
//  check   = 0x921774

uint32_t crc24_nguyen_Fx000007(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Fx000007.h"

uint32_t crc24_nguyen_Fx000007(uint8_t const *data, size_t const data_len)
{
  return crc24_Fx000007(/* init = */ 0x000000, data, data_len);
}

#endif
