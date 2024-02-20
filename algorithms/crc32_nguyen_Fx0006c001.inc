#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc32_interface(
  /* .name     =  */    Nguyen_Fx0006c001,
  /* .poly     =  */    Fx0006c001,
  /* .init     =  */    0x00000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00000000,
  /* .check    =  */    0x1d40bcf7,
  /* .residue  =  */    0x00000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "../polynomials/HD6/Fx0006c001.h"

make_crc32_implementation(
  /* .name     =  */    Nguyen_Fx0006c001,
  /* .poly     =  */    Fx0006c001,
  /* .init     =  */    0x00000000,
  /* .xorout   =  */    0x00000000)

#endif
