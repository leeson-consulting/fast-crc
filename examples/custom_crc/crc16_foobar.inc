#if crc_algorithms_inc == INCLUDE_INTERFACE

// NB. This "Customised CRC" is simply an alias of
// "${REPO_ROOT}/crc_algorithms/standard/crc16_opensafety_b.inc"
//
// This is to show one way of shimming a standard CRC algorithm
// to better suit the names used in your application.
//
// You can, of course, change any of the parameters
// so long as you follow the main guide
// and make use of one of the existing polynomial crc_tables

#include "crc_algorithms/interface.h"

make_crc16_interface(
  /* .name     =  */    FooBar,
  /* .poly     =  */    Fx755b,
  /* .init     =  */    0x0000,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x0000,
  /* .check    =  */    0x20fe,
  /* .residue  =  */    0x0000)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/standard/crc16_Fx755b.h"

make_crc16_implementation(
  /* .name     =  */    FooBar,
  /* .poly     =  */    Fx755b,
  /* .init     =  */    0x0000,
  /* .xorout   =  */    0x0000)

#endif
