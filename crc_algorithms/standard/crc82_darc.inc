#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc82_interface(
  /* .name     =  */    DARC,
  /* .poly     =  */    Rx0308c0111011401440411,
  /* .init     =  */    0x000000000000000000000,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x000000000000000000000,
  /* .check    =  */    0x09ea83f625023801fd612,
  /* .residue  =  */    0x000000000000000000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc82_Rx0308c0111011401440411.h"

make_crc82_implementation(
  /* .name     =  */    DARC,
  /* .poly     =  */    Rx0308c0111011401440411,
  /* .init     =  */    0x000000000000000000000,
  /* .xorout   =  */    0x000000000000000000000)

#endif
