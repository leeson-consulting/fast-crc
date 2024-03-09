#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc16_Sx002f_Profile =
// {
//   "polynomial" : "x^16 + x^5 + x^3 + x^2 + x^1 + 1",
//   "degree"     : 16,
//   "explicit"   : "0x1002f",
//   "koopman"    : "0x8017",
//   "normal"     : "0x2f"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const crc16_Sx002f_tbl[256] =
{
    0x0000, 0x002f, 0x005e, 0x0071, 0x00bc, 0x0093, 0x00e2, 0x00cd,
    0x0178, 0x0157, 0x0126, 0x0109, 0x01c4, 0x01eb, 0x019a, 0x01b5,
    0x02f0, 0x02df, 0x02ae, 0x0281, 0x024c, 0x0263, 0x0212, 0x023d,
    0x0388, 0x03a7, 0x03d6, 0x03f9, 0x0334, 0x031b, 0x036a, 0x0345,
    0x05e0, 0x05cf, 0x05be, 0x0591, 0x055c, 0x0573, 0x0502, 0x052d,
    0x0498, 0x04b7, 0x04c6, 0x04e9, 0x0424, 0x040b, 0x047a, 0x0455,
    0x0710, 0x073f, 0x074e, 0x0761, 0x07ac, 0x0783, 0x07f2, 0x07dd,
    0x0668, 0x0647, 0x0636, 0x0619, 0x06d4, 0x06fb, 0x068a, 0x06a5,
    0x0bc0, 0x0bef, 0x0b9e, 0x0bb1, 0x0b7c, 0x0b53, 0x0b22, 0x0b0d,
    0x0ab8, 0x0a97, 0x0ae6, 0x0ac9, 0x0a04, 0x0a2b, 0x0a5a, 0x0a75,
    0x0930, 0x091f, 0x096e, 0x0941, 0x098c, 0x09a3, 0x09d2, 0x09fd,
    0x0848, 0x0867, 0x0816, 0x0839, 0x08f4, 0x08db, 0x08aa, 0x0885,
    0x0e20, 0x0e0f, 0x0e7e, 0x0e51, 0x0e9c, 0x0eb3, 0x0ec2, 0x0eed,
    0x0f58, 0x0f77, 0x0f06, 0x0f29, 0x0fe4, 0x0fcb, 0x0fba, 0x0f95,
    0x0cd0, 0x0cff, 0x0c8e, 0x0ca1, 0x0c6c, 0x0c43, 0x0c32, 0x0c1d,
    0x0da8, 0x0d87, 0x0df6, 0x0dd9, 0x0d14, 0x0d3b, 0x0d4a, 0x0d65,
    0x1780, 0x17af, 0x17de, 0x17f1, 0x173c, 0x1713, 0x1762, 0x174d,
    0x16f8, 0x16d7, 0x16a6, 0x1689, 0x1644, 0x166b, 0x161a, 0x1635,
    0x1570, 0x155f, 0x152e, 0x1501, 0x15cc, 0x15e3, 0x1592, 0x15bd,
    0x1408, 0x1427, 0x1456, 0x1479, 0x14b4, 0x149b, 0x14ea, 0x14c5,
    0x1260, 0x124f, 0x123e, 0x1211, 0x12dc, 0x12f3, 0x1282, 0x12ad,
    0x1318, 0x1337, 0x1346, 0x1369, 0x13a4, 0x138b, 0x13fa, 0x13d5,
    0x1090, 0x10bf, 0x10ce, 0x10e1, 0x102c, 0x1003, 0x1072, 0x105d,
    0x11e8, 0x11c7, 0x11b6, 0x1199, 0x1154, 0x117b, 0x110a, 0x1125,
    0x1c40, 0x1c6f, 0x1c1e, 0x1c31, 0x1cfc, 0x1cd3, 0x1ca2, 0x1c8d,
    0x1d38, 0x1d17, 0x1d66, 0x1d49, 0x1d84, 0x1dab, 0x1dda, 0x1df5,
    0x1eb0, 0x1e9f, 0x1eee, 0x1ec1, 0x1e0c, 0x1e23, 0x1e52, 0x1e7d,
    0x1fc8, 0x1fe7, 0x1f96, 0x1fb9, 0x1f74, 0x1f5b, 0x1f2a, 0x1f05,
    0x19a0, 0x198f, 0x19fe, 0x19d1, 0x191c, 0x1933, 0x1942, 0x196d,
    0x18d8, 0x18f7, 0x1886, 0x18a9, 0x1864, 0x184b, 0x183a, 0x1815,
    0x1b50, 0x1b7f, 0x1b0e, 0x1b21, 0x1bec, 0x1bc3, 0x1bb2, 0x1b9d,
    0x1a28, 0x1a07, 0x1a76, 0x1a59, 0x1a94, 0x1abb, 0x1aca, 0x1ae5
};



#else

static uint16_t const crc16_Sx002f_tbl[16] =
{
    0x0000, 0x002f, 0x005e, 0x0071, 0x00bc, 0x0093, 0x00e2, 0x00cd,
    0x0178, 0x0157, 0x0126, 0x0109, 0x01c4, 0x01eb, 0x019a, 0x01b5
};



#endif
