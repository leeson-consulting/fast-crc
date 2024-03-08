#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    Fast6,
  /* .poly     =  */    Fx011b,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x8d1c,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint16_t crc16_Fast6_u8(uint16_t crc, uint8_t const data_byte)
{
  uint16_t const A = (crc >> (16 - 8)) ^ data_byte;                     //   2 ops
  uint16_t const B = (A << 8) ^ (A << 4) ^ (A << 3) ^ (A << 1) ^ A;     //   8 ops
  return B ^ (crc << 8);                                                //   2 ops
}

uint16_t crc16_Fast6_Fx011b(uint16_t crc, uint8_t const * data, size_t data_len)
{
  for (size_t i = 0; i < data_len; ++i) {                               //    2 ops
    crc = crc16_Fast6_u8(crc, data[i]);                                 // + 13 ops
  }                                                                     // --------
                                                                        //
  return crc;                                                           //   15 ops/u8
}

uint16_t crc16_Fast6_start(uint8_t const *data, size_t const data_len)
{
  return crc16_Fast6_Fx011b(/* init = */ 0x0000, data, data_len);
}

uint16_t crc16_Fast6_continue(uint16_t const crc, uint8_t const *data, size_t const data_len)
{
  return crc16_Fast6_Fx011b(crc, data, data_len);
}

uint16_t crc16_Fast6_finish(uint16_t const crc, uint8_t const *data, size_t const data_len)
{
  return crc16_Fast6_Fx011b(crc, data, data_len);
}

uint16_t crc16_Fast6(uint8_t const *data, size_t const data_len)
{
  return crc16_Fast6_Fx011b(/* init = */ 0x0000, data, data_len);
}

#endif
