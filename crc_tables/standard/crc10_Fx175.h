#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc10_Fx175_Profile =
// {
//   "id" : {
//     "polynomial" : "x^10 + x^8 + x^6 + x^5 + x^4 + x^2 + 1",
//     "degree"     : 10,
//     "explicit"   : "0x575",
//     "koopman"    : "0x2ba",
//     "normal"     : "0x175"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 25, "bytes"   : 3 },
//     /* 4 */ { "bits"    : 25, "bytes"   : 3 },
//     /* 5 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 6 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 7 */ { "bits"    : 2, "bytes"   : 0 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const crc10_Fx175_tbl[256] =
{
    0x000, 0x175, 0x2ea, 0x39f, 0x0a1, 0x1d4, 0x24b, 0x33e, 0x142, 0x037, 0x3a8, 0x2dd, 0x1e3, 0x096, 0x309, 0x27c,
    0x284, 0x3f1, 0x06e, 0x11b, 0x225, 0x350, 0x0cf, 0x1ba, 0x3c6, 0x2b3, 0x12c, 0x059, 0x367, 0x212, 0x18d, 0x0f8,
    0x07d, 0x108, 0x297, 0x3e2, 0x0dc, 0x1a9, 0x236, 0x343, 0x13f, 0x04a, 0x3d5, 0x2a0, 0x19e, 0x0eb, 0x374, 0x201,
    0x2f9, 0x38c, 0x013, 0x166, 0x258, 0x32d, 0x0b2, 0x1c7, 0x3bb, 0x2ce, 0x151, 0x024, 0x31a, 0x26f, 0x1f0, 0x085,
    0x0fa, 0x18f, 0x210, 0x365, 0x05b, 0x12e, 0x2b1, 0x3c4, 0x1b8, 0x0cd, 0x352, 0x227, 0x119, 0x06c, 0x3f3, 0x286,
    0x27e, 0x30b, 0x094, 0x1e1, 0x2df, 0x3aa, 0x035, 0x140, 0x33c, 0x249, 0x1d6, 0x0a3, 0x39d, 0x2e8, 0x177, 0x002,
    0x087, 0x1f2, 0x26d, 0x318, 0x026, 0x153, 0x2cc, 0x3b9, 0x1c5, 0x0b0, 0x32f, 0x25a, 0x164, 0x011, 0x38e, 0x2fb,
    0x203, 0x376, 0x0e9, 0x19c, 0x2a2, 0x3d7, 0x048, 0x13d, 0x341, 0x234, 0x1ab, 0x0de, 0x3e0, 0x295, 0x10a, 0x07f,
    0x1f4, 0x081, 0x31e, 0x26b, 0x155, 0x020, 0x3bf, 0x2ca, 0x0b6, 0x1c3, 0x25c, 0x329, 0x017, 0x162, 0x2fd, 0x388,
    0x370, 0x205, 0x19a, 0x0ef, 0x3d1, 0x2a4, 0x13b, 0x04e, 0x232, 0x347, 0x0d8, 0x1ad, 0x293, 0x3e6, 0x079, 0x10c,
    0x189, 0x0fc, 0x363, 0x216, 0x128, 0x05d, 0x3c2, 0x2b7, 0x0cb, 0x1be, 0x221, 0x354, 0x06a, 0x11f, 0x280, 0x3f5,
    0x30d, 0x278, 0x1e7, 0x092, 0x3ac, 0x2d9, 0x146, 0x033, 0x24f, 0x33a, 0x0a5, 0x1d0, 0x2ee, 0x39b, 0x004, 0x171,
    0x10e, 0x07b, 0x3e4, 0x291, 0x1af, 0x0da, 0x345, 0x230, 0x04c, 0x139, 0x2a6, 0x3d3, 0x0ed, 0x198, 0x207, 0x372,
    0x38a, 0x2ff, 0x160, 0x015, 0x32b, 0x25e, 0x1c1, 0x0b4, 0x2c8, 0x3bd, 0x022, 0x157, 0x269, 0x31c, 0x083, 0x1f6,
    0x173, 0x006, 0x399, 0x2ec, 0x1d2, 0x0a7, 0x338, 0x24d, 0x031, 0x144, 0x2db, 0x3ae, 0x090, 0x1e5, 0x27a, 0x30f,
    0x3f7, 0x282, 0x11d, 0x068, 0x356, 0x223, 0x1bc, 0x0c9, 0x2b5, 0x3c0, 0x05f, 0x12a, 0x214, 0x361, 0x0fe, 0x18b
};

make_crc_kernel_f10_t8(Fx175)

#else

static uint16_t const crc10_Fx175_tbl[16] =
{
    0x000, 0x175, 0x2ea, 0x39f, 0x0a1, 0x1d4, 0x24b, 0x33e, 0x142, 0x037, 0x3a8, 0x2dd, 0x1e3, 0x096, 0x309, 0x27c
};

make_crc_kernel_f10_t4(Fx175)

#endif
