#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc64_interface(
  /* .name     =  */    XZ,
  /* .poly     =  */    Rx42f0e1eba9ea3693,
  /* .init     =  */    0xffffffffffffffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xffffffffffffffff,
  /* .check    =  */    0x995dc9bbdf1939fa,
  /* .residue  =  */    0x49958c9abd7d353f)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc64_Rx42f0e1eba9ea3693.h"

make_crc64_implementation(
  /* .name     =  */    XZ,
  /* .poly     =  */    Rx42f0e1eba9ea3693,
  /* .init     =  */    0xffffffffffffffff,
  /* .xorout   =  */    0xffffffffffffffff)

#endif
