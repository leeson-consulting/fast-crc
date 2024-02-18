#pragma once

#include "../kernels/crc_kernel.h"

// Polynomial           :      x^24 + x^2 + x + 1
// HD4                  :      2^24 - 1 bits, ~= 1 MB
// Implicit             :      0x800003
// Explicit             :      0x1000007
// Reversed Implicit    :      0xe00000
// Reversed Explicit    :      0x1c00001

static uint32_t const Fx000007[16] =
{
  0x000000, 0x000007, 0x00000e, 0x000009, 0x00001c, 0x00001b, 0x000012, 0x000015, 0x000038, 0x00003f, 0x000036, 0x000031, 0x000024, 0x000023, 0x00002a, 0x00002d
};

make_crc_kernel_f24(Fx000007)
