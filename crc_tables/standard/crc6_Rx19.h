#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc6_Rx19_Profile =
// {
//   "polynomial" : "x^6 + x^4 + x^3 + 1",
//   "degree"     : 6,
//   "explicit"   : "0x59",
//   "koopman"    : "0x2c",
//   "normal"     : "0x19"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const crc6_Rx19_tbl[256] =
{
    0x00, 0x32, 0x29, 0x1b, 0x1f, 0x2d, 0x36, 0x04, 0x3e, 0x0c, 0x17, 0x25, 0x21, 0x13, 0x08, 0x3a,
    0x31, 0x03, 0x18, 0x2a, 0x2e, 0x1c, 0x07, 0x35, 0x0f, 0x3d, 0x26, 0x14, 0x10, 0x22, 0x39, 0x0b,
    0x2f, 0x1d, 0x06, 0x34, 0x30, 0x02, 0x19, 0x2b, 0x11, 0x23, 0x38, 0x0a, 0x0e, 0x3c, 0x27, 0x15,
    0x1e, 0x2c, 0x37, 0x05, 0x01, 0x33, 0x28, 0x1a, 0x20, 0x12, 0x09, 0x3b, 0x3f, 0x0d, 0x16, 0x24,
    0x13, 0x21, 0x3a, 0x08, 0x0c, 0x3e, 0x25, 0x17, 0x2d, 0x1f, 0x04, 0x36, 0x32, 0x00, 0x1b, 0x29,
    0x22, 0x10, 0x0b, 0x39, 0x3d, 0x0f, 0x14, 0x26, 0x1c, 0x2e, 0x35, 0x07, 0x03, 0x31, 0x2a, 0x18,
    0x3c, 0x0e, 0x15, 0x27, 0x23, 0x11, 0x0a, 0x38, 0x02, 0x30, 0x2b, 0x19, 0x1d, 0x2f, 0x34, 0x06,
    0x0d, 0x3f, 0x24, 0x16, 0x12, 0x20, 0x3b, 0x09, 0x33, 0x01, 0x1a, 0x28, 0x2c, 0x1e, 0x05, 0x37,
    0x26, 0x14, 0x0f, 0x3d, 0x39, 0x0b, 0x10, 0x22, 0x18, 0x2a, 0x31, 0x03, 0x07, 0x35, 0x2e, 0x1c,
    0x17, 0x25, 0x3e, 0x0c, 0x08, 0x3a, 0x21, 0x13, 0x29, 0x1b, 0x00, 0x32, 0x36, 0x04, 0x1f, 0x2d,
    0x09, 0x3b, 0x20, 0x12, 0x16, 0x24, 0x3f, 0x0d, 0x37, 0x05, 0x1e, 0x2c, 0x28, 0x1a, 0x01, 0x33,
    0x38, 0x0a, 0x11, 0x23, 0x27, 0x15, 0x0e, 0x3c, 0x06, 0x34, 0x2f, 0x1d, 0x19, 0x2b, 0x30, 0x02,
    0x35, 0x07, 0x1c, 0x2e, 0x2a, 0x18, 0x03, 0x31, 0x0b, 0x39, 0x22, 0x10, 0x14, 0x26, 0x3d, 0x0f,
    0x04, 0x36, 0x2d, 0x1f, 0x1b, 0x29, 0x32, 0x00, 0x3a, 0x08, 0x13, 0x21, 0x25, 0x17, 0x0c, 0x3e,
    0x1a, 0x28, 0x33, 0x01, 0x05, 0x37, 0x2c, 0x1e, 0x24, 0x16, 0x0d, 0x3f, 0x3b, 0x09, 0x12, 0x20,
    0x2b, 0x19, 0x02, 0x30, 0x34, 0x06, 0x1d, 0x2f, 0x15, 0x27, 0x3c, 0x0e, 0x0a, 0x38, 0x23, 0x11
};

make_crc_kernel_r6_t8(Rx19)

#else

static uint8_t const crc6_Rx19_tbl[16] =
{
    0x00, 0x31, 0x2f, 0x1e, 0x13, 0x22, 0x3c, 0x0d, 0x26, 0x17, 0x09, 0x38, 0x35, 0x04, 0x1a, 0x2b
};

make_crc_kernel_r6_t4(Rx19)

#endif
