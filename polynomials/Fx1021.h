#pragma once

#include "../kernels/crc_kernel.h"

// Polynomial           :      x^16 + x^12 + x^5 + 1
// HD4                  :      <= 32751 bits, 4093 bytes
// Implicit             :      0x8810
// Explicit             :      0x11021
// Reversed Implicit    :      0x8408
// Reversed Explicit    :      0x10811

static uint16_t const Fx1021[16] =
{
  0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef
};

make_crc_kernel_f16(Fx1021)
