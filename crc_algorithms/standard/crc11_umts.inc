#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc11_interface(
  /* .name     =  */    UMTS,
  /* .poly     =  */    Fx307,
  /* .init     =  */    0x000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000,
  /* .check    =  */    0x061,
  /* .residue  =  */    0x000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc11_Fx307.h"

make_crc11_implementation(
  /* .name     =  */    UMTS,
  /* .poly     =  */    Fx307,
  /* .init     =  */    0x000,
  /* .xorout   =  */    0x000)

#endif
