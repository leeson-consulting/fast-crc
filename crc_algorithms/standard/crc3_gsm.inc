#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc3_interface(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx3,
  /* .init     =  */    0x0,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x7,
  /* .check    =  */    0x4,
  /* .residue  =  */    0x2)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc3_Fx3.h"

make_crc3_implementation(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx3,
  /* .init     =  */    0x0,
  /* .xorout   =  */    0x7)

#endif
