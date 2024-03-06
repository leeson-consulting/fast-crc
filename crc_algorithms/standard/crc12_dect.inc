#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc12_interface(
  /* .name     =  */    DECT,
  /* .poly     =  */    Fx80f,
  /* .init     =  */    0x000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000,
  /* .check    =  */    0xf5b,
  /* .residue  =  */    0x000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc12_Fx80f.h"

make_crc12_implementation(
  /* .name     =  */    DECT,
  /* .poly     =  */    Fx80f,
  /* .init     =  */    0x000,
  /* .xorout   =  */    0x000)

#endif
