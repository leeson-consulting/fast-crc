#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    Nguyen_Fx07,
  /* .poly     =  */    Fx07,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0xf4,
  /* .residue  =  */    0xBaaDf00d)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/sharded/crc8_Fx07.h"

make_crc8_implementation(
  /* .name     =  */    Nguyen_Fx07,
  /* .poly     =  */    Fx07,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
