#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc5_interface(
  /* .name     =  */    EPC_C1G2,
  /* .poly     =  */    Fx09,
  /* .init     =  */    0x09,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x00,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc5_Fx09.h"

make_crc5_implementation(
  /* .name     =  */    EPC_C1G2,
  /* .poly     =  */    Fx09,
  /* .init     =  */    0x09,
  /* .xorout   =  */    0x00)

#endif
