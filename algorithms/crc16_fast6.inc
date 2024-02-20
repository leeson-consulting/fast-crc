#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc16_fast6_params = {
  .name     = "CRC-16/Fast6",
  .width    = 16,
  .poly     = 0x011b,
  .init     = 0x0000,
  .refin    = false,
  .refout   = false,
  .xorout   = 0x0000,
  .check    = 0x8d1c,
};

#endif

uint16_t crc16_fast6_init(uint16_t const init, uint8_t const * data, size_t data_len);

uint16_t crc16_fast6(uint8_t const * data, size_t data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint16_t crc16_fast6_u8(uint16_t crc, uint8_t const data_byte)
{
  uint16_t const A = (crc >> (16 - 8)) ^ data_byte;                     //   2 ops
  uint16_t const B = (A << 8) ^ (A << 4) ^ (A << 3) ^ (A << 1) ^ A;     //   8 ops
  return B ^ (crc << 8);                                                //   2 ops
}

uint16_t crc16_fast6_init(uint16_t const init, uint8_t const * data, size_t data_len)
{
  uint16_t crc = init;

  for (size_t i = 0; i < data_len; ++i) {                               //    2 ops
    crc = crc16_fast6_u8(crc, data[i]);                                 // + 13 ops
  }                                                                     // --------
                                                                        //
  return crc;                                                           //   15 ops/u8
}

uint16_t crc16_fast6(uint8_t const * data, size_t data_len)
{
  return crc16_fast6_init(/* init = */ 0x0000, data, data_len);
}

#endif
