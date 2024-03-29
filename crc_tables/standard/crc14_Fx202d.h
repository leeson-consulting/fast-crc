#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc14_Fx202d_Profile =
// {
//   "id" : {
//     "polynomial" : "x^14 + x^13 + x^5 + x^3 + x^2 + 1",
//     "degree"     : 14,
//     "explicit"   : "0x602d",
//     "koopman"    : "0x3016",
//     "normal"     : "0x202d"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 8177, "bytes"   : 1022 },
//     /* 4 */ { "bits"    : 8177, "bytes"   : 1022 },
//     /* 5 */ { "bits"    : 25, "bytes"   : 3 },
//     /* 6 */ { "bits"    : 25, "bytes"   : 3 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const crc14_Fx202d_tbl[256] =
{
    0x0000, 0x202d, 0x2077, 0x005a, 0x20c3, 0x00ee, 0x00b4, 0x2099, 0x21ab, 0x0186, 0x01dc, 0x21f1, 0x0168, 0x2145, 0x211f, 0x0132,
    0x237b, 0x0356, 0x030c, 0x2321, 0x03b8, 0x2395, 0x23cf, 0x03e2, 0x02d0, 0x22fd, 0x22a7, 0x028a, 0x2213, 0x023e, 0x0264, 0x2249,
    0x26db, 0x06f6, 0x06ac, 0x2681, 0x0618, 0x2635, 0x266f, 0x0642, 0x0770, 0x275d, 0x2707, 0x072a, 0x27b3, 0x079e, 0x07c4, 0x27e9,
    0x05a0, 0x258d, 0x25d7, 0x05fa, 0x2563, 0x054e, 0x0514, 0x2539, 0x240b, 0x0426, 0x047c, 0x2451, 0x04c8, 0x24e5, 0x24bf, 0x0492,
    0x2d9b, 0x0db6, 0x0dec, 0x2dc1, 0x0d58, 0x2d75, 0x2d2f, 0x0d02, 0x0c30, 0x2c1d, 0x2c47, 0x0c6a, 0x2cf3, 0x0cde, 0x0c84, 0x2ca9,
    0x0ee0, 0x2ecd, 0x2e97, 0x0eba, 0x2e23, 0x0e0e, 0x0e54, 0x2e79, 0x2f4b, 0x0f66, 0x0f3c, 0x2f11, 0x0f88, 0x2fa5, 0x2fff, 0x0fd2,
    0x0b40, 0x2b6d, 0x2b37, 0x0b1a, 0x2b83, 0x0bae, 0x0bf4, 0x2bd9, 0x2aeb, 0x0ac6, 0x0a9c, 0x2ab1, 0x0a28, 0x2a05, 0x2a5f, 0x0a72,
    0x283b, 0x0816, 0x084c, 0x2861, 0x08f8, 0x28d5, 0x288f, 0x08a2, 0x0990, 0x29bd, 0x29e7, 0x09ca, 0x2953, 0x097e, 0x0924, 0x2909,
    0x3b1b, 0x1b36, 0x1b6c, 0x3b41, 0x1bd8, 0x3bf5, 0x3baf, 0x1b82, 0x1ab0, 0x3a9d, 0x3ac7, 0x1aea, 0x3a73, 0x1a5e, 0x1a04, 0x3a29,
    0x1860, 0x384d, 0x3817, 0x183a, 0x38a3, 0x188e, 0x18d4, 0x38f9, 0x39cb, 0x19e6, 0x19bc, 0x3991, 0x1908, 0x3925, 0x397f, 0x1952,
    0x1dc0, 0x3ded, 0x3db7, 0x1d9a, 0x3d03, 0x1d2e, 0x1d74, 0x3d59, 0x3c6b, 0x1c46, 0x1c1c, 0x3c31, 0x1ca8, 0x3c85, 0x3cdf, 0x1cf2,
    0x3ebb, 0x1e96, 0x1ecc, 0x3ee1, 0x1e78, 0x3e55, 0x3e0f, 0x1e22, 0x1f10, 0x3f3d, 0x3f67, 0x1f4a, 0x3fd3, 0x1ffe, 0x1fa4, 0x3f89,
    0x1680, 0x36ad, 0x36f7, 0x16da, 0x3643, 0x166e, 0x1634, 0x3619, 0x372b, 0x1706, 0x175c, 0x3771, 0x17e8, 0x37c5, 0x379f, 0x17b2,
    0x35fb, 0x15d6, 0x158c, 0x35a1, 0x1538, 0x3515, 0x354f, 0x1562, 0x1450, 0x347d, 0x3427, 0x140a, 0x3493, 0x14be, 0x14e4, 0x34c9,
    0x305b, 0x1076, 0x102c, 0x3001, 0x1098, 0x30b5, 0x30ef, 0x10c2, 0x11f0, 0x31dd, 0x3187, 0x11aa, 0x3133, 0x111e, 0x1144, 0x3169,
    0x1320, 0x330d, 0x3357, 0x137a, 0x33e3, 0x13ce, 0x1394, 0x33b9, 0x328b, 0x12a6, 0x12fc, 0x32d1, 0x1248, 0x3265, 0x323f, 0x1212
};

make_crc_kernel_f14_t8(Fx202d)

#else

static uint16_t const crc14_Fx202d_tbl[16] =
{
    0x0000, 0x202d, 0x2077, 0x005a, 0x20c3, 0x00ee, 0x00b4, 0x2099, 0x21ab, 0x0186, 0x01dc, 0x21f1, 0x0168, 0x2145, 0x211f, 0x0132
};

make_crc_kernel_f14_t4(Fx202d)

#endif
