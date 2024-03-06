#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc64_interface(
  /* .name     =  */    MS,
  /* .poly     =  */    Rx259c84cba6426349,
  /* .init     =  */    0xffffffffffffffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000000000000000,
  /* .check    =  */    0x75d4b74f024eceea,
  /* .residue  =  */    0x0000000000000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc64_Rx259c84cba6426349.h"

make_crc64_implementation(
  /* .name     =  */    MS,
  /* .poly     =  */    Rx259c84cba6426349,
  /* .init     =  */    0xffffffffffffffff,
  /* .xorout   =  */    0x0000000000000000)

#endif
