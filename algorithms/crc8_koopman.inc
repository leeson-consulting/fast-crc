#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc8_koopman_params = {
  .name     = "CRC-8/Koopman",
  .width    = 8,
  .poly     = 0x4d,
  .init     = 0xff,
  .refin    = true,
  .refout   = true,
  .xorout   = 0xff,
  .check    = 0xd8
};

#endif

//  See also:
//
//  http://www.ece.cmu.edu/~koopman/roses/dsn04/koopman04_crc_poly_embedded.pdf
//  https://stackoverflow.com/a/51748961

uint8_t crc8_koopman(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD4/Rx4d.h"

uint8_t crc8_koopman(uint8_t const *data, size_t const data_len)
{
  return crc8_Rx4d(/* init = */ 0xff, data, data_len) ^ /* xorout = */ 0xff;
}

#endif
