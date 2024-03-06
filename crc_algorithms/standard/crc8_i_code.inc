#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    I_CODE,
  /* .poly     =  */    Fx1d,
  /* .init     =  */    0xfd,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x7e,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx1d.h"

make_crc8_implementation(
  /* .name     =  */    I_CODE,
  /* .poly     =  */    Fx1d,
  /* .init     =  */    0xfd,
  /* .xorout   =  */    0x00)

#endif
