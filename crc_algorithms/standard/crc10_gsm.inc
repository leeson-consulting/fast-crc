#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc10_interface(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx175,
  /* .init     =  */    0x000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x3ff,
  /* .check    =  */    0x12a,
  /* .residue  =  */    0x0c6)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc10_Fx175.h"

make_crc10_implementation(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx175,
  /* .init     =  */    0x000,
  /* .xorout   =  */    0x3ff)

#endif
