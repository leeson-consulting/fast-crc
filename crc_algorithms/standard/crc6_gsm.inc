#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc6_interface(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx2f,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x3f,
  /* .check    =  */    0x13,
  /* .residue  =  */    0x3a)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc6_Fx2f.h"

make_crc6_implementation(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx2f,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x3f)

#endif
