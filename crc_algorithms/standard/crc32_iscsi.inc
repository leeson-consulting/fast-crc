#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc32_interface(
  /* .name     =  */    ISCSI,
  /* .poly     =  */    Rx1edc6f41,
  /* .init     =  */    0xffffffff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xffffffff,
  /* .check    =  */    0xe3069283,
  /* .residue  =  */    0xb798b438)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc32_Rx1edc6f41.h"

make_crc32_implementation(
  /* .name     =  */    ISCSI,
  /* .poly     =  */    Rx1edc6f41,
  /* .init     =  */    0xffffffff,
  /* .xorout   =  */    0xffffffff)

#endif
