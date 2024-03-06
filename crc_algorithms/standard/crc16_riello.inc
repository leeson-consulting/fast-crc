#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    RIELLO,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0xb2aa,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x63d0,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx1021.h"

make_crc16_implementation(
  /* .name     =  */    RIELLO,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0xb2aa,
  /* .xorout   =  */    0x0000)

#endif
