#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc6_interface(
  /* .name     =  */    CDMA2000_B,
  /* .poly     =  */    Fx07,
  /* .init     =  */    0x3f,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x3b,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc6_Fx07.h"

make_crc6_implementation(
  /* .name     =  */    CDMA2000_B,
  /* .poly     =  */    Fx07,
  /* .init     =  */    0x3f,
  /* .xorout   =  */    0x00)

#endif
