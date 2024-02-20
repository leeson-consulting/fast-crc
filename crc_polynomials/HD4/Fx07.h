#pragma once

// Polynomial           :      x^8 + x^2 + x + 1
// HD4                  :      <= 119 bits, 14 bytes
// Implicit             :      0x83
// Explicit             :      0x107
// Reversed Implicit    :      0xe0
// Reversed Explicit    :      0x1c1

#include "crc_kernels/crc_kernel_tables.h"

#include "FSub8x07.h"

#define Fx07 (FSub8x07)

#if defined (USE_CRC_KERNEL_TABLE8)

make_crc_kernel_f8_t8(Fx07)

#else

make_crc_kernel_f8_t4(Fx07)

#endif
