#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    WCDMA,
  /* .poly     =  */    Rx9b,
  /* .init     =  */    0x00,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x25,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Rx9b.h"

make_crc8_implementation(
  /* .name     =  */    WCDMA,
  /* .poly     =  */    Rx9b,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
