#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc16_Rx011b_Profile =
// {
//   "id" : {
//     "polynomial" : "x^16 + x^8 + x^4 + x^3 + x^1 + 1",
//     "degree"     : 16,
//     "explicit"   : "0x1011b",
//     "koopman"    : "0x808d",
//     "normal"     : "0x11b"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 28642, "bytes"   : 3580 },
//     /* 4 */ { "bits"    : 28642, "bytes"   : 3580 },
//     /* 5 */ { "bits"    : 99, "bytes"   : 12 },
//     /* 6 */ { "bits"    : 99, "bytes"   : 12 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const Rx011b[256] =
{
    0x0000, 0x01b1, 0x0362, 0x02d3, 0x06c4, 0x0775, 0x05a6, 0x0417,
    0x0d88, 0x0c39, 0x0eea, 0x0f5b, 0x0b4c, 0x0afd, 0x082e, 0x099f,
    0x1b10, 0x1aa1, 0x1872, 0x19c3, 0x1dd4, 0x1c65, 0x1eb6, 0x1f07,
    0x1698, 0x1729, 0x15fa, 0x144b, 0x105c, 0x11ed, 0x133e, 0x128f,
    0x3620, 0x3791, 0x3542, 0x34f3, 0x30e4, 0x3155, 0x3386, 0x3237,
    0x3ba8, 0x3a19, 0x38ca, 0x397b, 0x3d6c, 0x3cdd, 0x3e0e, 0x3fbf,
    0x2d30, 0x2c81, 0x2e52, 0x2fe3, 0x2bf4, 0x2a45, 0x2896, 0x2927,
    0x20b8, 0x2109, 0x23da, 0x226b, 0x267c, 0x27cd, 0x251e, 0x24af,
    0x6c40, 0x6df1, 0x6f22, 0x6e93, 0x6a84, 0x6b35, 0x69e6, 0x6857,
    0x61c8, 0x6079, 0x62aa, 0x631b, 0x670c, 0x66bd, 0x646e, 0x65df,
    0x7750, 0x76e1, 0x7432, 0x7583, 0x7194, 0x7025, 0x72f6, 0x7347,
    0x7ad8, 0x7b69, 0x79ba, 0x780b, 0x7c1c, 0x7dad, 0x7f7e, 0x7ecf,
    0x5a60, 0x5bd1, 0x5902, 0x58b3, 0x5ca4, 0x5d15, 0x5fc6, 0x5e77,
    0x57e8, 0x5659, 0x548a, 0x553b, 0x512c, 0x509d, 0x524e, 0x53ff,
    0x4170, 0x40c1, 0x4212, 0x43a3, 0x47b4, 0x4605, 0x44d6, 0x4567,
    0x4cf8, 0x4d49, 0x4f9a, 0x4e2b, 0x4a3c, 0x4b8d, 0x495e, 0x48ef,
    0xd880, 0xd931, 0xdbe2, 0xda53, 0xde44, 0xdff5, 0xdd26, 0xdc97,
    0xd508, 0xd4b9, 0xd66a, 0xd7db, 0xd3cc, 0xd27d, 0xd0ae, 0xd11f,
    0xc390, 0xc221, 0xc0f2, 0xc143, 0xc554, 0xc4e5, 0xc636, 0xc787,
    0xce18, 0xcfa9, 0xcd7a, 0xcccb, 0xc8dc, 0xc96d, 0xcbbe, 0xca0f,
    0xeea0, 0xef11, 0xedc2, 0xec73, 0xe864, 0xe9d5, 0xeb06, 0xeab7,
    0xe328, 0xe299, 0xe04a, 0xe1fb, 0xe5ec, 0xe45d, 0xe68e, 0xe73f,
    0xf5b0, 0xf401, 0xf6d2, 0xf763, 0xf374, 0xf2c5, 0xf016, 0xf1a7,
    0xf838, 0xf989, 0xfb5a, 0xfaeb, 0xfefc, 0xff4d, 0xfd9e, 0xfc2f,
    0xb4c0, 0xb571, 0xb7a2, 0xb613, 0xb204, 0xb3b5, 0xb166, 0xb0d7,
    0xb948, 0xb8f9, 0xba2a, 0xbb9b, 0xbf8c, 0xbe3d, 0xbcee, 0xbd5f,
    0xafd0, 0xae61, 0xacb2, 0xad03, 0xa914, 0xa8a5, 0xaa76, 0xabc7,
    0xa258, 0xa3e9, 0xa13a, 0xa08b, 0xa49c, 0xa52d, 0xa7fe, 0xa64f,
    0x82e0, 0x8351, 0x8182, 0x8033, 0x8424, 0x8595, 0x8746, 0x86f7,
    0x8f68, 0x8ed9, 0x8c0a, 0x8dbb, 0x89ac, 0x881d, 0x8ace, 0x8b7f,
    0x99f0, 0x9841, 0x9a92, 0x9b23, 0x9f34, 0x9e85, 0x9c56, 0x9de7,
    0x9478, 0x95c9, 0x971a, 0x96ab, 0x92bc, 0x930d, 0x91de, 0x906f
};

make_crc_kernel_r16_t8(Rx011b)

#else

static uint16_t const Rx011b[16] =
{
    0x0000, 0x1b10, 0x3620, 0x2d30, 0x6c40, 0x7750, 0x5a60, 0x4170,
    0xd880, 0xc390, 0xeea0, 0xf5b0, 0xb4c0, 0xafd0, 0x82e0, 0x99f0
};

make_crc_kernel_r16_t4(Rx011b)

#endif
