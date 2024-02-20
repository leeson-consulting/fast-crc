#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc32_hdlc_params = {
  .name     = "CRC-32/ISO-HDLC",
  .width    = 32,
  .poly     = 0x04c11db7,
  .init     = 0xffffffff,
  .refin    = true,
  .refout   = true,
  .xorout   = 0xffffffff,
  .check    = 0xcbf43926,
  .residue  = 0xdebb20e3
};

#endif

uint32_t crc32_hdlc(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD8+/Rx04c11db7.h"

uint32_t crc32_hdlc(uint8_t const *data, size_t const data_len)
{
  return crc32_Rx04c11db7(/* init = */ 0xffffffff, data, data_len) ^ /* xorout = */ 0xffffffff;
}

#endif
