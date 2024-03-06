#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    TECH_3250,
  /* .poly     =  */    Rx1d,
  /* .init     =  */    0xff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0x97,
  /* .residue  =  */    0x00)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc8_Rx1d.h"

make_crc8_implementation(
  /* .name     =  */    TECH_3250,
  /* .poly     =  */    Rx1d,
  /* .init     =  */    0xff,
  /* .xorout   =  */    0x00)

#endif
