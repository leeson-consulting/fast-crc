#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc8_fast4_params = {
  .name     = "CRC-8/Fast4",
  .width    = 8,
  .poly     = 0x07,
  .init     = 0x00,
  .refin    = false,
  .refout   = false,
  .xorout   = 0x00,
  .check    = 0xf4
};

#endif

uint8_t crc8_fast4_init(uint8_t const init, uint8_t const * data, size_t const data_len);

uint8_t crc8_fast4(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

uint8_t crc8_fast4_init(uint8_t const init, uint8_t const * data, size_t const data_len)
{
  uint8_t crc = init;
  uint8_t const FPoly07 = 0x07; // X^8 + X^2 + X + 1
  uint8_t const K = 0x80; // K = 2^(h - 1) , h = s = 8

  uint8_t A, C;

  for (size_t i = 0; i < data_len; ++i) {
    A = crc ^ data[i];

    if ((A & K) != 0) {
      C = (A << 1) ^ FPoly07;
    } else {
      C = A << 1;
    }

    if ((C & K) != 0) {
      crc = (C << 1) ^ FPoly07;
    } else {
      crc = C << 1;
    }

    crc = crc ^ C ^ A;
  }

  return crc;
}

uint8_t crc8_fast4(uint8_t const * data, size_t const data_len)
{
  return crc8_fast4_init(/* init = */ 0x00, data, data_len);
}

#endif
