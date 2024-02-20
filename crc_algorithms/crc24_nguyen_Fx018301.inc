#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc24_interface(
  /* .name     =  */    Nguyen_Fx018301,
  /* .poly     =  */    Fx018301,
  /* .init     =  */    0x000000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x000000,
  /* .check    =  */    0x8a7d1b,
  /* .residue  =  */    0x000000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_polynomials/HD6/Fx018301.h"

make_crc24_implementation(
  /* .name     =  */    Nguyen_Fx018301,
  /* .poly     =  */    Fx018301,
  /* .init     =  */    0x000000,
  /* .xorout   =  */    0x000000)

#endif
