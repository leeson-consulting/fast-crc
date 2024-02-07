#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_KERNEL16

// CRC-16/MODBUS:
//  width   = 16-bits
//  poly    = 0x8005
//  init    = 0xffff
//  refin   = true
//  refout  = true
//  xorout  = 0x0000
//  check   = 0x4b37
//  residue = 0x0000

uint16_t crc16_modbus(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/Rx8005.h"

uint16_t crc16_modbus(uint8_t const *data, size_t const data_len)
{
  return calc_crc16(/* crc_msb = */ 0, /* init = */ 0xffff, data, data_len, &lookup_RPoly8005);
}

#endif
