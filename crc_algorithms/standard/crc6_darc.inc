#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc6_interface(
  /* .name     =  */    DARC,
  /* .poly     =  */    Rx19,
  /* .init     =  */    0x00,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x26,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc6_Rx19.h"

make_crc6_implementation(
  /* .name     =  */    DARC,
  /* .poly     =  */    Rx19,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
