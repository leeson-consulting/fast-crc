#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

// CRC-12/UMTS is a special case with .refin != .refout
// This means that the CRC value needs reversed prior to return.
// AFAIK, no other CRC algorithms require this.
//
// So instead of defining an entire family implementation macros for one case,
// CRC-12/umts is implemented explicitly below.
//

make_crc12_interface(
  /* .name     =  */    UMTS,
  /* .poly     =  */    Fx80f,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x000,
  /* .check    =  */    0xdaf,
  /* .residue  =  */    0x000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc12_Fx80f.h"

uint16_t crc12_UMTS_start(uint8_t const *data, size_t const data_len)
{
  return crc12_Fx80f(/* init = */ 0x000, data, data_len);
}

uint16_t crc12_UMTS_continue(uint16_t const crc, uint8_t const *data, size_t const data_len)
{
  return crc12_Fx80f(crc, data, data_len);
}

uint16_t crc12_UMTS_finish(uint16_t const crc, uint8_t const *data, size_t const data_len)
{
  return bit_reverse_16(crc12_Fx80f(crc, data, data_len)) >> 4;
}

uint16_t crc12_UMTS(uint8_t const *data, size_t const data_len)
{
  return crc12_UMTS_finish(/* init = */ 0x000, data, data_len);
}

#endif
