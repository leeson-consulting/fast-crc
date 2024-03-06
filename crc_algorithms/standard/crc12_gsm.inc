#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc12_interface(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fxd31,
  /* .init     =  */    0x000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xfff,
  /* .check    =  */    0xb34,
  /* .residue  =  */    0x178)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc12_Fxd31.h"

make_crc12_implementation(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fxd31,
  /* .init     =  */    0x000,
  /* .xorout   =  */    0xfff)

#endif
