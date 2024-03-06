#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc24_interface(
  /* .name     =  */    OPENPGP,
  /* .poly     =  */    Fx864cfb,
  /* .init     =  */    0xb704ce,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000000,
  /* .check    =  */    0x21cf02,
  /* .residue  =  */    0x000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc24_Fx864cfb.h"

make_crc24_implementation(
  /* .name     =  */    OPENPGP,
  /* .poly     =  */    Fx864cfb,
  /* .init     =  */    0xb704ce,
  /* .xorout   =  */    0x000000)

#endif
