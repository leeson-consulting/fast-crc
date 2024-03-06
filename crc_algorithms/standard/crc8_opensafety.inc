#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    OPENSAFETY,
  /* .poly     =  */    Fx2f,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x3e,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx2f.h"

make_crc8_implementation(
  /* .name     =  */    OPENSAFETY,
  /* .poly     =  */    Fx2f,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
