#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc24_interface(
  /* .name     =  */    Fast4,
  /* .poly     =  */    Fx000007,
  /* .init     =  */    0x000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000000,
  /* .check    =  */    0x921774,
  /* .residue  =  */    0x000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint32_t crc24_Fast4_u8(uint32_t const crc, uint8_t const data_byte)
{
  uint32_t const A = (crc >> (24 - 8)) ^ data_byte;                     //   2 ops
  uint32_t const B = (A << 2) ^ (A << 1) ^ A;                           //   4 ops
  return (B ^ (crc << 8)) & 0xffffff;                                   // + 3 ops
}

uint32_t crc24_Fast4_Fx000007(uint32_t const init, uint8_t const * data, size_t data_len)
{
  uint32_t crc = init & 0xffffff;

  for (size_t i = 0; i < data_len; ++i) {                               //    2 ops
    crc = crc24_Fast4_u8(crc, data[i]);                                 // + 13 ops
  }                                                                     // --------
                                                                        //
  return crc;                                                           //   15 ops/u8
}

make_crc24_implementation(
  /* .name     =  */    Fast4,
  /* .poly     =  */    Fx000007,
  /* .init     =  */    0x000000,
  /* .xorout   =  */    0x000000)

#endif
