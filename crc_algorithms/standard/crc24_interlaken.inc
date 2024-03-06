#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc24_interface(
  /* .name     =  */    INTERLAKEN,
  /* .poly     =  */    Fx328b63,
  /* .init     =  */    0xffffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffffff,
  /* .check    =  */    0xb4f3e6,
  /* .residue  =  */    0x144e63)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc24_Fx328b63.h"

make_crc24_implementation(
  /* .name     =  */    INTERLAKEN,
  /* .poly     =  */    Fx328b63,
  /* .init     =  */    0xffffff,
  /* .xorout   =  */    0xffffff)

#endif
