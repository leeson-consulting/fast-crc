#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_interface.h"

make_crc16_interface(
  /* .name     =  */    DDS_110,
  /* .poly     =  */    Fx8005,
  /* .init     =  */    0x800d,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x9ecf,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_polynomials/HD4/Fx8005.h"

make_crc16_implementation(
  /* .name     =  */    DDS_110,
  /* .poly     =  */    Fx8005,
  /* .init     =  */    0x800d,
  /* .xorout   =  */    0x0000)

#endif
