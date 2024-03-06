#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc13_interface(
  /* .name     =  */    BBC,
  /* .poly     =  */    Fx1cf5,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x04fa,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc13_Fx1cf5.h"

make_crc13_implementation(
  /* .name     =  */    BBC,
  /* .poly     =  */    Fx1cf5,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
