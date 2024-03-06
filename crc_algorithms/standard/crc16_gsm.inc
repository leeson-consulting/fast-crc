#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx1021,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffff,
  /* .check    =  */    0xce3c,
  /* .residue  =  */    0x1d0f)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx1021.h"

make_crc16_implementation(
  /* .name     =  */    GSM,
  /* .poly     =  */    Fx1021,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0xffff)

#endif
