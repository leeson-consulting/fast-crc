#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc6_Rx07_Profile =
// {
//   "polynomial" : "x^6 + x^2 + x^1 + 1",
//   "degree"     : 6,
//   "explicit"   : "0x47",
//   "koopman"    : "0x23",
//   "normal"     : "0x7"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const crc6_Rx07_tbl[256] =
{
    0x00, 0x15, 0x2a, 0x3f, 0x25, 0x30, 0x0f, 0x1a, 0x3b, 0x2e, 0x11, 0x04, 0x1e, 0x0b, 0x34, 0x21,
    0x07, 0x12, 0x2d, 0x38, 0x22, 0x37, 0x08, 0x1d, 0x3c, 0x29, 0x16, 0x03, 0x19, 0x0c, 0x33, 0x26,
    0x0e, 0x1b, 0x24, 0x31, 0x2b, 0x3e, 0x01, 0x14, 0x35, 0x20, 0x1f, 0x0a, 0x10, 0x05, 0x3a, 0x2f,
    0x09, 0x1c, 0x23, 0x36, 0x2c, 0x39, 0x06, 0x13, 0x32, 0x27, 0x18, 0x0d, 0x17, 0x02, 0x3d, 0x28,
    0x1c, 0x09, 0x36, 0x23, 0x39, 0x2c, 0x13, 0x06, 0x27, 0x32, 0x0d, 0x18, 0x02, 0x17, 0x28, 0x3d,
    0x1b, 0x0e, 0x31, 0x24, 0x3e, 0x2b, 0x14, 0x01, 0x20, 0x35, 0x0a, 0x1f, 0x05, 0x10, 0x2f, 0x3a,
    0x12, 0x07, 0x38, 0x2d, 0x37, 0x22, 0x1d, 0x08, 0x29, 0x3c, 0x03, 0x16, 0x0c, 0x19, 0x26, 0x33,
    0x15, 0x00, 0x3f, 0x2a, 0x30, 0x25, 0x1a, 0x0f, 0x2e, 0x3b, 0x04, 0x11, 0x0b, 0x1e, 0x21, 0x34,
    0x38, 0x2d, 0x12, 0x07, 0x1d, 0x08, 0x37, 0x22, 0x03, 0x16, 0x29, 0x3c, 0x26, 0x33, 0x0c, 0x19,
    0x3f, 0x2a, 0x15, 0x00, 0x1a, 0x0f, 0x30, 0x25, 0x04, 0x11, 0x2e, 0x3b, 0x21, 0x34, 0x0b, 0x1e,
    0x36, 0x23, 0x1c, 0x09, 0x13, 0x06, 0x39, 0x2c, 0x0d, 0x18, 0x27, 0x32, 0x28, 0x3d, 0x02, 0x17,
    0x31, 0x24, 0x1b, 0x0e, 0x14, 0x01, 0x3e, 0x2b, 0x0a, 0x1f, 0x20, 0x35, 0x2f, 0x3a, 0x05, 0x10,
    0x24, 0x31, 0x0e, 0x1b, 0x01, 0x14, 0x2b, 0x3e, 0x1f, 0x0a, 0x35, 0x20, 0x3a, 0x2f, 0x10, 0x05,
    0x23, 0x36, 0x09, 0x1c, 0x06, 0x13, 0x2c, 0x39, 0x18, 0x0d, 0x32, 0x27, 0x3d, 0x28, 0x17, 0x02,
    0x2a, 0x3f, 0x00, 0x15, 0x0f, 0x1a, 0x25, 0x30, 0x11, 0x04, 0x3b, 0x2e, 0x34, 0x21, 0x1e, 0x0b,
    0x2d, 0x38, 0x07, 0x12, 0x08, 0x1d, 0x22, 0x37, 0x16, 0x03, 0x3c, 0x29, 0x33, 0x26, 0x19, 0x0c
};

make_crc_kernel_r6_t8(Rx07)

#else

static uint8_t const crc6_Rx07_tbl[16] =
{
    0x00, 0x07, 0x0e, 0x09, 0x1c, 0x1b, 0x12, 0x15, 0x38, 0x3f, 0x36, 0x31, 0x24, 0x23, 0x2a, 0x2d
};

make_crc_kernel_r6_t4(Rx07)

#endif
