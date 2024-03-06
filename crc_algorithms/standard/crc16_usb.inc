#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    USB,
  /* .poly     =  */    Rx8005,
  /* .init     =  */    0xffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xffff,
  /* .check    =  */    0xb4c8,
  /* .residue  =  */    0xb001)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx8005.h"

make_crc16_implementation(
  /* .name     =  */    USB,
  /* .poly     =  */    Rx8005,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0xffff)

#endif
