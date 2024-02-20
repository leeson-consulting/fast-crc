#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc16_interface(
  /* .name     =  */    MODBUS,
  /* .poly     =  */    Rx8005,
  /* .init     =  */    0xffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x4b37,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD4/Rx8005.h"

make_crc16_implementation(
  /* .name     =  */    MODBUS,
  /* .poly     =  */    Rx8005,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0x0000)

#endif
