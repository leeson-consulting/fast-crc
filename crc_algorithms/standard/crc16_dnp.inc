#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    DNP,
  /* .poly     =  */    Rx3d65,
  /* .init     =  */    0x0000,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xffff,
  /* .check    =  */    0xea82,
  /* .residue  =  */    0x66c5)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx3d65.h"

make_crc16_implementation(
  /* .name     =  */    DNP,
  /* .poly     =  */    Rx3d65,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0xffff)

#endif
