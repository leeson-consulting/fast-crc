#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    BZIP2,
  /* .poly     =  */    Fx04c11db7,
  /* .init     =  */    0xffffffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffffffff,
  /* .check    =  */    0xfc891918,
  /* .residue  =  */    0xc704dd7b)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Fx04c11db7.h"

make_crc32_implementation(
  /* .name     =  */    BZIP2,
  /* .poly     =  */    Fx04c11db7,
  /* .init     =  */    0xffffffff,
  /* .xorout   =  */    0xffffffff)

#endif
