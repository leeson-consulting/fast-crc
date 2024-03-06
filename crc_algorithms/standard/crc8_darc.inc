#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    DARC,
  /* .poly     =  */    Rx39,
  /* .init     =  */    0x00,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x15,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Rx39.h"

make_crc8_implementation(
  /* .name     =  */    DARC,
  /* .poly     =  */    Rx39,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
