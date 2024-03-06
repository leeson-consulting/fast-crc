#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    GENIBUS,
  /* .poly     =  */    Fx1021,
  /* .init     =  */    0xffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffff,
  /* .check    =  */    0xd64e,
  /* .residue  =  */    0x1d0f)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx1021.h"

make_crc16_implementation(
  /* .name     =  */    GENIBUS,
  /* .poly     =  */    Fx1021,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0xffff)

#endif
