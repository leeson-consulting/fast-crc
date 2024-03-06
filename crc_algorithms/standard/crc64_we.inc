#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc64_interface(
  /* .name     =  */    WE,
  /* .poly     =  */    Fx42f0e1eba9ea3693,
  /* .init     =  */    0xffffffffffffffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffffffffffffffff,
  /* .check    =  */    0x62ec59e3f1a4f00a,
  /* .residue  =  */    0xfcacbebd5931a992)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc64_Fx42f0e1eba9ea3693.h"

make_crc64_implementation(
  /* .name     =  */    WE,
  /* .poly     =  */    Fx42f0e1eba9ea3693,
  /* .init     =  */    0xffffffffffffffff,
  /* .xorout   =  */    0xffffffffffffffff)

#endif
