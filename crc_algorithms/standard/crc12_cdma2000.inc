#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc12_interface(
  /* .name     =  */    CDMA2000,
  /* .poly     =  */    Fxf13,
  /* .init     =  */    0xfff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000,
  /* .check    =  */    0xd4d,
  /* .residue  =  */    0x000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc12_Fxf13.h"

make_crc12_implementation(
  /* .name     =  */    CDMA2000,
  /* .poly     =  */    Fxf13,
  /* .init     =  */    0xfff,
  /* .xorout   =  */    0x000)

#endif
