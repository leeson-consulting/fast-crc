#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc21_interface(
  /* .name     =  */    CAN_FD,
  /* .poly     =  */    Fx102899,
  /* .init     =  */    0x000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000000,
  /* .check    =  */    0x0ed841,
  /* .residue  =  */    0x000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc21_Fx102899.h"

make_crc21_implementation(
  /* .name     =  */    CAN_FD,
  /* .poly     =  */    Fx102899,
  /* .init     =  */    0x000000,
  /* .xorout   =  */    0x000000)

#endif
