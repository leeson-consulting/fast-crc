#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    Fast6,
  /* .poly     =  */    Fx0006c001,
  /* .init     =  */    0x00000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0x1d40bcf7,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint32_t crc32_Fast6_u8(uint32_t const crc, uint8_t const data_byte)
{
  uint32_t const A = (crc >> (32 - 8)) ^ data_byte;                     //   2 ops
  uint32_t const B = (A << 18) ^ (A << 17) ^ (A << 15) ^ (A << 14) ^ A; //   8 ops
  return B ^ (crc << 8);                                                // + 2 ops
}

static inline uint32_t crc32_Fast6_u16(uint32_t crc, uint16_t const * data, size_t const data_len)
{
  uint32_t const T[4] = {0x00000000, 0x8006c001, 0x000b4003, 0x800d8002};
  uint32_t A, A1, A2, B;

  for (size_t i = 0; i < data_len; ++i) {                               //   2 ops
    uint16_t const item = ensure_be16(data[i]);                         //   1 op on little-endian platforms
    A = (crc >> (32 - 16)) ^ item;                                      //   2 ops
    A1 = A >> 14;                                                       //   1 op
    A2 = A & 0x3fff;                                                    //   1 op
    B = T[A1] ^ (A2 << 18) ^ (A2 << 17) ^ (A << 15) ^ (A << 14) ^ A;    //   9 ops
    crc = B ^ (crc << 16);                                              // + 2 ops
  }                                                                     // -------
                                                                        //  18 ops/u16
  return crc;                                                           //   9 ops/u8
}

uint32_t crc32_Fast6_Fx0006c001(uint32_t const init, uint8_t const * data, size_t data_len)
{
  uint32_t crc = init;

  // 1. Process unaligned data prefix if necessary at a cost of 12 ops

  if (data_len > 0 && (uintptr_t) data % sizeof(uint16_t) != 0) {
    crc = crc32_Fast6_u8(crc, *data);
    data++;
    data_len--;
  }

  if (data_len == 0) {
    return crc;
  }

  // 2. Process u16 aligned data at a cost of 9 ops / u8

  crc = crc32_Fast6_u16(crc, (uint16_t const *) data, data_len / sizeof(uint16_t));

  if (data_len % sizeof(uint16_t) == 0) {
    return crc;
  }

  // 3. Process unaligned data suffix if necessary at a cost of 12 ops

  return crc32_Fast6_u8(crc, data[data_len - 1]);
}

uint32_t crc32_Fast6_start(uint8_t const *data, size_t const data_len)
{
  return crc32_Fast6_Fx0006c001(/* init = */ 0x00000000, data, data_len);
}

uint32_t crc32_Fast6_continue(uint32_t const crc, uint8_t const *data, size_t const data_len)
{
  return crc32_Fast6_Fx0006c001(crc, data, data_len);
}

uint32_t crc32_Fast6_finish(uint32_t const crc, uint8_t const *data, size_t const data_len)
{
  return crc32_Fast6_Fx0006c001(crc, data, data_len);
}

uint32_t crc32_Fast6(uint8_t const *data, size_t const data_len)
{
  return crc32_Fast6_Fx0006c001(/* init = */ 0x00000000, data, data_len);
}

#endif
