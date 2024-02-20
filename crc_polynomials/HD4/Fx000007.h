#pragma once

// Polynomial           :      x^24 + x^2 + x + 1
// HD4                  :      2^24 - 1 bits, ~= 1 MB
// Implicit             :      0x800003
// Explicit             :      0x1000007
// Reversed Implicit    :      0xe00000
// Reversed Explicit    :      0x1c00001

#include "crc_kernels/crc_kernel_tables.h"

#include "FSub8x07.h"

#define Fx000007 (FSub8x07)

#if defined (USE_CRC_KERNEL_TABLE8)

make_crc_kernel_f24_t8(Fx000007)

#else

make_crc_kernel_f24_t4(Fx000007)

#endif
