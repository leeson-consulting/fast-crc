#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc4_interface(
  /* .name     =  */    G_704,
  /* .poly     =  */    Rx3,
  /* .init     =  */    0x0,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0,
  /* .check    =  */    0x7,
  /* .residue  =  */    0x0)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc4_Rx3.h"

make_crc4_implementation(
  /* .name     =  */    G_704,
  /* .poly     =  */    Rx3,
  /* .init     =  */    0x0,
  /* .xorout   =  */    0x0)

#endif
