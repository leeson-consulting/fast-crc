#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc40_interface(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx0004820009,
  /* .init     =  */    0x0000000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffffffffff,
  /* .check    =  */    0xd4164fc646,
  /* .residue  =  */    0xc4ff8071ff)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc40_Fx0004820009.h"

make_crc40_implementation(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx0004820009,
  /* .init     =  */    0x0000000000,
  /* .xorout   =  */    0xffffffffff)

#endif
