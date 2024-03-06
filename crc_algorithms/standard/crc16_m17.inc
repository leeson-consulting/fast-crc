#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    M17,
  /* .poly     =  */    Fx5935,
  /* .init     =  */    0xffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x772b,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx5935.h"

make_crc16_implementation(
  /* .name     =  */    M17,
  /* .poly     =  */    Fx5935,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0x0000)

#endif
