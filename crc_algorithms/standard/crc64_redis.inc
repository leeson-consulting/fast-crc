#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc64_interface(
  /* .name     =  */    REDIS,
  /* .poly     =  */    Rxad93d23594c935a9,
  /* .init     =  */    0x0000000000000000,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0x0000000000000000,
  /* .check    =  */    0xe9c6d914c4b8d9ca,
  /* .residue  =  */    0x0000000000000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc64_Rxad93d23594c935a9.h"

make_crc64_implementation(
  /* .name     =  */    REDIS,
  /* .poly     =  */    Rxad93d23594c935a9,
  /* .init     =  */    0x0000000000000000,
  /* .xorout   =  */    0x0000000000000000)

#endif
