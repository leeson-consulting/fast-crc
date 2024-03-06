#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc15_interface(
  /* .name     =  */    CAN,
  /* .poly     =  */    Fx4599,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x059e,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc15_Fx4599.h"

make_crc15_implementation(
  /* .name     =  */    CAN,
  /* .poly     =  */    Fx4599,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
