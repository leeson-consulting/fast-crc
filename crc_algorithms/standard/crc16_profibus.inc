#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    PROFIBUS,
  /* .poly     =  */    Fx1dcf,
  /* .init     =  */    0xffff,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0xffff,
  /* .check    =  */    0xa819,
  /* .residue  =  */    0xe394)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx1dcf.h"

make_crc16_implementation(
  /* .name     =  */    PROFIBUS,
  /* .poly     =  */    Fx1dcf,
  /* .init     =  */    0xffff,
  /* .xorout   =  */    0xffff)

#endif
