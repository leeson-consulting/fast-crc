#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc11_interface(
  /* .name     =  */    FLEXRAY,
  /* .poly     =  */    Fx385,
  /* .init     =  */    0x01a,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000,
  /* .check    =  */    0x5a3,
  /* .residue  =  */    0x000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc11_Fx385.h"

make_crc11_implementation(
  /* .name     =  */    FLEXRAY,
  /* .poly     =  */    Fx385,
  /* .init     =  */    0x01a,
  /* .xorout   =  */    0x000)

#endif
