#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    ROHC,
  /* .poly     =  */    Rx07,
  /* .init     =  */    0xff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0xd0,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Rx07.h"

make_crc8_implementation(
  /* .name     =  */    ROHC,
  /* .poly     =  */    Rx07,
  /* .init     =  */    0xff,
  /* .xorout   =  */    0x00)

#endif
