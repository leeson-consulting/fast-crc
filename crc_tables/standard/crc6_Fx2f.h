#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc6_Fx2f_Profile =
// {
//   "polynomial" : "x^6 + x^5 + x^3 + x^2 + x^1 + 1",
//   "degree"     : 6,
//   "explicit"   : "0x6f",
//   "koopman"    : "0x37",
//   "normal"     : "0x2f"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const crc6_Fx2f_tbl[256] =
{
    0x00, 0x2f, 0x31, 0x1e, 0x0d, 0x22, 0x3c, 0x13, 0x1a, 0x35, 0x2b, 0x04, 0x17, 0x38, 0x26, 0x09,
    0x34, 0x1b, 0x05, 0x2a, 0x39, 0x16, 0x08, 0x27, 0x2e, 0x01, 0x1f, 0x30, 0x23, 0x0c, 0x12, 0x3d,
    0x07, 0x28, 0x36, 0x19, 0x0a, 0x25, 0x3b, 0x14, 0x1d, 0x32, 0x2c, 0x03, 0x10, 0x3f, 0x21, 0x0e,
    0x33, 0x1c, 0x02, 0x2d, 0x3e, 0x11, 0x0f, 0x20, 0x29, 0x06, 0x18, 0x37, 0x24, 0x0b, 0x15, 0x3a,
    0x0e, 0x21, 0x3f, 0x10, 0x03, 0x2c, 0x32, 0x1d, 0x14, 0x3b, 0x25, 0x0a, 0x19, 0x36, 0x28, 0x07,
    0x3a, 0x15, 0x0b, 0x24, 0x37, 0x18, 0x06, 0x29, 0x20, 0x0f, 0x11, 0x3e, 0x2d, 0x02, 0x1c, 0x33,
    0x09, 0x26, 0x38, 0x17, 0x04, 0x2b, 0x35, 0x1a, 0x13, 0x3c, 0x22, 0x0d, 0x1e, 0x31, 0x2f, 0x00,
    0x3d, 0x12, 0x0c, 0x23, 0x30, 0x1f, 0x01, 0x2e, 0x27, 0x08, 0x16, 0x39, 0x2a, 0x05, 0x1b, 0x34,
    0x1c, 0x33, 0x2d, 0x02, 0x11, 0x3e, 0x20, 0x0f, 0x06, 0x29, 0x37, 0x18, 0x0b, 0x24, 0x3a, 0x15,
    0x28, 0x07, 0x19, 0x36, 0x25, 0x0a, 0x14, 0x3b, 0x32, 0x1d, 0x03, 0x2c, 0x3f, 0x10, 0x0e, 0x21,
    0x1b, 0x34, 0x2a, 0x05, 0x16, 0x39, 0x27, 0x08, 0x01, 0x2e, 0x30, 0x1f, 0x0c, 0x23, 0x3d, 0x12,
    0x2f, 0x00, 0x1e, 0x31, 0x22, 0x0d, 0x13, 0x3c, 0x35, 0x1a, 0x04, 0x2b, 0x38, 0x17, 0x09, 0x26,
    0x12, 0x3d, 0x23, 0x0c, 0x1f, 0x30, 0x2e, 0x01, 0x08, 0x27, 0x39, 0x16, 0x05, 0x2a, 0x34, 0x1b,
    0x26, 0x09, 0x17, 0x38, 0x2b, 0x04, 0x1a, 0x35, 0x3c, 0x13, 0x0d, 0x22, 0x31, 0x1e, 0x00, 0x2f,
    0x15, 0x3a, 0x24, 0x0b, 0x18, 0x37, 0x29, 0x06, 0x0f, 0x20, 0x3e, 0x11, 0x02, 0x2d, 0x33, 0x1c,
    0x21, 0x0e, 0x10, 0x3f, 0x2c, 0x03, 0x1d, 0x32, 0x3b, 0x14, 0x0a, 0x25, 0x36, 0x19, 0x07, 0x28
};

make_crc_kernel_f6_t8(Fx2f)

#else

static uint8_t const crc6_Fx2f_tbl[16] =
{
    0x00, 0x2f, 0x31, 0x1e, 0x0d, 0x22, 0x3c, 0x13, 0x1a, 0x35, 0x2b, 0x04, 0x17, 0x38, 0x26, 0x09
};

make_crc_kernel_f6_t4(Fx2f)

#endif
