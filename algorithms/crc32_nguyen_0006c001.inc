#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_KERNEL32

// CRC-32/Nguyen_0006c001:
//  width   = 32-bits
//  poly    = 0x0006c001
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x1d40bcf7

uint32_t crc32_nguyen_0006c001(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Fx0006c001.h"

uint32_t crc32_nguyen_0006c001(uint8_t const *data, size_t const data_len)
{
  return calc_crc32(/* crc_msb = */ 32, /* init = */ 0x0000, data, data_len, &lookup_FPoly0006c001);
}

#endif
