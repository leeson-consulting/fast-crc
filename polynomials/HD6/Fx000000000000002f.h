#pragma once

// Polynomial           : x^64 + x^5 + x3 + x^2 + x + 1
//
// HD4                  :      ~= 3.46 x 10e18 bits, ~= 432.5 PB
// HD6                  :       > 1.00 x 10e05 bits,  >  12.2 kB
// Implicit             :      
// Explicit             :      0x1000000000000002f
// Reversed Implicit    :      
// Reversed Explicit    :      

#include "../kernels/crc_kernel.h"
#include "FSub16x002f.h"

#define Fx000000000000002f (FSub16x002f)

#if defined (USE_CRC_KERNEL_TABLE8)

make_crc_kernel_f64_t8(Fx000000000000002f)

#else

make_crc_kernel_f64_t4(Fx000000000000002f)

#endif
