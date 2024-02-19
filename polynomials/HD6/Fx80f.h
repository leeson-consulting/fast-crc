#pragma once

#include "../kernels/crc_kernel.h"

// Polynomial           :      x^12 + x^11 + x^3 + x^2 + x + 1
// HD4                  :      <= 2035 bits, 254 bytes
// HD6                  :      <=    1 bit,    0 bytes
// Implicit             :      0xc07
// Explicit             :      0x180f
// Reversed Implicit    :      0xf01
// Reversed Explicit    :      0x1e03

static uint16_t const Fx80f[16] =
{
  0x000, 0x80f, 0x811, 0x01e, 0x82d, 0x022, 0x03c, 0x833, 0x855, 0x05a, 0x044, 0x84b, 0x078, 0x877, 0x869, 0x066
};

make_crc_kernel_f12_t4(Fx80f)
