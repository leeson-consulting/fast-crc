#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc15_interface(
  /* .name     =  */    MPT1327,
  /* .poly     =  */    Fx6815,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0001,
  /* .check    =  */    0x2566,
  /* .residue  =  */    0x6815)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc15_Fx6815.h"

make_crc15_implementation(
  /* .name     =  */    MPT1327,
  /* .poly     =  */    Fx6815,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0001)

#endif
