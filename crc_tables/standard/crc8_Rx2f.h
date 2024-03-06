#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc8_Rx2f_Profile =
// {
//   "polynomial" : "x^8 + x^5 + x^3 + x^2 + x^1 + 1",
//   "degree"     : 8,
//   "explicit"   : "0x12f",
//   "koopman"    : "0x97",
//   "normal"     : "0x2f"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const Rx2f[256] =
{
    0x00, 0xc7, 0x67, 0xa0, 0xce, 0x09, 0xa9, 0x6e, 0x75, 0xb2, 0x12, 0xd5, 0xbb, 0x7c, 0xdc, 0x1b,
    0xea, 0x2d, 0x8d, 0x4a, 0x24, 0xe3, 0x43, 0x84, 0x9f, 0x58, 0xf8, 0x3f, 0x51, 0x96, 0x36, 0xf1,
    0x3d, 0xfa, 0x5a, 0x9d, 0xf3, 0x34, 0x94, 0x53, 0x48, 0x8f, 0x2f, 0xe8, 0x86, 0x41, 0xe1, 0x26,
    0xd7, 0x10, 0xb0, 0x77, 0x19, 0xde, 0x7e, 0xb9, 0xa2, 0x65, 0xc5, 0x02, 0x6c, 0xab, 0x0b, 0xcc,
    0x7a, 0xbd, 0x1d, 0xda, 0xb4, 0x73, 0xd3, 0x14, 0x0f, 0xc8, 0x68, 0xaf, 0xc1, 0x06, 0xa6, 0x61,
    0x90, 0x57, 0xf7, 0x30, 0x5e, 0x99, 0x39, 0xfe, 0xe5, 0x22, 0x82, 0x45, 0x2b, 0xec, 0x4c, 0x8b,
    0x47, 0x80, 0x20, 0xe7, 0x89, 0x4e, 0xee, 0x29, 0x32, 0xf5, 0x55, 0x92, 0xfc, 0x3b, 0x9b, 0x5c,
    0xad, 0x6a, 0xca, 0x0d, 0x63, 0xa4, 0x04, 0xc3, 0xd8, 0x1f, 0xbf, 0x78, 0x16, 0xd1, 0x71, 0xb6,
    0xf4, 0x33, 0x93, 0x54, 0x3a, 0xfd, 0x5d, 0x9a, 0x81, 0x46, 0xe6, 0x21, 0x4f, 0x88, 0x28, 0xef,
    0x1e, 0xd9, 0x79, 0xbe, 0xd0, 0x17, 0xb7, 0x70, 0x6b, 0xac, 0x0c, 0xcb, 0xa5, 0x62, 0xc2, 0x05,
    0xc9, 0x0e, 0xae, 0x69, 0x07, 0xc0, 0x60, 0xa7, 0xbc, 0x7b, 0xdb, 0x1c, 0x72, 0xb5, 0x15, 0xd2,
    0x23, 0xe4, 0x44, 0x83, 0xed, 0x2a, 0x8a, 0x4d, 0x56, 0x91, 0x31, 0xf6, 0x98, 0x5f, 0xff, 0x38,
    0x8e, 0x49, 0xe9, 0x2e, 0x40, 0x87, 0x27, 0xe0, 0xfb, 0x3c, 0x9c, 0x5b, 0x35, 0xf2, 0x52, 0x95,
    0x64, 0xa3, 0x03, 0xc4, 0xaa, 0x6d, 0xcd, 0x0a, 0x11, 0xd6, 0x76, 0xb1, 0xdf, 0x18, 0xb8, 0x7f,
    0xb3, 0x74, 0xd4, 0x13, 0x7d, 0xba, 0x1a, 0xdd, 0xc6, 0x01, 0xa1, 0x66, 0x08, 0xcf, 0x6f, 0xa8,
    0x59, 0x9e, 0x3e, 0xf9, 0x97, 0x50, 0xf0, 0x37, 0x2c, 0xeb, 0x4b, 0x8c, 0xe2, 0x25, 0x85, 0x42
};

make_crc_kernel_r8_t8(Rx2f)

#else

static uint8_t const Rx2f[16] =
{
    0x00, 0xea, 0x3d, 0xd7, 0x7a, 0x90, 0x47, 0xad, 0xf4, 0x1e, 0xc9, 0x23, 0x8e, 0x64, 0xb3, 0x59
};

make_crc_kernel_r8_t4(Rx2f)

#endif