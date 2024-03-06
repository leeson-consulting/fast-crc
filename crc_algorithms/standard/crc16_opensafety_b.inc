#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    OPENSAFETY_B,
  /* .poly     =  */    Fx755b,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x20fe,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx755b.h"

make_crc16_implementation(
  /* .name     =  */    OPENSAFETY_B,
  /* .poly     =  */    Fx755b,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
