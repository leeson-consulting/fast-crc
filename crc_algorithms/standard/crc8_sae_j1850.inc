#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    SAE_J1850,
  /* .poly     =  */    Fx1d,
  /* .init     =  */    0xff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xff,
  /* .check    =  */    0x4b,
  /* .residue  =  */    0xc4)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx1d.h"

make_crc8_implementation(
  /* .name     =  */    SAE_J1850,
  /* .poly     =  */    Fx1d,
  /* .init     =  */    0xff,
  /* .xorout   =  */    0xff)

#endif
