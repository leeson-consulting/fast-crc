#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    DECT_X,
  /* .poly     =  */    Fx0589,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x007f,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx0589.h"

make_crc16_implementation(
  /* .name     =  */    DECT_X,
  /* .poly     =  */    Fx0589,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
