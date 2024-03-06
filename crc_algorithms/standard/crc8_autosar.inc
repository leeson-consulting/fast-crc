#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    AUTOSAR,
  /* .poly     =  */    Fx2f,
  /* .init     =  */    0xff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xff,
  /* .check    =  */    0xdf,
  /* .residue  =  */    0x42)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx2f.h"

make_crc8_implementation(
  /* .name     =  */    AUTOSAR,
  /* .poly     =  */    Fx2f,
  /* .init     =  */    0xff,
  /* .xorout   =  */    0xff)

#endif
