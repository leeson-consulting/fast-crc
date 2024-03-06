#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc14_interface(
  /* .name     =  */    DARC,
  /* .poly     =  */    Rx0805,
  /* .init     =  */    0x0000,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x082d,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc14_Rx0805.h"

make_crc14_implementation(
  /* .name     =  */    DARC,
  /* .poly     =  */    Rx0805,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
