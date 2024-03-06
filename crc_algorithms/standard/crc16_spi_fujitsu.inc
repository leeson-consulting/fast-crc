#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    SPI_FUJITSU,
  /* .poly     =  */    Fx1021,
  /* .init     =  */    0x1d0f,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0xe5cc,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx1021.h"

make_crc16_implementation(
  /* .name     =  */    SPI_FUJITSU,
  /* .poly     =  */    Fx1021,
  /* .init     =  */    0x1d0f,
  /* .xorout   =  */    0x0000)

#endif
