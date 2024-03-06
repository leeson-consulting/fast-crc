#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc8_Rxa7_Profile =
// {
//   "polynomial" : "x^8 + x^7 + x^5 + x^2 + x^1 + 1",
//   "degree"     : 8,
//   "explicit"   : "0x1a7",
//   "koopman"    : "0xd3",
//   "normal"     : "0xa7"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const Rxa7[256] =
{
    0x00, 0x6b, 0xd6, 0xbd, 0x67, 0x0c, 0xb1, 0xda, 0xce, 0xa5, 0x18, 0x73, 0xa9, 0xc2, 0x7f, 0x14,
    0x57, 0x3c, 0x81, 0xea, 0x30, 0x5b, 0xe6, 0x8d, 0x99, 0xf2, 0x4f, 0x24, 0xfe, 0x95, 0x28, 0x43,
    0xae, 0xc5, 0x78, 0x13, 0xc9, 0xa2, 0x1f, 0x74, 0x60, 0x0b, 0xb6, 0xdd, 0x07, 0x6c, 0xd1, 0xba,
    0xf9, 0x92, 0x2f, 0x44, 0x9e, 0xf5, 0x48, 0x23, 0x37, 0x5c, 0xe1, 0x8a, 0x50, 0x3b, 0x86, 0xed,
    0x97, 0xfc, 0x41, 0x2a, 0xf0, 0x9b, 0x26, 0x4d, 0x59, 0x32, 0x8f, 0xe4, 0x3e, 0x55, 0xe8, 0x83,
    0xc0, 0xab, 0x16, 0x7d, 0xa7, 0xcc, 0x71, 0x1a, 0x0e, 0x65, 0xd8, 0xb3, 0x69, 0x02, 0xbf, 0xd4,
    0x39, 0x52, 0xef, 0x84, 0x5e, 0x35, 0x88, 0xe3, 0xf7, 0x9c, 0x21, 0x4a, 0x90, 0xfb, 0x46, 0x2d,
    0x6e, 0x05, 0xb8, 0xd3, 0x09, 0x62, 0xdf, 0xb4, 0xa0, 0xcb, 0x76, 0x1d, 0xc7, 0xac, 0x11, 0x7a,
    0xe5, 0x8e, 0x33, 0x58, 0x82, 0xe9, 0x54, 0x3f, 0x2b, 0x40, 0xfd, 0x96, 0x4c, 0x27, 0x9a, 0xf1,
    0xb2, 0xd9, 0x64, 0x0f, 0xd5, 0xbe, 0x03, 0x68, 0x7c, 0x17, 0xaa, 0xc1, 0x1b, 0x70, 0xcd, 0xa6,
    0x4b, 0x20, 0x9d, 0xf6, 0x2c, 0x47, 0xfa, 0x91, 0x85, 0xee, 0x53, 0x38, 0xe2, 0x89, 0x34, 0x5f,
    0x1c, 0x77, 0xca, 0xa1, 0x7b, 0x10, 0xad, 0xc6, 0xd2, 0xb9, 0x04, 0x6f, 0xb5, 0xde, 0x63, 0x08,
    0x72, 0x19, 0xa4, 0xcf, 0x15, 0x7e, 0xc3, 0xa8, 0xbc, 0xd7, 0x6a, 0x01, 0xdb, 0xb0, 0x0d, 0x66,
    0x25, 0x4e, 0xf3, 0x98, 0x42, 0x29, 0x94, 0xff, 0xeb, 0x80, 0x3d, 0x56, 0x8c, 0xe7, 0x5a, 0x31,
    0xdc, 0xb7, 0x0a, 0x61, 0xbb, 0xd0, 0x6d, 0x06, 0x12, 0x79, 0xc4, 0xaf, 0x75, 0x1e, 0xa3, 0xc8,
    0x8b, 0xe0, 0x5d, 0x36, 0xec, 0x87, 0x3a, 0x51, 0x45, 0x2e, 0x93, 0xf8, 0x22, 0x49, 0xf4, 0x9f
};

make_crc_kernel_r8_t8(Rxa7)

#else

static uint8_t const Rxa7[16] =
{
    0x00, 0x57, 0xae, 0xf9, 0x97, 0xc0, 0x39, 0x6e, 0xe5, 0xb2, 0x4b, 0x1c, 0x72, 0x25, 0xdc, 0x8b
};

make_crc_kernel_r8_t4(Rxa7)

#endif