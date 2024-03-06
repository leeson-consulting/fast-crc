#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc16_Rx0589_Profile =
// {
//   "id" : {
//     "polynomial" : "x^16 + x^10 + x^8 + x^7 + x^3 + 1",
//     "degree"     : 16,
//     "explicit"   : "0x10589",
//     "koopman"    : "0x82c4",
//     "normal"     : "0x589"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 238, "bytes"   : 29 },
//     /* 4 */ { "bits"    : 238, "bytes"   : 29 },
//     /* 5 */ { "bits"    : 112, "bytes"   : 14 },
//     /* 6 */ { "bits"    : 112, "bytes"   : 14 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const Rx0589[256] =
{
    0x0000, 0x49f3, 0x93e6, 0xda15, 0x048d, 0x4d7e, 0x976b, 0xde98,
    0x091a, 0x40e9, 0x9afc, 0xd30f, 0x0d97, 0x4464, 0x9e71, 0xd782,
    0x1234, 0x5bc7, 0x81d2, 0xc821, 0x16b9, 0x5f4a, 0x855f, 0xccac,
    0x1b2e, 0x52dd, 0x88c8, 0xc13b, 0x1fa3, 0x5650, 0x8c45, 0xc5b6,
    0x2468, 0x6d9b, 0xb78e, 0xfe7d, 0x20e5, 0x6916, 0xb303, 0xfaf0,
    0x2d72, 0x6481, 0xbe94, 0xf767, 0x29ff, 0x600c, 0xba19, 0xf3ea,
    0x365c, 0x7faf, 0xa5ba, 0xec49, 0x32d1, 0x7b22, 0xa137, 0xe8c4,
    0x3f46, 0x76b5, 0xaca0, 0xe553, 0x3bcb, 0x7238, 0xa82d, 0xe1de,
    0x48d0, 0x0123, 0xdb36, 0x92c5, 0x4c5d, 0x05ae, 0xdfbb, 0x9648,
    0x41ca, 0x0839, 0xd22c, 0x9bdf, 0x4547, 0x0cb4, 0xd6a1, 0x9f52,
    0x5ae4, 0x1317, 0xc902, 0x80f1, 0x5e69, 0x179a, 0xcd8f, 0x847c,
    0x53fe, 0x1a0d, 0xc018, 0x89eb, 0x5773, 0x1e80, 0xc495, 0x8d66,
    0x6cb8, 0x254b, 0xff5e, 0xb6ad, 0x6835, 0x21c6, 0xfbd3, 0xb220,
    0x65a2, 0x2c51, 0xf644, 0xbfb7, 0x612f, 0x28dc, 0xf2c9, 0xbb3a,
    0x7e8c, 0x377f, 0xed6a, 0xa499, 0x7a01, 0x33f2, 0xe9e7, 0xa014,
    0x7796, 0x3e65, 0xe470, 0xad83, 0x731b, 0x3ae8, 0xe0fd, 0xa90e,
    0x91a0, 0xd853, 0x0246, 0x4bb5, 0x952d, 0xdcde, 0x06cb, 0x4f38,
    0x98ba, 0xd149, 0x0b5c, 0x42af, 0x9c37, 0xd5c4, 0x0fd1, 0x4622,
    0x8394, 0xca67, 0x1072, 0x5981, 0x8719, 0xceea, 0x14ff, 0x5d0c,
    0x8a8e, 0xc37d, 0x1968, 0x509b, 0x8e03, 0xc7f0, 0x1de5, 0x5416,
    0xb5c8, 0xfc3b, 0x262e, 0x6fdd, 0xb145, 0xf8b6, 0x22a3, 0x6b50,
    0xbcd2, 0xf521, 0x2f34, 0x66c7, 0xb85f, 0xf1ac, 0x2bb9, 0x624a,
    0xa7fc, 0xee0f, 0x341a, 0x7de9, 0xa371, 0xea82, 0x3097, 0x7964,
    0xaee6, 0xe715, 0x3d00, 0x74f3, 0xaa6b, 0xe398, 0x398d, 0x707e,
    0xd970, 0x9083, 0x4a96, 0x0365, 0xddfd, 0x940e, 0x4e1b, 0x07e8,
    0xd06a, 0x9999, 0x438c, 0x0a7f, 0xd4e7, 0x9d14, 0x4701, 0x0ef2,
    0xcb44, 0x82b7, 0x58a2, 0x1151, 0xcfc9, 0x863a, 0x5c2f, 0x15dc,
    0xc25e, 0x8bad, 0x51b8, 0x184b, 0xc6d3, 0x8f20, 0x5535, 0x1cc6,
    0xfd18, 0xb4eb, 0x6efe, 0x270d, 0xf995, 0xb066, 0x6a73, 0x2380,
    0xf402, 0xbdf1, 0x67e4, 0x2e17, 0xf08f, 0xb97c, 0x6369, 0x2a9a,
    0xef2c, 0xa6df, 0x7cca, 0x3539, 0xeba1, 0xa252, 0x7847, 0x31b4,
    0xe636, 0xafc5, 0x75d0, 0x3c23, 0xe2bb, 0xab48, 0x715d, 0x38ae
};

make_crc_kernel_r16_t8(Rx0589)

#else

static uint16_t const Rx0589[16] =
{
    0x0000, 0x1234, 0x2468, 0x365c, 0x48d0, 0x5ae4, 0x6cb8, 0x7e8c,
    0x91a0, 0x8394, 0xb5c8, 0xa7fc, 0xd970, 0xcb44, 0xfd18, 0xef2c
};

make_crc_kernel_r16_t4(Rx0589)

#endif
