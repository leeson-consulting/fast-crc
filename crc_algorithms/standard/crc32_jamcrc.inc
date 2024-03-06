#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    JAMCRC,
  /* .poly     =  */    Rx04c11db7,
  /* .init     =  */    0xffffffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0x340bc6d9,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Rx04c11db7.h"

make_crc32_implementation(
  /* .name     =  */    JAMCRC,
  /* .poly     =  */    Rx04c11db7,
  /* .init     =  */    0xffffffff,
  /* .xorout   =  */    0x00000000)

#endif
