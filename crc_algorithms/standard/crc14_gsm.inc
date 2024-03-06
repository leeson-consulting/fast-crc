#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc14_interface(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx202d,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x3fff,
  /* .check    =  */    0x30ae,
  /* .residue  =  */    0x031e)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc14_Fx202d.h"

make_crc14_implementation(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx202d,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x3fff)

#endif
