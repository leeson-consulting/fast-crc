#pragma once

#include "../kernels/crc_kernel.h"

// Polynomial           :      x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1
// HD4                  :      <= 91607 bits, 11450 bytes
// HD5                  :      <=  2974 bits,   371 bytes
// HD6                  :      <=   268 bits,    33 bytes
// HD7                  :      <=   171 bits,    21 bytes
// HD8                  :      <=    91 bits,    11 bytes
// HD9                  :      <=    57 bits,     7 bytes
// HD10                 :      <=    34 bits,     4 bytes
// HD11                 :      <=    21 bits,     2 bytes
// HD12                 :      <=    12 bits,     1 byte
// HD13                 :      <=    10 bits,     1 byte
// Implicit             :      0x82608edb
// Explicit             :      0x104c11db7
// Reversed Implicit    :      0xedb88320
// Reversed Explicit    :      0x1db710641

static uint32_t const Rx04c11db7[16] =
{
  0x00000000, 0x1db71064, 0x3b6e20c8, 0x26d930ac, 0x76dc4190, 0x6b6b51f4, 0x4db26158, 0x5005713c, 0xedb88320, 0xf00f9344, 0xd6d6a3e8, 0xcb61b38c, 0x9b64c2b0, 0x86d3d2d4, 0xa00ae278, 0xbdbdf21c
};

make_crc_kernel_r32(Rx04c11db7)
