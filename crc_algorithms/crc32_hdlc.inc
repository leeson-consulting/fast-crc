#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc32_interface(
  /* .name     =  */    ISO_HDLC,
  /* .poly     =  */    Rx04c11db7,
  /* .init     =  */    0xffffffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffffffff,
  /* .check    =  */    0xcbf43926,
  /* .residue  =  */    0xdebb20e3)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Rx04c11db7.h"

make_crc32_implementation(
  /* .name     =  */    ISO_HDLC,
  /* .poly     =  */    Rx04c11db7,
  /* .init     =  */    0xffffffff,
  /* .xorout   =  */    0xffffffff)

#endif
