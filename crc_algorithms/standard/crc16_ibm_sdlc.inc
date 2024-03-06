#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    IBM_SDLC,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0xffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xffff,
  /* .check    =  */    0x906e,
  /* .residue  =  */    0xf0b8)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx1021.h"

make_crc16_implementation(
  /* .name     =  */    IBM_SDLC,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0xffff)

#endif
