#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc7_interface(
  /* .name     =  */    MMC,
  /* .poly     =  */    Fx09,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x75,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc7_Fx09.h"

make_crc7_implementation(
  /* .name     =  */    MMC,
  /* .poly     =  */    Fx09,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
