#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc17_interface(
  /* .name     =  */    CAN_FD,
  /* .poly     =  */    Fx1685b,
  /* .init     =  */    0x00000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00000,
  /* .check    =  */    0x04f03,
  /* .residue  =  */    0x00000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc17_Fx1685b.h"

make_crc17_implementation(
  /* .name     =  */    CAN_FD,
  /* .poly     =  */    Fx1685b,
  /* .init     =  */    0x00000,
  /* .xorout   =  */    0x00000)

#endif
