#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    AIXM,
  /* .poly     =  */    Fx814141ab,
  /* .init     =  */    0x00000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0x3010bf7f,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Fx814141ab.h"

make_crc32_implementation(
  /* .name     =  */    AIXM,
  /* .poly     =  */    Fx814141ab,
  /* .init     =  */    0x00000000,
  /* .xorout   =  */    0x00000000)

#endif
