#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc30_interface(
  /* .name     =  */    CDMA,
  /* .poly     =  */    Fx2030b9c7,
  /* .init     =  */    0x3fffffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x3fffffff,
  /* .check    =  */    0x04c34abf,
  /* .residue  =  */    0x34efa55a)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc30_Fx2030b9c7.h"

make_crc30_implementation(
  /* .name     =  */    CDMA,
  /* .poly     =  */    Fx2030b9c7,
  /* .init     =  */    0x3fffffff,
  /* .xorout   =  */    0x3fffffff)

#endif
