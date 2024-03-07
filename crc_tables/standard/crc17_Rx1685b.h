#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc17_Rx1685b_Profile =
// {
//   "id" : {
//     "polynomial" : "x^17 + x^16 + x^14 + x^13 + x^11 + x^6 + x^4 + x^3 + x^1 + 1",
//     "degree"     : 17,
//     "explicit"   : "0x3685b",
//     "koopman"    : "0x1b42d",
//     "normal"     : "0x1685b"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 238, "bytes"   : 29 },
//     /* 4 */ { "bits"    : 238, "bytes"   : 29 },
//     /* 5 */ { "bits"    : 238, "bytes"   : 29 },
//     /* 6 */ { "bits"    : 238, "bytes"   : 29 },
//     /* 7 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 8 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 9 */ { "bits"    : 2, "bytes"   : 0 },
//     /* 10 */ { "bits"    : 2, "bytes"   : 0 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint32_t const Rx1685b[256] =
{
    0x00000, 0x1bc34, 0x01033, 0x1ac07, 0x02066, 0x19c52, 0x03055, 0x18c61,
    0x040cc, 0x1fcf8, 0x050ff, 0x1eccb, 0x060aa, 0x1dc9e, 0x07099, 0x1ccad,
    0x08198, 0x13dac, 0x091ab, 0x12d9f, 0x0a1fe, 0x11dca, 0x0b1cd, 0x10df9,
    0x0c154, 0x17d60, 0x0d167, 0x16d53, 0x0e132, 0x15d06, 0x0f101, 0x14d35,
    0x10330, 0x0bf04, 0x11303, 0x0af37, 0x12356, 0x09f62, 0x13365, 0x08f51,
    0x143fc, 0x0ffc8, 0x153cf, 0x0effb, 0x1639a, 0x0dfae, 0x173a9, 0x0cf9d,
    0x182a8, 0x03e9c, 0x1929b, 0x02eaf, 0x1a2ce, 0x01efa, 0x1b2fd, 0x00ec9,
    0x1c264, 0x07e50, 0x1d257, 0x06e63, 0x1e202, 0x05e36, 0x1f231, 0x04e05,
    0x16e3b, 0x0d20f, 0x17e08, 0x0c23c, 0x14e5d, 0x0f269, 0x15e6e, 0x0e25a,
    0x12ef7, 0x092c3, 0x13ec4, 0x082f0, 0x10e91, 0x0b2a5, 0x11ea2, 0x0a296,
    0x1efa3, 0x05397, 0x1ff90, 0x043a4, 0x1cfc5, 0x073f1, 0x1dff6, 0x063c2,
    0x1af6f, 0x0135b, 0x1bf5c, 0x00368, 0x18f09, 0x0333d, 0x19f3a, 0x0230e,
    0x06d0b, 0x1d13f, 0x07d38, 0x1c10c, 0x04d6d, 0x1f159, 0x05d5e, 0x1e16a,
    0x02dc7, 0x191f3, 0x03df4, 0x181c0, 0x00da1, 0x1b195, 0x01d92, 0x1a1a6,
    0x0ec93, 0x150a7, 0x0fca0, 0x14094, 0x0ccf5, 0x170c1, 0x0dcc6, 0x160f2,
    0x0ac5f, 0x1106b, 0x0bc6c, 0x10058, 0x08c39, 0x1300d, 0x09c0a, 0x1203e,
    0x1b42d, 0x00819, 0x1a41e, 0x0182a, 0x1944b, 0x0287f, 0x18478, 0x0384c,
    0x1f4e1, 0x048d5, 0x1e4d2, 0x058e6, 0x1d487, 0x068b3, 0x1c4b4, 0x07880,
    0x135b5, 0x08981, 0x12586, 0x099b2, 0x115d3, 0x0a9e7, 0x105e0, 0x0b9d4,
    0x17579, 0x0c94d, 0x1654a, 0x0d97e, 0x1551f, 0x0e92b, 0x1452c, 0x0f918,
    0x0b71d, 0x10b29, 0x0a72e, 0x11b1a, 0x0977b, 0x12b4f, 0x08748, 0x13b7c,
    0x0f7d1, 0x14be5, 0x0e7e2, 0x15bd6, 0x0d7b7, 0x16b83, 0x0c784, 0x17bb0,
    0x03685, 0x18ab1, 0x026b6, 0x19a82, 0x016e3, 0x1aad7, 0x006d0, 0x1bae4,
    0x07649, 0x1ca7d, 0x0667a, 0x1da4e, 0x0562f, 0x1ea1b, 0x0461c, 0x1fa28,
    0x0da16, 0x16622, 0x0ca25, 0x17611, 0x0fa70, 0x14644, 0x0ea43, 0x15677,
    0x09ada, 0x126ee, 0x08ae9, 0x136dd, 0x0babc, 0x10688, 0x0aa8f, 0x116bb,
    0x05b8e, 0x1e7ba, 0x04bbd, 0x1f789, 0x07be8, 0x1c7dc, 0x06bdb, 0x1d7ef,
    0x01b42, 0x1a776, 0x00b71, 0x1b745, 0x03b24, 0x18710, 0x02b17, 0x19723,
    0x1d926, 0x06512, 0x1c915, 0x07521, 0x1f940, 0x04574, 0x1e973, 0x05547,
    0x199ea, 0x025de, 0x189d9, 0x035ed, 0x1b98c, 0x005b8, 0x1a9bf, 0x0158b,
    0x158be, 0x0e48a, 0x1488d, 0x0f4b9, 0x178d8, 0x0c4ec, 0x168eb, 0x0d4df,
    0x11872, 0x0a446, 0x10841, 0x0b475, 0x13814, 0x08420, 0x12827, 0x09413
};

make_crc_kernel_r17_t8(Rx1685b)

#else

static uint32_t const Rx1685b[16] =
{
    0x00000, 0x08198, 0x10330, 0x182a8, 0x16e3b, 0x1efa3, 0x06d0b, 0x0ec93,
    0x1b42d, 0x135b5, 0x0b71d, 0x03685, 0x0da16, 0x05b8e, 0x1d926, 0x158be
};

make_crc_kernel_r17_t4(Rx1685b)

#endif
