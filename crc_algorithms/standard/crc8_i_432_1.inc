#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    I_432_1,
  /* .poly     =  */    Fx07,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x55,
  /* .check    =  */    0xa1,
  /* .residue  =  */    0xac)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx07.h"

make_crc8_implementation(
  /* .name     =  */    I_432_1,
  /* .poly     =  */    Fx07,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x55)

#endif
