#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc64_xz_params = {
  .name     = "CRC-64/XZ",
  .width    = 64,
  .poly     = 0x42f0e1eba9ea3693,
  .init     = 0xffffffffffffffff,
  .refin    = true,
  .refout   = true,
  .xorout   = 0xffffffffffffffff,
  .check    = 0x995dc9bbdf1939fa,
  .residue  = 0x49958c9abd7d353f
};

#endif

uint64_t crc64_xz(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD8+/Rx42f0e1eba9ea3693.h"

uint64_t crc64_xz(uint8_t const *data, size_t const data_len)
{
  return crc64_Rx42f0e1eba9ea3693(/* init = */ 0xffffffffffffffff, data, data_len) ^ /* xorout = */ 0xffffffffffffffff;
}

#endif
