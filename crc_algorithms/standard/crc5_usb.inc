#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc5_interface(
  /* .name     =  */    USB,
  /* .poly     =  */    Rx05,
  /* .init     =  */    0x1f,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x1f,
  /* .check    =  */    0x19,
  /* .residue  =  */    0x06)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc5_Rx05.h"

make_crc5_implementation(
  /* .name     =  */    USB,
  /* .poly     =  */    Rx05,
  /* .init     =  */    0x1f,
  /* .xorout   =  */    0x1f)

#endif
