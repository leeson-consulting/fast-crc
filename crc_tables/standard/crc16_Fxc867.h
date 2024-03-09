#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc16_Fxc867_Profile =
// {
//   "id" : {
//     "polynomial" : "x^16 + x^15 + x^14 + x^11 + x^6 + x^5 + x^2 + x^1 + 1",
//     "degree"     : 16,
//     "explicit"   : "0x1c867",
//     "koopman"    : "0xe433",
//     "normal"     : "0xc867"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
//     /* 4 */ { "bits"    : 361, "bytes"   : 45 },
//     /* 5 */ { "bits"    : 44, "bytes"   : 5 },
//     /* 6 */ { "bits"    : 11, "bytes"   : 1 },
//     /* 7 */ { "bits"    : 11, "bytes"   : 1 },
//     /* 8 */ { "bits"    : 5, "bytes"   : 0 },
//     /* 9 */ { "bits"    : 1, "bytes"   : 0 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const crc16_Fxc867_tbl[256] =
{
    0x0000, 0xc867, 0x58a9, 0x90ce, 0xb152, 0x7935, 0xe9fb, 0x219c,
    0xaac3, 0x62a4, 0xf26a, 0x3a0d, 0x1b91, 0xd3f6, 0x4338, 0x8b5f,
    0x9de1, 0x5586, 0xc548, 0x0d2f, 0x2cb3, 0xe4d4, 0x741a, 0xbc7d,
    0x3722, 0xff45, 0x6f8b, 0xa7ec, 0x8670, 0x4e17, 0xded9, 0x16be,
    0xf3a5, 0x3bc2, 0xab0c, 0x636b, 0x42f7, 0x8a90, 0x1a5e, 0xd239,
    0x5966, 0x9101, 0x01cf, 0xc9a8, 0xe834, 0x2053, 0xb09d, 0x78fa,
    0x6e44, 0xa623, 0x36ed, 0xfe8a, 0xdf16, 0x1771, 0x87bf, 0x4fd8,
    0xc487, 0x0ce0, 0x9c2e, 0x5449, 0x75d5, 0xbdb2, 0x2d7c, 0xe51b,
    0x2f2d, 0xe74a, 0x7784, 0xbfe3, 0x9e7f, 0x5618, 0xc6d6, 0x0eb1,
    0x85ee, 0x4d89, 0xdd47, 0x1520, 0x34bc, 0xfcdb, 0x6c15, 0xa472,
    0xb2cc, 0x7aab, 0xea65, 0x2202, 0x039e, 0xcbf9, 0x5b37, 0x9350,
    0x180f, 0xd068, 0x40a6, 0x88c1, 0xa95d, 0x613a, 0xf1f4, 0x3993,
    0xdc88, 0x14ef, 0x8421, 0x4c46, 0x6dda, 0xa5bd, 0x3573, 0xfd14,
    0x764b, 0xbe2c, 0x2ee2, 0xe685, 0xc719, 0x0f7e, 0x9fb0, 0x57d7,
    0x4169, 0x890e, 0x19c0, 0xd1a7, 0xf03b, 0x385c, 0xa892, 0x60f5,
    0xebaa, 0x23cd, 0xb303, 0x7b64, 0x5af8, 0x929f, 0x0251, 0xca36,
    0x5e5a, 0x963d, 0x06f3, 0xce94, 0xef08, 0x276f, 0xb7a1, 0x7fc6,
    0xf499, 0x3cfe, 0xac30, 0x6457, 0x45cb, 0x8dac, 0x1d62, 0xd505,
    0xc3bb, 0x0bdc, 0x9b12, 0x5375, 0x72e9, 0xba8e, 0x2a40, 0xe227,
    0x6978, 0xa11f, 0x31d1, 0xf9b6, 0xd82a, 0x104d, 0x8083, 0x48e4,
    0xadff, 0x6598, 0xf556, 0x3d31, 0x1cad, 0xd4ca, 0x4404, 0x8c63,
    0x073c, 0xcf5b, 0x5f95, 0x97f2, 0xb66e, 0x7e09, 0xeec7, 0x26a0,
    0x301e, 0xf879, 0x68b7, 0xa0d0, 0x814c, 0x492b, 0xd9e5, 0x1182,
    0x9add, 0x52ba, 0xc274, 0x0a13, 0x2b8f, 0xe3e8, 0x7326, 0xbb41,
    0x7177, 0xb910, 0x29de, 0xe1b9, 0xc025, 0x0842, 0x988c, 0x50eb,
    0xdbb4, 0x13d3, 0x831d, 0x4b7a, 0x6ae6, 0xa281, 0x324f, 0xfa28,
    0xec96, 0x24f1, 0xb43f, 0x7c58, 0x5dc4, 0x95a3, 0x056d, 0xcd0a,
    0x4655, 0x8e32, 0x1efc, 0xd69b, 0xf707, 0x3f60, 0xafae, 0x67c9,
    0x82d2, 0x4ab5, 0xda7b, 0x121c, 0x3380, 0xfbe7, 0x6b29, 0xa34e,
    0x2811, 0xe076, 0x70b8, 0xb8df, 0x9943, 0x5124, 0xc1ea, 0x098d,
    0x1f33, 0xd754, 0x479a, 0x8ffd, 0xae61, 0x6606, 0xf6c8, 0x3eaf,
    0xb5f0, 0x7d97, 0xed59, 0x253e, 0x04a2, 0xccc5, 0x5c0b, 0x946c
};

make_crc_kernel_f16_t8(Fxc867)

#else

static uint16_t const crc16_Fxc867_tbl[16] =
{
    0x0000, 0xc867, 0x58a9, 0x90ce, 0xb152, 0x7935, 0xe9fb, 0x219c,
    0xaac3, 0x62a4, 0xf26a, 0x3a0d, 0x1b91, 0xd3f6, 0x4338, 0x8b5f
};

make_crc_kernel_f16_t4(Fxc867)

#endif
