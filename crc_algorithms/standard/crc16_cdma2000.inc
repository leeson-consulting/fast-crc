#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    CDMA2000,
  /* .poly     =  */    Fxc867,
  /* .init     =  */    0xffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x4c06,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fxc867.h"

make_crc16_implementation(
  /* .name     =  */    CDMA2000,
  /* .poly     =  */    Fxc867,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0x0000)

#endif
