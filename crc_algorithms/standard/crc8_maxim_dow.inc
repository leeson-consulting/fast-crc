#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    MAXIM_DOW,
  /* .poly     =  */    Rx31,
  /* .init     =  */    0x00,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0xa1,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Rx31.h"

make_crc8_implementation(
  /* .name     =  */    MAXIM_DOW,
  /* .poly     =  */    Rx31,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
