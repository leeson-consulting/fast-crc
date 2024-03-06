#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    XFER,
  /* .poly     =  */    Fx000000af,
  /* .init     =  */    0x00000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0xbd0be338,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Fx000000af.h"

make_crc32_implementation(
  /* .name     =  */    XFER,
  /* .poly     =  */    Fx000000af,
  /* .init     =  */    0x00000000,
  /* .xorout   =  */    0x00000000)

#endif
