#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    GSM_A,
  /* .poly     =  */    Fx1d,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x37,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx1d.h"

make_crc8_implementation(
  /* .name     =  */    GSM_A,
  /* .poly     =  */    Fx1d,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
