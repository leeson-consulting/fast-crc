#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc16_Rx6f63_Profile =
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

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const crc16_Rx6f63_tbl[256] =
{
    0x0000, 0x41cd, 0x839a, 0xc257, 0x8ad9, 0xcb14, 0x0943, 0x488e,
    0x985f, 0xd992, 0x1bc5, 0x5a08, 0x1286, 0x534b, 0x911c, 0xd0d1,
    0xbd53, 0xfc9e, 0x3ec9, 0x7f04, 0x378a, 0x7647, 0xb410, 0xf5dd,
    0x250c, 0x64c1, 0xa696, 0xe75b, 0xafd5, 0xee18, 0x2c4f, 0x6d82,
    0xf74b, 0xb686, 0x74d1, 0x351c, 0x7d92, 0x3c5f, 0xfe08, 0xbfc5,
    0x6f14, 0x2ed9, 0xec8e, 0xad43, 0xe5cd, 0xa400, 0x6657, 0x279a,
    0x4a18, 0x0bd5, 0xc982, 0x884f, 0xc0c1, 0x810c, 0x435b, 0x0296,
    0xd247, 0x938a, 0x51dd, 0x1010, 0x589e, 0x1953, 0xdb04, 0x9ac9,
    0x637b, 0x22b6, 0xe0e1, 0xa12c, 0xe9a2, 0xa86f, 0x6a38, 0x2bf5,
    0xfb24, 0xbae9, 0x78be, 0x3973, 0x71fd, 0x3030, 0xf267, 0xb3aa,
    0xde28, 0x9fe5, 0x5db2, 0x1c7f, 0x54f1, 0x153c, 0xd76b, 0x96a6,
    0x4677, 0x07ba, 0xc5ed, 0x8420, 0xccae, 0x8d63, 0x4f34, 0x0ef9,
    0x9430, 0xd5fd, 0x17aa, 0x5667, 0x1ee9, 0x5f24, 0x9d73, 0xdcbe,
    0x0c6f, 0x4da2, 0x8ff5, 0xce38, 0x86b6, 0xc77b, 0x052c, 0x44e1,
    0x2963, 0x68ae, 0xaaf9, 0xeb34, 0xa3ba, 0xe277, 0x2020, 0x61ed,
    0xb13c, 0xf0f1, 0x32a6, 0x736b, 0x3be5, 0x7a28, 0xb87f, 0xf9b2,
    0xc6f6, 0x873b, 0x456c, 0x04a1, 0x4c2f, 0x0de2, 0xcfb5, 0x8e78,
    0x5ea9, 0x1f64, 0xdd33, 0x9cfe, 0xd470, 0x95bd, 0x57ea, 0x1627,
    0x7ba5, 0x3a68, 0xf83f, 0xb9f2, 0xf17c, 0xb0b1, 0x72e6, 0x332b,
    0xe3fa, 0xa237, 0x6060, 0x21ad, 0x6923, 0x28ee, 0xeab9, 0xab74,
    0x31bd, 0x7070, 0xb227, 0xf3ea, 0xbb64, 0xfaa9, 0x38fe, 0x7933,
    0xa9e2, 0xe82f, 0x2a78, 0x6bb5, 0x233b, 0x62f6, 0xa0a1, 0xe16c,
    0x8cee, 0xcd23, 0x0f74, 0x4eb9, 0x0637, 0x47fa, 0x85ad, 0xc460,
    0x14b1, 0x557c, 0x972b, 0xd6e6, 0x9e68, 0xdfa5, 0x1df2, 0x5c3f,
    0xa58d, 0xe440, 0x2617, 0x67da, 0x2f54, 0x6e99, 0xacce, 0xed03,
    0x3dd2, 0x7c1f, 0xbe48, 0xff85, 0xb70b, 0xf6c6, 0x3491, 0x755c,
    0x18de, 0x5913, 0x9b44, 0xda89, 0x9207, 0xd3ca, 0x119d, 0x5050,
    0x8081, 0xc14c, 0x031b, 0x42d6, 0x0a58, 0x4b95, 0x89c2, 0xc80f,
    0x52c6, 0x130b, 0xd15c, 0x9091, 0xd81f, 0x99d2, 0x5b85, 0x1a48,
    0xca99, 0x8b54, 0x4903, 0x08ce, 0x4040, 0x018d, 0xc3da, 0x8217,
    0xef95, 0xae58, 0x6c0f, 0x2dc2, 0x654c, 0x2481, 0xe6d6, 0xa71b,
    0x77ca, 0x3607, 0xf450, 0xb59d, 0xfd13, 0xbcde, 0x7e89, 0x3f44
};

make_crc_kernel_r16_t8(Rx6f63)

#else

static uint16_t const crc16_Rx6f63_tbl[16] =
{
    0x0000, 0xbd53, 0xf74b, 0x4a18, 0x637b, 0xde28, 0x9430, 0x2963,
    0xc6f6, 0x7ba5, 0x31bd, 0x8cee, 0xa58d, 0x18de, 0x52c6, 0xef95
};

make_crc_kernel_r16_t4(Rx6f63)

#endif
