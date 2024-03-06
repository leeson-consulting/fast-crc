#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc10_interface(
  /* .name     =  */    CDMA2000,
  /* .poly     =  */    Fx3d9,
  /* .init     =  */    0x3ff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000,
  /* .check    =  */    0x233,
  /* .residue  =  */    0x000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc10_Fx3d9.h"

make_crc10_implementation(
  /* .name     =  */    CDMA2000,
  /* .poly     =  */    Fx3d9,
  /* .init     =  */    0x3ff,
  /* .xorout   =  */    0x000)

#endif
