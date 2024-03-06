#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    ISO_IEC_14443_3_A,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0xc6c6,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0xbf05,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Rx1021.h"

make_crc16_implementation(
  /* .name     =  */    ISO_IEC_14443_3_A,
  /* .poly     =  */    Rx1021,
  /* .init     =  */    0xc6c6,
  /* .xorout   =  */    0x0000)

#endif
