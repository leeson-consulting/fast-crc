#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc16_interface(
  /* .name     =  */    Nguyen_Fx0007,
  /* .poly     =  */    Fx0007,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0xef6f,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/sharded/crc16_Fx0007.h"

make_crc16_implementation(
  /* .name     =  */    Nguyen_Fx0007,
  /* .poly     =  */    Fx0007,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
