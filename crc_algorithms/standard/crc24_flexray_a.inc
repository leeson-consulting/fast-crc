#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc24_interface(
  /* .name     =  */    FLEXRAY_A,
  /* .poly     =  */    Fx5d6dcb,
  /* .init     =  */    0xfedcba,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000000,
  /* .check    =  */    0x7979bd,
  /* .residue  =  */    0x000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc24_Fx5d6dcb.h"

make_crc24_implementation(
  /* .name     =  */    FLEXRAY_A,
  /* .poly     =  */    Fx5d6dcb,
  /* .init     =  */    0xfedcba,
  /* .xorout   =  */    0x000000)

#endif
