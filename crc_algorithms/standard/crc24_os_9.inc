#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc24_interface(
  /* .name     =  */    OS_9,
  /* .poly     =  */    Fx800063,
  /* .init     =  */    0xffffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffffff,
  /* .check    =  */    0x200fa5,
  /* .residue  =  */    0x800fe3)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc24_Fx800063.h"

make_crc24_implementation(
  /* .name     =  */    OS_9,
  /* .poly     =  */    Fx800063,
  /* .init     =  */    0xffffff,
  /* .xorout   =  */    0xffffff)

#endif
