#pragma once

#include "../kernels/crc_kernel.h"
#include "FSub8x07.h"

// Polynomial           :      x^24 + x^2 + x + 1
// HD4                  :      2^24 - 1 bits, ~= 1 MB
// Implicit             :      0x800003
// Explicit             :      0x1000007
// Reversed Implicit    :      0xe00000
// Reversed Explicit    :      0x1c00001

#define Fx000007 (FSub8x07)

make_crc_kernel_f24(Fx000007)
