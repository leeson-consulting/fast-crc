#pragma once

#include "../kernels/crc_kernel.h"

// Polynomial           :
//
//  x^64 + x^62 + x^57 + x^55 + x^54 + x^53 + x^52 + x^47 + x^46 + x^45 + x^40 + x^39 + x^38 + x^37 + x^35 + x^33 +
//  x^32 + x^31 + x^29 + x^27 + x^24 + x^23 + x^22 + x^21 + x^19 + x^17 + x^13 + x^12 + x^10 + x^9 + x^7 + x^4 + x + 1
//
//
// HD4                  :      8589606850 bits, <~= 1GB
// HD6                  :          126701 bits, 15837 bytes
// HD8                  :        >= 32768 bits,  4096 bytes
// Implicit             :      0xa17870f5d4f51b49
// Explicit             :      0x142f0e1eba9ea3693
// Reversed Implicit    :      0xc96c5795d7870f42
// Reversed Explicit    :      0x192d8af2baf0e1e85

static uint64_t const Rx42f0e1eba9ea3693[16] =
{
  0x0000000000000000, 0x7d9ba13851336649, 0xfb374270a266cc92, 0x86ace348f355aadb,
  0x64b62bcaebc387a1, 0x192d8af2baf0e1e8, 0x9f8169ba49a54b33, 0xe21ac88218962d7a,
  0xc96c5795d7870f42, 0xb4f7f6ad86b4690b, 0x325b15e575e1c3d0, 0x4fc0b4dd24d2a599,
  0xadda7c5f3c4488e3, 0xd041dd676d77eeaa, 0x56ed3e2f9e224471, 0x2b769f17cf112238
};

make_crc_kernel_r64(Rx42f0e1eba9ea3693)
