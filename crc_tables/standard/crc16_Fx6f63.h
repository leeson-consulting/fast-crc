#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc16_Fx6f63_Profile =
// {
//   "id" : {
//     "polynomial" : "x^16 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^1 + 1",
//     "degree"     : 16,
//     "explicit"   : "0x16f63",
//     "koopman"    : "0xb7b1",
//     "normal"     : "0x6f63"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 239, "bytes"   : 29 },
//     /* 4 */ { "bits"    : 239, "bytes"   : 29 },
//     /* 5 */ { "bits"    : 239, "bytes"   : 29 },
//     /* 6 */ { "bits"    : 14, "bytes"   : 1 },
//     /* 7 */ { "bits"    : 13, "bytes"   : 1 },
//     /* 8 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 9 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 10 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 11 */ { "bits"    : 1, "bytes"   : 0 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const Fx6f63[256] =
{
    0x0000, 0x6f63, 0xdec6, 0xb1a5, 0xd2ef, 0xbd8c, 0x0c29, 0x634a,
    0xcabd, 0xa5de, 0x147b, 0x7b18, 0x1852, 0x7731, 0xc694, 0xa9f7,
    0xfa19, 0x957a, 0x24df, 0x4bbc, 0x28f6, 0x4795, 0xf630, 0x9953,
    0x30a4, 0x5fc7, 0xee62, 0x8101, 0xe24b, 0x8d28, 0x3c8d, 0x53ee,
    0x9b51, 0xf432, 0x4597, 0x2af4, 0x49be, 0x26dd, 0x9778, 0xf81b,
    0x51ec, 0x3e8f, 0x8f2a, 0xe049, 0x8303, 0xec60, 0x5dc5, 0x32a6,
    0x6148, 0x0e2b, 0xbf8e, 0xd0ed, 0xb3a7, 0xdcc4, 0x6d61, 0x0202,
    0xabf5, 0xc496, 0x7533, 0x1a50, 0x791a, 0x1679, 0xa7dc, 0xc8bf,
    0x59c1, 0x36a2, 0x8707, 0xe864, 0x8b2e, 0xe44d, 0x55e8, 0x3a8b,
    0x937c, 0xfc1f, 0x4dba, 0x22d9, 0x4193, 0x2ef0, 0x9f55, 0xf036,
    0xa3d8, 0xccbb, 0x7d1e, 0x127d, 0x7137, 0x1e54, 0xaff1, 0xc092,
    0x6965, 0x0606, 0xb7a3, 0xd8c0, 0xbb8a, 0xd4e9, 0x654c, 0x0a2f,
    0xc290, 0xadf3, 0x1c56, 0x7335, 0x107f, 0x7f1c, 0xceb9, 0xa1da,
    0x082d, 0x674e, 0xd6eb, 0xb988, 0xdac2, 0xb5a1, 0x0404, 0x6b67,
    0x3889, 0x57ea, 0xe64f, 0x892c, 0xea66, 0x8505, 0x34a0, 0x5bc3,
    0xf234, 0x9d57, 0x2cf2, 0x4391, 0x20db, 0x4fb8, 0xfe1d, 0x917e,
    0xb382, 0xdce1, 0x6d44, 0x0227, 0x616d, 0x0e0e, 0xbfab, 0xd0c8,
    0x793f, 0x165c, 0xa7f9, 0xc89a, 0xabd0, 0xc4b3, 0x7516, 0x1a75,
    0x499b, 0x26f8, 0x975d, 0xf83e, 0x9b74, 0xf417, 0x45b2, 0x2ad1,
    0x8326, 0xec45, 0x5de0, 0x3283, 0x51c9, 0x3eaa, 0x8f0f, 0xe06c,
    0x28d3, 0x47b0, 0xf615, 0x9976, 0xfa3c, 0x955f, 0x24fa, 0x4b99,
    0xe26e, 0x8d0d, 0x3ca8, 0x53cb, 0x3081, 0x5fe2, 0xee47, 0x8124,
    0xd2ca, 0xbda9, 0x0c0c, 0x636f, 0x0025, 0x6f46, 0xdee3, 0xb180,
    0x1877, 0x7714, 0xc6b1, 0xa9d2, 0xca98, 0xa5fb, 0x145e, 0x7b3d,
    0xea43, 0x8520, 0x3485, 0x5be6, 0x38ac, 0x57cf, 0xe66a, 0x8909,
    0x20fe, 0x4f9d, 0xfe38, 0x915b, 0xf211, 0x9d72, 0x2cd7, 0x43b4,
    0x105a, 0x7f39, 0xce9c, 0xa1ff, 0xc2b5, 0xadd6, 0x1c73, 0x7310,
    0xdae7, 0xb584, 0x0421, 0x6b42, 0x0808, 0x676b, 0xd6ce, 0xb9ad,
    0x7112, 0x1e71, 0xafd4, 0xc0b7, 0xa3fd, 0xcc9e, 0x7d3b, 0x1258,
    0xbbaf, 0xd4cc, 0x6569, 0x0a0a, 0x6940, 0x0623, 0xb786, 0xd8e5,
    0x8b0b, 0xe468, 0x55cd, 0x3aae, 0x59e4, 0x3687, 0x8722, 0xe841,
    0x41b6, 0x2ed5, 0x9f70, 0xf013, 0x9359, 0xfc3a, 0x4d9f, 0x22fc
};

make_crc_kernel_f16_t8(Fx6f63)

#else

static uint16_t const Fx6f63[16] =
{
    0x0000, 0x6f63, 0xdec6, 0xb1a5, 0xd2ef, 0xbd8c, 0x0c29, 0x634a,
    0xcabd, 0xa5de, 0x147b, 0x7b18, 0x1852, 0x7731, 0xc694, 0xa9f7
};

make_crc_kernel_f16_t4(Fx6f63)

#endif