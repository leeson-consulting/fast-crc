#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc7_Fx4f_Profile =
// {
//   "polynomial" : "x^7 + x^6 + x^3 + x^2 + x^1 + 1",
//   "degree"     : 7,
//   "explicit"   : "0xcf",
//   "koopman"    : "0x67",
//   "normal"     : "0x4f"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const crc7_Fx4f_tbl[256] =
{
    0x00, 0x4f, 0x51, 0x1e, 0x6d, 0x22, 0x3c, 0x73, 0x15, 0x5a, 0x44, 0x0b, 0x78, 0x37, 0x29, 0x66,
    0x2a, 0x65, 0x7b, 0x34, 0x47, 0x08, 0x16, 0x59, 0x3f, 0x70, 0x6e, 0x21, 0x52, 0x1d, 0x03, 0x4c,
    0x54, 0x1b, 0x05, 0x4a, 0x39, 0x76, 0x68, 0x27, 0x41, 0x0e, 0x10, 0x5f, 0x2c, 0x63, 0x7d, 0x32,
    0x7e, 0x31, 0x2f, 0x60, 0x13, 0x5c, 0x42, 0x0d, 0x6b, 0x24, 0x3a, 0x75, 0x06, 0x49, 0x57, 0x18,
    0x67, 0x28, 0x36, 0x79, 0x0a, 0x45, 0x5b, 0x14, 0x72, 0x3d, 0x23, 0x6c, 0x1f, 0x50, 0x4e, 0x01,
    0x4d, 0x02, 0x1c, 0x53, 0x20, 0x6f, 0x71, 0x3e, 0x58, 0x17, 0x09, 0x46, 0x35, 0x7a, 0x64, 0x2b,
    0x33, 0x7c, 0x62, 0x2d, 0x5e, 0x11, 0x0f, 0x40, 0x26, 0x69, 0x77, 0x38, 0x4b, 0x04, 0x1a, 0x55,
    0x19, 0x56, 0x48, 0x07, 0x74, 0x3b, 0x25, 0x6a, 0x0c, 0x43, 0x5d, 0x12, 0x61, 0x2e, 0x30, 0x7f,
    0x01, 0x4e, 0x50, 0x1f, 0x6c, 0x23, 0x3d, 0x72, 0x14, 0x5b, 0x45, 0x0a, 0x79, 0x36, 0x28, 0x67,
    0x2b, 0x64, 0x7a, 0x35, 0x46, 0x09, 0x17, 0x58, 0x3e, 0x71, 0x6f, 0x20, 0x53, 0x1c, 0x02, 0x4d,
    0x55, 0x1a, 0x04, 0x4b, 0x38, 0x77, 0x69, 0x26, 0x40, 0x0f, 0x11, 0x5e, 0x2d, 0x62, 0x7c, 0x33,
    0x7f, 0x30, 0x2e, 0x61, 0x12, 0x5d, 0x43, 0x0c, 0x6a, 0x25, 0x3b, 0x74, 0x07, 0x48, 0x56, 0x19,
    0x66, 0x29, 0x37, 0x78, 0x0b, 0x44, 0x5a, 0x15, 0x73, 0x3c, 0x22, 0x6d, 0x1e, 0x51, 0x4f, 0x00,
    0x4c, 0x03, 0x1d, 0x52, 0x21, 0x6e, 0x70, 0x3f, 0x59, 0x16, 0x08, 0x47, 0x34, 0x7b, 0x65, 0x2a,
    0x32, 0x7d, 0x63, 0x2c, 0x5f, 0x10, 0x0e, 0x41, 0x27, 0x68, 0x76, 0x39, 0x4a, 0x05, 0x1b, 0x54,
    0x18, 0x57, 0x49, 0x06, 0x75, 0x3a, 0x24, 0x6b, 0x0d, 0x42, 0x5c, 0x13, 0x60, 0x2f, 0x31, 0x7e
};

make_crc_kernel_f7_t8(Fx4f)

#else

static uint8_t const crc7_Fx4f_tbl[16] =
{
    0x00, 0x4f, 0x51, 0x1e, 0x6d, 0x22, 0x3c, 0x73, 0x15, 0x5a, 0x44, 0x0b, 0x78, 0x37, 0x29, 0x66
};

make_crc_kernel_f7_t4(Fx4f)

#endif