#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc64_fast6_params = {
  .name     = "CRC-64/Fast6",
  .width    = 64,
  .poly     = 0x000000000000002f,
  .init     = 0x0000000000000000,
  .refin    = false,
  .refout   = false,
  .xorout   = 0x0000000000000000,
  .check    = 0x4966ab84f5dba52f,
};

#endif

uint64_t crc64_fast6_init(uint64_t const init, uint8_t const * data, size_t const data_len);

uint64_t crc64_fast6(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint64_t crc64_fast6_u8(uint64_t const crc, uint8_t const data_byte)
{
  uint64_t const A = (crc >> (64 - 8)) ^ data_byte;                     //   2 ops
  uint64_t const B = (A << 5) ^ (A << 3) ^ (A << 2) ^ (A << 1) ^ A;     //   8 ops
  return B ^ (crc << 8);                                                //   2 ops
}

static inline uint64_t crc64_fast6_u32(uint64_t crc, uint32_t const * data, size_t const data_len)
{
  for (size_t i = 0; i < data_len; ++i) {                               //   2 ops
    uint32_t const item = ensure_be32(data[i]);                         //   1 op on little-endian platforms
    uint64_t const A = (crc >> (64 - 32)) ^ item;                       //   2 ops
    uint64_t const B = (A << 5) ^ (A << 3) ^ (A << 2) ^ (A << 1) ^ A;   //   8 ops
    crc = B ^ (crc << 32);                                              //   2 ops
  }                                                                     // -------
                                                                        //  15    ops/u32
  return crc;                                                           //   3.75 ops/u8
}

uint64_t crc64_fast6_init(uint64_t const init, uint8_t const * data, size_t data_len)
{
  uint64_t crc = init;

  // 1. Process unaligned data prefix if necessary at a cost of 12 ops/u8

  while ((uintptr_t) data % sizeof(uint32_t) != 0) {
    crc = crc64_fast6_u8(crc, *data);
    data++;
    data_len--;
  }

  if (data_len == 0) {
    return crc;
  }

  // 2. Process u32 aligned data at a cost of 3.75 ops/u8

  crc = crc64_fast6_u32(crc, (uint32_t const *) data, data_len / sizeof(uint32_t));

  size_t const data_suffix_len = data_len % sizeof(uint32_t);

  if (data_suffix_len == 0) {
    return crc;
  }

  // 3. Process unaligned data suffix if necessary at a cost of 12 ops/u8

  data += data_len - data_suffix_len;
  data_len = data_suffix_len;

  while (data_len > 0) {
    crc = crc64_fast6_u8(crc, *data);
    data++;
    data_len--;
  }

  return crc;
}

uint64_t crc64_fast6(uint8_t const * data, size_t data_len)
{
  return crc64_fast6_init(/* init = */ 0x0000000000000000, data, data_len);
}

#endif
