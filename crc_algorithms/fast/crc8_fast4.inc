#if crc_algorithms_inc == INCLUDE_INTERFACE

#include "crc_algorithms/interface.h"

make_crc8_interface(
  /* .name     =  */    Fast4,
  /* .poly     =  */    Fx07,
  /* .init     =  */    0x00,
  /* .refin    =  */    false,
  /* .refout   =  */    false,
  /* .xorout   =  */    0x00,
  /* .check    =  */    0xf4,
  /* .residue  =  */    0xBaaDf00d)

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

uint8_t crc8_Fast4_Fx07(uint8_t crc, uint8_t const * data, size_t const data_len)
{
  uint8_t const FPoly07 = 0x07; // X^8 + X^2 + X + 1
  uint8_t const K = 0x80; // K = 2^(h - 1) , h = s = 8

  uint8_t A, C;

  for (size_t i = 0; i < data_len; ++i) {
    A = crc ^ data[i];

    if ((A & K) != 0) {
      C = (A << 1) ^ FPoly07;
    } else {
      C = A << 1;
    }

    if ((C & K) != 0) {
      crc = (C << 1) ^ FPoly07;
    } else {
      crc = C << 1;
    }

    crc = crc ^ C ^ A;
  }

  return crc;
}

make_crc8_implementation(
  /* .name     =  */    Fast4,
  /* .poly     =  */    Fx07,
  /* .init     =  */    0x00,
  /* .xorout   =  */    0x00)

#endif
