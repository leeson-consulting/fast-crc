#pragma once

#include "../kernels/crc_kernel.h"

// Polynomial           :      x^16 + x^15 + x^2 + 1
// HD4                  :      <= 32751 bits, 4093 bytes
// Implicit             :      0xc002
// Explicit             :      0x18005
// Reversed Implicit    :      0xa001
// Reversed Explicit    :      0x14003

static uint16_t const Rx8005[16] =
{
  0x0000, 0xcc01, 0xd801, 0x1400, 0xf001, 0x3c00, 0x2800, 0xe401, 0xa001, 0x6c00, 0x7800, 0xb401, 0x5000, 0x9c01, 0x8801, 0x4400
};

make_crc_kernel_r16(Rx8005)
