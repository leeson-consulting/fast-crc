#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    EN_13757,
  /* .poly     =  */    Fx3d65,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffff,
  /* .check    =  */    0xc2b7,
  /* .residue  =  */    0xa366)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx3d65.h"

make_crc16_implementation(
  /* .name     =  */    EN_13757,
  /* .poly     =  */    Fx3d65,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0xffff)

#endif
