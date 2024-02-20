#pragma once

// Polynomial           :      x^16 + x^2 + x + 1
// HD4                  :      <= 32751 bits, 4093 bytes
// Implicit             :      0x8003
// Explicit             :      0x10007
// Reversed Implicit    :      0xe000
// Reversed Explicit    :      0x1c001

#include "crc_kernels/crc_kernel_tables.h"

#include "FSub8x07.h"

#define Fx0007 (FSub8x07)

#if defined (USE_CRC_KERNEL_TABLE8)

make_crc_kernel_f16_t8(Fx0007)

#else

make_crc_kernel_f16_t4(Fx0007)

#endif
