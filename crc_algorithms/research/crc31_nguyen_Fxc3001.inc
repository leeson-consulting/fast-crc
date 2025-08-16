#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc31_interface(
  /* .name     =  */    Nguyen_Fxc3001,
  /* .poly     =  */    Fxc3001,
  /* .init     =  */    0x00000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0x2f32f111,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/research/crc31_Fxc3001.h"

make_crc31_implementation(
  /* .name     =  */    Nguyen_Fxc3001,
  /* .poly     =  */    Fxc3001,
  /* .init     =  */    0x00000000,
  /* .xorout   =  */    0x00000000)

#endif
