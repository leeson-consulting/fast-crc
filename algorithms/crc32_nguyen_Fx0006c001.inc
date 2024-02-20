#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc32_nguyen_Fx0006c001_params = {
  .name     = "CRC-32/Nguyen_Fx0006c001",
  .width    = 32,
  .poly     = 0x0006c001,
  .init     = 0x00000000,
  .refin    = false,
  .refout   = false,
  .xorout   = 0x00000000,
  .check    = 0x1d40bcf7,
};

#endif

uint32_t crc32_nguyen_Fx0006c001(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD6/Fx0006c001.h"

uint32_t crc32_nguyen_Fx0006c001(uint8_t const *data, size_t const data_len)
{
  return crc32_Fx0006c001(/* init = */ 0x0000, data, data_len);
}

#endif
