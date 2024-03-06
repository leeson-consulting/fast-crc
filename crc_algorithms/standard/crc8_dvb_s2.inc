#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    DVB_S2,
  /* .poly     =  */    Fxd5,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0xbc,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fxd5.h"

make_crc8_implementation(
  /* .name     =  */    DVB_S2,
  /* .poly     =  */    Fxd5,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
