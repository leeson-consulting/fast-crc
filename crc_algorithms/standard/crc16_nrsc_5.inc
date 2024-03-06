#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    NRSC_5,
  /* .poly     =  */    Rx080b,
  /* .init     =  */    0xffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0xa066,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx080b.h"

make_crc16_implementation(
  /* .name     =  */    NRSC_5,
  /* .poly     =  */    Rx080b,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0x0000)

#endif
