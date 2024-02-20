#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

#if defined(UNIT_TESTS)

static const crc_parameters_t
crc16_modbus_params = {
  .name     = "CRC-16/MODBUS",
  .width    = 16,
  .poly     = 0x8005,
  .init     = 0xffff,
  .refin    = true,
  .refout   = true,
  .xorout   = 0x0000,
  .check    = 0x4b37,
  .residue  = 0x0000
};

#endif

uint16_t crc16_modbus(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD4/Rx8005.h"

uint16_t crc16_modbus(uint8_t const *data, size_t const data_len)
{
  return crc16_Rx8005(/* init = */ 0xffff, data, data_len);
}

#endif
