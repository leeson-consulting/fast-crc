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

static inline uint32_t crc31_Fast6_u16(uint32_t crc, uint16_t const * data, size_t const data_len)
{
  uint32_t const T[16] = {
    0x00000000, 0x400c3001, 0x00145003, 0x40186002,
    0x0028a006, 0x40249007, 0x003cf005, 0x4030c004,
    0x0051400c, 0x405d700d, 0x0045100f, 0x4049200e,
    0x0079e00a, 0x4075d00b, 0x006db009, 0x40618008,
  };

  uint32_t A, A1, A2, B;

  for (size_t i = 0; i < data_len; ++i) {                               //   2 ops
    uint16_t const item = ensure_be16(data[i]);                         //   1 op on little-endian platforms
    A = (crc >> (31 - 16)) ^ item;                                      //   2 ops
    A1 = A >> 12;                                                       //   1 op
    A2 = A & 0xfff;                                                     //   1 op
    B = T[A1] ^ (A2 << 19) ^ (A2 << 18) ^ (A << 13) ^ (A << 12) ^ A;    //   9 ops
    crc = (B ^ (crc << 16)) & 0x7fffffff;                               // + 3 ops
  }                                                                     // -------
                                                                        //  19    ops/u16
  return crc;                                                           //   9.5  ops/u8
}

uint32_t crc31_Fast6_Fxc3001(uint32_t const init, uint8_t const * data, size_t data_len)
{
  uint32_t crc = init & 0x7fffffff;

  // 1. Process unaligned data prefix if necessary at a cost of 13 ops

  if (data_len > 0 && (uintptr_t) data % sizeof(uint16_t) != 0) {
    crc = crc31_Fast6_u8(crc, *data);
    data++;
    data_len--;
  }

  if (data_len == 0) {
    return crc;
  }

  // 2. Process u16 aligned data at a cost of 9.5 ops / u8

  crc = crc31_Fast6_u16(crc, (uint16_t const *) data, data_len / sizeof(uint16_t));

  if (data_len % sizeof(uint16_t) == 0) {
    return crc;
  }

  // 3. Process unaligned data suffix if necessary at a cost of 13 ops

  return crc31_Fast6_u8(crc, data[data_len - 1]);
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
