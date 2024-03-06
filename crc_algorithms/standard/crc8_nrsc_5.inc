#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    NRSC_5,
  /* .poly     =  */    Fx31,
  /* .init     =  */    0xff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0xf7,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Fx31.h"

make_crc8_implementation(
  /* .name     =  */    NRSC_5,
  /* .poly     =  */    Fx31,
  /* .init     =  */    0xff,
  /* .xorout   =  */    0x00)

#endif
