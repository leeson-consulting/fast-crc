#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-64/Nguyen_Fx000000000000002f:
//  width   = 64-bits
//  poly    = 0x000000000000002f
//  init    = 0x0000000000000000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000000000000000
//  check   = 0x4966ab84f5dba52f

uint64_t crc64_nguyen_Fx000000000000002f(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD6/Fx000000000000002f.h"

uint64_t crc64_nguyen_Fx000000000000002f(uint8_t const *data, size_t const data_len)
{
  return crc64_Fx000000000000002f(/* init = */ 0x0000000000000000, data, data_len);
}

#endif