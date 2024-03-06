#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc4_interface(
  /* .name     =  */    INTERLAKEN,
  /* .poly     =  */    Fx3,
  /* .init     =  */    0xf,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xf,
  /* .check    =  */    0xb,
  /* .residue  =  */    0x2)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc4_Fx3.h"

make_crc4_implementation(
  /* .name     =  */    INTERLAKEN,
  /* .poly     =  */    Fx3,
  /* .init     =  */    0xf,
  /* .xorout   =  */    0xf)

#endif
