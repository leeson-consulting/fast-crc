#pragma once

#include "../kernels/crc_kernel.h"

// Polynomial           : x^64 + x^5 + x3 + x^2 + x + 1
//
// HD4                  :      ~= 3.46 x 10e18 bits, ~= 432.5 PB
// HD6                  :       > 1.00 x 10e05 bits,  >  12.2 kB
// Implicit             :      
// Explicit             :      0x1000000000000002f
// Reversed Implicit    :      
// Reversed Explicit    :      

static uint64_t const Fx000000000000002f[16] =
{
  0x0000000000000000, 0x000000000000002f, 0x000000000000005e, 0x0000000000000071,
  0x00000000000000bc, 0x0000000000000093, 0x00000000000000e2, 0x00000000000000cd,
  0x0000000000000178, 0x0000000000000157, 0x0000000000000126, 0x0000000000000109,
  0x00000000000001c4, 0x00000000000001eb, 0x000000000000019a, 0x00000000000001b5
};

make_crc_kernel_f64_t4(Fx000000000000002f)
