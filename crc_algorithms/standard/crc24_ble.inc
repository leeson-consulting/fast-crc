#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc24_interface(
  /* .name     =  */    BLE,
  /* .poly     =  */    Rx00065b,
  /* .init     =  */    0x555555,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x000000,
  /* .check    =  */    0xc25a56,
  /* .residue  =  */    0x000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc24_Rx00065b.h"

make_crc24_implementation(
  /* .name     =  */    BLE,
  /* .poly     =  */    Rx00065b,
  /* .init     =  */    0xaaaaaa,
  /* .xorout   =  */    0x000000)

#endif
