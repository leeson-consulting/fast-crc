#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-64/XZ:
//  width   = 64-bits
//  poly    = 42f0e1eba9ea3693
//  init    = 0xffffffffffffffff
//  refin   = true
//  refout  = true
//  xorout  = 0xffffffffffffffff
//  check   = 0x995dc9bbdf1939fa
//  residue = 0x49958c9abd7d353f

uint64_t crc64_xz(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Rx42f0e1eba9ea3693.h"

uint64_t crc64_xz(uint8_t const *data, size_t const data_len)
{
  return crc64_Rx42f0e1eba9ea3693(/* init = */ 0xffffffffffffffff, data, data_len) ^ /* xorout = */ 0xffffffffffffffff;
}

#endif
