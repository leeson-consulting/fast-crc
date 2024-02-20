#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc8_nguyen_Fx07_params = {
  .name     = "CRC-8/Nguyen_Fx07",
  .width    = 8,
  .poly     = 0x07,
  .init     = 0x00,
  .refin    = false,
  .refout   = false,
  .xorout   = 0x00,
  .check    = 0xf4
};

#endif

uint8_t crc8_nguyen_Fx07(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD4/Fx07.h"

uint8_t crc8_nguyen_Fx07(uint8_t const *data, size_t const data_len)
{
  return crc8_Fx07(/* init = */ 0x00, data, data_len);
}

#endif
