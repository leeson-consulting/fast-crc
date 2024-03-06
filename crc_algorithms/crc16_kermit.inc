#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc16_interface(
  /* .name     =  */    Kermit,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0x0000,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x2189,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx1021.h"

make_crc16_implementation(
  /* .name     =  */    Kermit,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
