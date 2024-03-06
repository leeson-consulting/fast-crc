#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc24_Rx328b63_Profile =
// {
//   "id" : {
//     "polynomial" : "x^24 + x^21 + x^20 + x^17 + x^15 + x^11 + x^9 + x^8 + x^6 + x^5 + x^1 + 1",
//     "degree"     : 24,
//     "explicit"   : "0x1328b63",
//     "koopman"    : "0x9945b1",
//     "normal"     : "0x328b63"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 8388583, "bytes"   : 1048572 },
//     /* 4 */ { "bits"    : 8388583, "bytes"   : 1048572 },
//     /* 5 */ { "bits"    : 822, "bytes"   : 102 },
//     /* 6 */ { "bits"    : 822, "bytes"   : 102 },
//     /* 7 */ { "bits"    : 37, "bytes"   : 4 },
//     /* 8 */ { "bits"    : 37, "bytes"   : 4 },
//     /* 9 */ { "bits"    : 12, "bytes"   : 1 },
//     /* 10 */ { "bits"    : 12, "bytes"   : 1 },
//     /* 11 */ { "bits"    : 6, "bytes"   : 0 },
//     /* 12 */ { "bits"    : 6, "bytes"   : 0 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint32_t const Rx328b63[256] =
{
    0x000000, 0xb08375, 0xeca473, 0x5c2706, 0x54ea7f, 0xe4690a, 0xb84e0c, 0x08cd79,
    0xa9d4fe, 0x19578b, 0x45708d, 0xf5f3f8, 0xfd3e81, 0x4dbdf4, 0x119af2, 0xa11987,
    0xde0b65, 0x6e8810, 0x32af16, 0x822c63, 0x8ae11a, 0x3a626f, 0x664569, 0xd6c61c,
    0x77df9b, 0xc75cee, 0x9b7be8, 0x2bf89d, 0x2335e4, 0x93b691, 0xcf9197, 0x7f12e2,
    0x31b453, 0x813726, 0xdd1020, 0x6d9355, 0x655e2c, 0xd5dd59, 0x89fa5f, 0x39792a,
    0x9860ad, 0x28e3d8, 0x74c4de, 0xc447ab, 0xcc8ad2, 0x7c09a7, 0x202ea1, 0x90add4,
    0xefbf36, 0x5f3c43, 0x031b45, 0xb39830, 0xbb5549, 0x0bd63c, 0x57f13a, 0xe7724f,
    0x466bc8, 0xf6e8bd, 0xaacfbb, 0x1a4cce, 0x1281b7, 0xa202c2, 0xfe25c4, 0x4ea6b1,
    0x6368a6, 0xd3ebd3, 0x8fccd5, 0x3f4fa0, 0x3782d9, 0x8701ac, 0xdb26aa, 0x6ba5df,
    0xcabc58, 0x7a3f2d, 0x26182b, 0x969b5e, 0x9e5627, 0x2ed552, 0x72f254, 0xc27121,
    0xbd63c3, 0x0de0b6, 0x51c7b0, 0xe144c5, 0xe989bc, 0x590ac9, 0x052dcf, 0xb5aeba,
    0x14b73d, 0xa43448, 0xf8134e, 0x48903b, 0x405d42, 0xf0de37, 0xacf931, 0x1c7a44,
    0x52dcf5, 0xe25f80, 0xbe7886, 0x0efbf3, 0x06368a, 0xb6b5ff, 0xea92f9, 0x5a118c,
    0xfb080b, 0x4b8b7e, 0x17ac78, 0xa72f0d, 0xafe274, 0x1f6101, 0x434607, 0xf3c572,
    0x8cd790, 0x3c54e5, 0x6073e3, 0xd0f096, 0xd83def, 0x68be9a, 0x34999c, 0x841ae9,
    0x25036e, 0x95801b, 0xc9a71d, 0x792468, 0x71e911, 0xc16a64, 0x9d4d62, 0x2dce17,
    0xc6d14c, 0x765239, 0x2a753f, 0x9af64a, 0x923b33, 0x22b846, 0x7e9f40, 0xce1c35,
    0x6f05b2, 0xdf86c7, 0x83a1c1, 0x3322b4, 0x3befcd, 0x8b6cb8, 0xd74bbe, 0x67c8cb,
    0x18da29, 0xa8595c, 0xf47e5a, 0x44fd2f, 0x4c3056, 0xfcb323, 0xa09425, 0x101750,
    0xb10ed7, 0x018da2, 0x5daaa4, 0xed29d1, 0xe5e4a8, 0x5567dd, 0x0940db, 0xb9c3ae,
    0xf7651f, 0x47e66a, 0x1bc16c, 0xab4219, 0xa38f60, 0x130c15, 0x4f2b13, 0xffa866,
    0x5eb1e1, 0xee3294, 0xb21592, 0x0296e7, 0x0a5b9e, 0xbad8eb, 0xe6ffed, 0x567c98,
    0x296e7a, 0x99ed0f, 0xc5ca09, 0x75497c, 0x7d8405, 0xcd0770, 0x912076, 0x21a303,
    0x80ba84, 0x3039f1, 0x6c1ef7, 0xdc9d82, 0xd450fb, 0x64d38e, 0x38f488, 0x8877fd,
    0xa5b9ea, 0x153a9f, 0x491d99, 0xf99eec, 0xf15395, 0x41d0e0, 0x1df7e6, 0xad7493,
    0x0c6d14, 0xbcee61, 0xe0c967, 0x504a12, 0x58876b, 0xe8041e, 0xb42318, 0x04a06d,
    0x7bb28f, 0xcb31fa, 0x9716fc, 0x279589, 0x2f58f0, 0x9fdb85, 0xc3fc83, 0x737ff6,
    0xd26671, 0x62e504, 0x3ec202, 0x8e4177, 0x868c0e, 0x360f7b, 0x6a287d, 0xdaab08,
    0x940db9, 0x248ecc, 0x78a9ca, 0xc82abf, 0xc0e7c6, 0x7064b3, 0x2c43b5, 0x9cc0c0,
    0x3dd947, 0x8d5a32, 0xd17d34, 0x61fe41, 0x693338, 0xd9b04d, 0x85974b, 0x35143e,
    0x4a06dc, 0xfa85a9, 0xa6a2af, 0x1621da, 0x1eeca3, 0xae6fd6, 0xf248d0, 0x42cba5,
    0xe3d222, 0x535157, 0x0f7651, 0xbff524, 0xb7385d, 0x07bb28, 0x5b9c2e, 0xeb1f5b
};

make_crc_kernel_r24_t8(Rx328b63)

#else

static uint32_t const Rx328b63[16] =
{
    0x000000, 0xde0b65, 0x31b453, 0xefbf36, 0x6368a6, 0xbd63c3, 0x52dcf5, 0x8cd790,
    0xc6d14c, 0x18da29, 0xf7651f, 0x296e7a, 0xa5b9ea, 0x7bb28f, 0x940db9, 0x4a06dc
};

make_crc_kernel_r24_t4(Rx328b63)

#endif
