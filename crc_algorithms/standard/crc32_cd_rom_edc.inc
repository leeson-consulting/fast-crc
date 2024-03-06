#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    CD_ROM_EDC,
  /* .poly     =  */    Rx8001801b,
  /* .init     =  */    0x00000000,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0x6ec2edc4,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Rx8001801b.h"

make_crc32_implementation(
  /* .name     =  */    CD_ROM_EDC,
  /* .poly     =  */    Rx8001801b,
  /* .init     =  */    0x00000000,
  /* .xorout   =  */    0x00000000)

#endif
