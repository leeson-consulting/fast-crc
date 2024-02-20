#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc64_interface(
  /* .name     =  */    Nguyen_Fx000000000000002f,
  /* .poly     =  */    Fx000000000000002f,
  /* .init     =  */    0x0000000000000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000000000000000,
  /* .check    =  */    0x4966ab84f5dba52f,
  /* .residue  =  */    0x0000000000000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_polynomials/HD6/Fx000000000000002f.h"

make_crc64_implementation(
  /* .name     =  */    Nguyen_Fx000000000000002f,
  /* .poly     =  */    Fx000000000000002f,
  /* .init     =  */    0x0000000000000000,
  /* .xorout   =  */    0x0000000000000000)

#endif
