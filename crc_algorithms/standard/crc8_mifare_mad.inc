#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    MIFARE_MAD,
  /* .poly     =  */    Fx1d,
  /* .init     =  */    0xc7,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x99,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx1d.h"

make_crc8_implementation(
  /* .name     =  */    MIFARE_MAD,
  /* .poly     =  */    Fx1d,
  /* .init     =  */    0xc7,
  /* .xorout   =  */    0x00)

#endif
