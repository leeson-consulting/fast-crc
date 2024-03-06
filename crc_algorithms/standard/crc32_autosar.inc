#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    AUTOSAR,
  /* .poly     =  */    Rxf4acfb13,
  /* .init     =  */    0xffffffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xffffffff,
  /* .check    =  */    0x1697d06a,
  /* .residue  =  */    0x904cddbf)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Rxf4acfb13.h"

make_crc32_implementation(
  /* .name     =  */    AUTOSAR,
  /* .poly     =  */    Rxf4acfb13,
  /* .init     =  */    0xffffffff,
  /* .xorout   =  */    0xffffffff)

#endif
