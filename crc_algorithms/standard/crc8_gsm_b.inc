#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    GSM_B,
  /* .poly     =  */    Fx49,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xff,
  /* .check    =  */    0x94,
  /* .residue  =  */    0x53)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx49.h"

make_crc8_implementation(
  /* .name     =  */    GSM_B,
  /* .poly     =  */    Fx49,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0xff)

#endif
