#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    T10_DIF,
  /* .poly     =  */    Fx8bb7,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0xd0db,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx8bb7.h"

make_crc16_implementation(
  /* .name     =  */    T10_DIF,
  /* .poly     =  */    Fx8bb7,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
