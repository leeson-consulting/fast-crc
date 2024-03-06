#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc31_interface(
  /* .name     =  */    PHILIPS,
  /* .poly     =  */    Fx04c11db7,
  /* .init     =  */    0x7fffffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x7fffffff,
  /* .check    =  */    0x0ce9e46c,
  /* .residue  =  */    0x4eaf26f1)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc31_Fx04c11db7.h"

make_crc31_implementation(
  /* .name     =  */    PHILIPS,
  /* .poly     =  */    Fx04c11db7,
  /* .init     =  */    0x7fffffff,
  /* .xorout   =  */    0x7fffffff)

#endif
