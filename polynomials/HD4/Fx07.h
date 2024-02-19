#pragma once

#include "../kernels/crc_kernel.h"
#include "FSub8x07.h"

// Polynomial           :      x^8 + x^2 + x + 1
// HD4                  :      <= 119 bits, 14 bytes
// Implicit             :      0x83
// Explicit             :      0x107
// Reversed Implicit    :      0xe0
// Reversed Explicit    :      0x1c1

#define Fx07 (FSub8x07)

make_crc_kernel_f8(Fx07)
