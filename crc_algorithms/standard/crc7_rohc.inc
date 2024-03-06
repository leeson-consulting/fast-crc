#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc7_interface(
  /* .name     =  */    ROHC,
  /* .poly     =  */    Rx4f,
  /* .init     =  */    0x7f,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x53,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc7_Rx4f.h"

make_crc7_implementation(
  /* .name     =  */    ROHC,
  /* .poly     =  */    Rx4f,
  /* .init     =  */    0x7f,
  /* .xorout   =  */    0x00)

#endif
