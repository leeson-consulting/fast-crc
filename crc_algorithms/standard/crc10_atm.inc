#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc10_interface(
  /* .name     =  */    ATM,
  /* .poly     =  */    Fx233,
  /* .init     =  */    0x000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000,
  /* .check    =  */    0x199,
  /* .residue  =  */    0x000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc10_Fx233.h"

make_crc10_implementation(
  /* .name     =  */    ATM,
  /* .poly     =  */    Fx233,
  /* .init     =  */    0x000,
  /* .xorout   =  */    0x000)

#endif
