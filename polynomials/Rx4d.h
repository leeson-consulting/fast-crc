#pragma once

#include "../kernels/crc_kernel.h"

// Polynomial           :      x^8 + x^6 + x^3 + x^2 + 1
// HD4                  :      <= 247 bits, 30 bytes
// HD4                  :      <=  15 bits,  1 byte
// Implicit             :      0xa6
// Explicit             :      0x14d
// Reversed Implicit    :      0xb2
// Reversed Explicit    :      0x165

static uint8_t const Rx4d[16] =
{
  0x00, 0x4f, 0x9e, 0xd1, 0x59, 0x16, 0xc7, 0x88, 0xb2, 0xfd, 0x2c, 0x63, 0xeb, 0xa4, 0x75, 0x3a
};

make_crc_kernel_r8(Rx4d)
