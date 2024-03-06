#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    LTE,
  /* .poly     =  */    Fx9b,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0xea,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx9b.h"

make_crc8_implementation(
  /* .name     =  */    LTE,
  /* .poly     =  */    Fx9b,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
