#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc24_interface(
  /* .name     =  */    FLEXRAY_B,
  /* .poly     =  */    Fx5d6dcb,
  /* .init     =  */    0xabcdef,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000000,
  /* .check    =  */    0x1f23b8,
  /* .residue  =  */    0x000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc24_Fx5d6dcb.h"

make_crc24_implementation(
  /* .name     =  */    FLEXRAY_B,
  /* .poly     =  */    Fx5d6dcb,
  /* .init     =  */    0xabcdef,
  /* .xorout   =  */    0x000000)

#endif
