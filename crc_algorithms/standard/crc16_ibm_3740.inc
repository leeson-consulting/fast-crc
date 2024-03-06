#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    IBM_3740,
  /* .poly     =  */    Fx1021,
  /* .init     =  */    0xffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x29b1,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx1021.h"

make_crc16_implementation(
  /* .name     =  */    IBM_3740,
  /* .poly     =  */    Fx1021,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0x0000)

#endif
