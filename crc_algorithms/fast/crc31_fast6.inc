#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc31_interface(
  /* .name     =  */    Fast6,
  /* .poly     =  */    Fxc3001,
  /* .init     =  */    0x00000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0x2f32f111,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint32_t crc31_Fast6_u8(uint32_t const crc, uint8_t const data_byte)
{
  uint32_t const A = (crc >> (31 - 8)) ^ data_byte;                     //   2 ops
  uint32_t const B = (A << 19) ^ (A << 18) ^ (A << 13) ^ (A << 12) ^ A; //   8 ops
  return (B ^ (crc << 8)) & 0x7fffffff;                                 // + 3 ops
}

uint32_t crc31_Fast6_Fxc3001(uint32_t const init, uint8_t const * data, size_t data_len)
{
  uint32_t crc = init & 0x7fffffff;

  for (size_t i = 0; i < data_len; ++i) {                               //    2 ops
    crc = crc31_Fast6_u8(crc, data[i]);                                 // + 13 ops
  }                                                                     // --------
                                                                        //
  return crc;                                                           //   15 ops/u8
}

uint32_t crc31_Fast6_start(uint8_t const *data, size_t const data_len)
{
  return crc31_Fast6_Fxc3001(/* init = */ 0x000000, data, data_len);
}

uint32_t crc31_Fast6_continue(uint32_t const crc, uint8_t const *data, size_t const data_len)
{
  return crc31_Fast6_Fxc3001(crc, data, data_len);
}

uint32_t crc31_Fast6_finish(uint32_t const crc, uint8_t const *data, size_t const data_len)
{
  return crc31_Fast6_Fxc3001(crc, data, data_len);
}

uint32_t crc31_Fast6(uint8_t const *data, size_t const data_len)
{
  return crc31_Fast6_Fxc3001(/* init = */ 0x000000, data, data_len);
}

#endif
