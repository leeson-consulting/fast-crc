#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    ARC,
  /* .poly     =  */    Rx8005,
  /* .init     =  */    0x0000,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0xbb3d,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx8005.h"

make_crc16_implementation(
  /* .name     =  */    ARC,
  /* .poly     =  */    Rx8005,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
