#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc16_ibm3740_params = {
  .name     = "CRC-16/IBM3740",
  .width    = 16,
  .poly     = 0x1021,
  .init     = 0xffff,
  .refin    = false,
  .refout   = false,
  .xorout   = 0x0000,
  .check    = 0x29b1,
  .residue  = 0x0000
};

#endif

uint16_t crc16_ibm3740(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD4/Fx1021.h"

uint16_t crc16_ibm3740(uint8_t const *data, size_t const data_len)
{
  return crc16_Fx1021(/* init = */ 0xffff, data, data_len);
}

#endif
