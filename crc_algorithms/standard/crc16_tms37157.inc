#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    TMS37157,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0x89ec,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x26b1,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx1021.h"

make_crc16_implementation(
  /* .name     =  */    TMS37157,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0x89ec,
  /* .xorout   =  */    0x0000)

#endif
