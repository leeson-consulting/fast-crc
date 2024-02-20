#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc16_nguyen_Fx0007_params = {
  .name     = "CRC-16/Nguyen_Fx0007",
  .width    = 16,
  .poly     = 0x0007,
  .init     = 0x0000,
  .refin    = false,
  .refout   = false,
  .xorout   = 0x0000,
  .check    = 0xef6f,
};

#endif

uint16_t crc16_nguyen_Fx0007(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD4/Fx0007.h"

uint16_t crc16_nguyen_Fx0007(uint8_t const *data, size_t const data_len)
{
  return crc16_Fx0007(/* init = */ 0x0000, data, data_len);
}

#endif
