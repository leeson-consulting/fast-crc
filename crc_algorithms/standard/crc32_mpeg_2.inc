#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    MPEG_2,
  /* .poly     =  */    Fx04c11db7,
  /* .init     =  */    0xffffffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0x0376e6e7,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Fx04c11db7.h"

make_crc32_implementation(
  /* .name     =  */    MPEG_2,
  /* .poly     =  */    Fx04c11db7,
  /* .init     =  */    0xffffffff,
  /* .xorout   =  */    0x00000000)

#endif
