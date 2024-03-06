#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    BASE91_D,
  /* .poly     =  */    Rxa833982b,
  /* .init     =  */    0xffffffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xffffffff,
  /* .check    =  */    0x87315576,
  /* .residue  =  */    0x45270551)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Rxa833982b.h"

make_crc32_implementation(
  /* .name     =  */    BASE91_D,
  /* .poly     =  */    Rxa833982b,
  /* .init     =  */    0xffffffff,
  /* .xorout   =  */    0xffffffff)

#endif
