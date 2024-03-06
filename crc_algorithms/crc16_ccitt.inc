#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

// NB. CRC-16/CCITT is an alias for CRC-16/Kermit
// See Greg Cook's CRC Catalogue for details:
// https://reveng.sourceforge.io/crc-catalogue/16.htm#crc.cat-bits.16

make_crc16_interface(
  /* .name     =  */    CCITT,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0x0000,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x2189,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx1021.h"

make_crc16_implementation(
  /* .name     =  */    CCITT,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
