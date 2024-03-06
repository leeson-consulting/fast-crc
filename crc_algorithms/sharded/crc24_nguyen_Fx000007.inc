#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc24_interface(
  /* .name     =  */    Nguyen_Fx000007,
  /* .poly     =  */    Fx000007,
  /* .init     =  */    0x000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000000,
  /* .check    =  */    0x921774,
  /* .residue  =  */    0x000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/sharded/crc24_Fx000007.h"

make_crc24_implementation(
  /* .name     =  */    Nguyen_Fx000007,
  /* .poly     =  */    Fx000007,
  /* .init     =  */    0x000000,
  /* .xorout   =  */    0x000000)

#endif
