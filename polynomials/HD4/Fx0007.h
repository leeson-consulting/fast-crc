#pragma once

#include "../kernels/crc_kernel.h"
#include "FSub8x07.h"

// Polynomial           :      x^16 + x^2 + x + 1
// HD4                  :      <= 32751 bits, 4093 bytes
// Implicit             :      0x8003
// Explicit             :      0x10007
// Reversed Implicit    :      0xe000
// Reversed Explicit    :      0x1c001

#define Fx0007 (FSub8x07)

make_crc_kernel_f16(Fx0007)
