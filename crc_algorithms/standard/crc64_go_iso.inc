#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc64_interface(
  /* .name     =  */    GO_ISO,
  /* .poly     =  */    Rx000000000000001b,
  /* .init     =  */    0xffffffffffffffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xffffffffffffffff,
  /* .check    =  */    0xb90956c775a41001,
  /* .residue  =  */    0x5300000000000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc64_Rx000000000000001b.h"

make_crc64_implementation(
  /* .name     =  */    GO_ISO,
  /* .poly     =  */    Rx000000000000001b,
  /* .init     =  */    0xffffffffffffffff,
  /* .xorout   =  */    0xffffffffffffffff)

#endif
