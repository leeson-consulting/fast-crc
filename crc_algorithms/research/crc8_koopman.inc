#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

//  CRC-8/Koopman is mentioned here:
//
//  https://stackoverflow.com/a/51748961
//
//  <Quote>
//
//    8-bit CRC using the polynomial x^8+x^6+x^3+x^2+1, 0x14D.
//    Chosen based on Koopman, et al. (0xA6 in his notation = 0x14D >> 1):
//    http://www.ece.cmu.edu/~koopman/roses/dsn04/koopman04_crc_poly_embedded.pdf
//
//    This implementation is reflected, processing the least-significant bit of the
//    input first, has an initial CRC register value of 0xff, and exclusive-or's
//    the final register value with 0xff. As a result the CRC of an empty string,
//    and therefore the initial CRC value, is zero.
//
//    The standard description of this CRC is:
//    width=8 poly=0x4d init=0xff refin=true refout=true xorout=0xff check=0xd8
//    name="CRC-8/KOOP"
//
//  </Quote>

make_crc8_interface(
  /* .name     =  */    Koopman,
  /* .poly     =  */    Rx4d,
  /* .init     =  */    0xff,
  /* .refin    =  */    true,
  /* .refout   =  */    true,
  /* .xorout   =  */    0xff,
  /* .check    =  */    0xd8,
  /* .residue  =  */    0xBaaDf00d)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include "crc_tables/research/crc8_Rx4d.h"

make_crc8_implementation(
  /* .name     =  */    Koopman,
  /* .poly     =  */    Rx4d,
  /* .init     =  */    0xff,
  /* .xorout   =  */    0xff)

#endif
