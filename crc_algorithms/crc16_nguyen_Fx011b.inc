#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc16_interface(
  /* .name     =  */    Nguyen_Fx011b,
  /* .poly     =  */    Fx011b,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x8d1c,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/research/crc16_Fx011b.h"

make_crc16_implementation(
  /* .name     =  */    Nguyen_Fx011b,
  /* .poly     =  */    Fx011b,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
