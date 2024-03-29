#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc32_Rx741b8cd7_Profile =
// {
//   "id" : {
//     "polynomial" : "x^32 + x^30 + x^29 + x^28 + x^26 + x^20 + x^19 + x^17 + x^16 + x^15 + x^11 + x^10 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
//     "degree"     : 32,
//     "explicit"   : "0x1741b8cd7",
//     "koopman"    : "0xba0dc66b",
//     "normal"     : "0x741b8cd7"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 114663, "bytes"   : 14332 },
//     /* 4 */ { "bits"    : 114663, "bytes"   : 14332 },
//     /* 5 */ { "bits"    : 16360, "bytes"   : 2045 },
//     /* 6 */ { "bits"    : 16360, "bytes"   : 2045 },
//     /* 7 */ { "bits"    : 152, "bytes"   : 19 },
//     /* 8 */ { "bits"    : 152, "bytes"   : 19 },
//     /* 9 */ { "bits"    : 18, "bytes"   : 2 },
//     /* 10 */ { "bits"    : 18, "bytes"   : 2 },
//     /* 11 */ { "bits"    : 16, "bytes"   : 2 },
//     /* 12 */ { "bits"    : 16, "bytes"   : 2 },
//     /* 13 */ { "bits"    : 4, "bytes"   : 0 },
//     /* 14 */ { "bits"    : 4, "bytes"   : 0 },
//     /* 15 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 16 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 17 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 18 */ { "bits"    : 2, "bytes"   : 0 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint32_t const crc32_Rx741b8cd7_tbl[256] =
{
    0x00000000, 0x9695c4ca, 0xfb4839c9, 0x6dddfd03, 0x20f3c3cf, 0xb6660705, 0xdbbbfa06, 0x4d2e3ecc,
    0x41e7879e, 0xd7724354, 0xbaafbe57, 0x2c3a7a9d, 0x61144451, 0xf781809b, 0x9a5c7d98, 0x0cc9b952,
    0x83cf0f3c, 0x155acbf6, 0x788736f5, 0xee12f23f, 0xa33cccf3, 0x35a90839, 0x5874f53a, 0xcee131f0,
    0xc22888a2, 0x54bd4c68, 0x3960b16b, 0xaff575a1, 0xe2db4b6d, 0x744e8fa7, 0x199372a4, 0x8f06b66e,
    0xd1fdae25, 0x47686aef, 0x2ab597ec, 0xbc205326, 0xf10e6dea, 0x679ba920, 0x0a465423, 0x9cd390e9,
    0x901a29bb, 0x068fed71, 0x6b521072, 0xfdc7d4b8, 0xb0e9ea74, 0x267c2ebe, 0x4ba1d3bd, 0xdd341777,
    0x5232a119, 0xc4a765d3, 0xa97a98d0, 0x3fef5c1a, 0x72c162d6, 0xe454a61c, 0x89895b1f, 0x1f1c9fd5,
    0x13d52687, 0x8540e24d, 0xe89d1f4e, 0x7e08db84, 0x3326e548, 0xa5b32182, 0xc86edc81, 0x5efb184b,
    0x7598ec17, 0xe30d28dd, 0x8ed0d5de, 0x18451114, 0x556b2fd8, 0xc3feeb12, 0xae231611, 0x38b6d2db,
    0x347f6b89, 0xa2eaaf43, 0xcf375240, 0x59a2968a, 0x148ca846, 0x82196c8c, 0xefc4918f, 0x79515545,
    0xf657e32b, 0x60c227e1, 0x0d1fdae2, 0x9b8a1e28, 0xd6a420e4, 0x4031e42e, 0x2dec192d, 0xbb79dde7,
    0xb7b064b5, 0x2125a07f, 0x4cf85d7c, 0xda6d99b6, 0x9743a77a, 0x01d663b0, 0x6c0b9eb3, 0xfa9e5a79,
    0xa4654232, 0x32f086f8, 0x5f2d7bfb, 0xc9b8bf31, 0x849681fd, 0x12034537, 0x7fdeb834, 0xe94b7cfe,
    0xe582c5ac, 0x73170166, 0x1ecafc65, 0x885f38af, 0xc5710663, 0x53e4c2a9, 0x3e393faa, 0xa8acfb60,
    0x27aa4d0e, 0xb13f89c4, 0xdce274c7, 0x4a77b00d, 0x07598ec1, 0x91cc4a0b, 0xfc11b708, 0x6a8473c2,
    0x664dca90, 0xf0d80e5a, 0x9d05f359, 0x0b903793, 0x46be095f, 0xd02bcd95, 0xbdf63096, 0x2b63f45c,
    0xeb31d82e, 0x7da41ce4, 0x1079e1e7, 0x86ec252d, 0xcbc21be1, 0x5d57df2b, 0x308a2228, 0xa61fe6e2,
    0xaad65fb0, 0x3c439b7a, 0x519e6679, 0xc70ba2b3, 0x8a259c7f, 0x1cb058b5, 0x716da5b6, 0xe7f8617c,
    0x68fed712, 0xfe6b13d8, 0x93b6eedb, 0x05232a11, 0x480d14dd, 0xde98d017, 0xb3452d14, 0x25d0e9de,
    0x2919508c, 0xbf8c9446, 0xd2516945, 0x44c4ad8f, 0x09ea9343, 0x9f7f5789, 0xf2a2aa8a, 0x64376e40,
    0x3acc760b, 0xac59b2c1, 0xc1844fc2, 0x57118b08, 0x1a3fb5c4, 0x8caa710e, 0xe1778c0d, 0x77e248c7,
    0x7b2bf195, 0xedbe355f, 0x8063c85c, 0x16f60c96, 0x5bd8325a, 0xcd4df690, 0xa0900b93, 0x3605cf59,
    0xb9037937, 0x2f96bdfd, 0x424b40fe, 0xd4de8434, 0x99f0baf8, 0x0f657e32, 0x62b88331, 0xf42d47fb,
    0xf8e4fea9, 0x6e713a63, 0x03acc760, 0x953903aa, 0xd8173d66, 0x4e82f9ac, 0x235f04af, 0xb5cac065,
    0x9ea93439, 0x083cf0f3, 0x65e10df0, 0xf374c93a, 0xbe5af7f6, 0x28cf333c, 0x4512ce3f, 0xd3870af5,
    0xdf4eb3a7, 0x49db776d, 0x24068a6e, 0xb2934ea4, 0xffbd7068, 0x6928b4a2, 0x04f549a1, 0x92608d6b,
    0x1d663b05, 0x8bf3ffcf, 0xe62e02cc, 0x70bbc606, 0x3d95f8ca, 0xab003c00, 0xc6ddc103, 0x504805c9,
    0x5c81bc9b, 0xca147851, 0xa7c98552, 0x315c4198, 0x7c727f54, 0xeae7bb9e, 0x873a469d, 0x11af8257,
    0x4f549a1c, 0xd9c15ed6, 0xb41ca3d5, 0x2289671f, 0x6fa759d3, 0xf9329d19, 0x94ef601a, 0x027aa4d0,
    0x0eb31d82, 0x9826d948, 0xf5fb244b, 0x636ee081, 0x2e40de4d, 0xb8d51a87, 0xd508e784, 0x439d234e,
    0xcc9b9520, 0x5a0e51ea, 0x37d3ace9, 0xa1466823, 0xec6856ef, 0x7afd9225, 0x17206f26, 0x81b5abec,
    0x8d7c12be, 0x1be9d674, 0x76342b77, 0xe0a1efbd, 0xad8fd171, 0x3b1a15bb, 0x56c7e8b8, 0xc0522c72
};

make_crc_kernel_r32_t8(Rx741b8cd7)

#else

static uint32_t const crc32_Rx741b8cd7_tbl[16] =
{
    0x00000000, 0x83cf0f3c, 0xd1fdae25, 0x5232a119, 0x7598ec17, 0xf657e32b, 0xa4654232, 0x27aa4d0e,
    0xeb31d82e, 0x68fed712, 0x3acc760b, 0xb9037937, 0x9ea93439, 0x1d663b05, 0x4f549a1c, 0xcc9b9520
};

make_crc_kernel_r32_t4(Rx741b8cd7)

#endif
