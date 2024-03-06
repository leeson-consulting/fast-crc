#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc64_interface(
  /* .name     =  */    ECMA_182,
  /* .poly     =  */    Fx42f0e1eba9ea3693,
  /* .init     =  */    0x0000000000000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000000000000000,
  /* .check    =  */    0x6c40df5f0b497347,
  /* .residue  =  */    0x0000000000000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc64_Fx42f0e1eba9ea3693.h"

make_crc64_implementation(
  /* .name     =  */    ECMA_182,
  /* .poly     =  */    Fx42f0e1eba9ea3693,
  /* .init     =  */    0x0000000000000000,
  /* .xorout   =  */    0x0000000000000000)

#endif
