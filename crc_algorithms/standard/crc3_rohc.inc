#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc3_interface(
  /* .name     =  */    ROHC,
  /* .poly     =  */    Rx3,
  /* .init     =  */    0x7,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0,
  /* .check    =  */    0x6,
  /* .residue  =  */    0x0)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc3_Rx3.h"

make_crc3_implementation(
  /* .name     =  */    ROHC,
  /* .poly     =  */    Rx3,
  /* .init     =  */    0x7,
  /* .xorout   =  */    0x0)

#endif
