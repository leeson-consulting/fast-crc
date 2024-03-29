#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc8_Fx49_Profile =
// {
//   "polynomial" : "x^8 + x^6 + x^3 + 1",
//   "degree"     : 8,
//   "explicit"   : "0x149",
//   "koopman"    : "0xa4",
//   "normal"     : "0x49"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const crc8_Fx49_tbl[256] =
{
    0x00, 0x49, 0x92, 0xdb, 0x6d, 0x24, 0xff, 0xb6, 0xda, 0x93, 0x48, 0x01, 0xb7, 0xfe, 0x25, 0x6c,
    0xfd, 0xb4, 0x6f, 0x26, 0x90, 0xd9, 0x02, 0x4b, 0x27, 0x6e, 0xb5, 0xfc, 0x4a, 0x03, 0xd8, 0x91,
    0xb3, 0xfa, 0x21, 0x68, 0xde, 0x97, 0x4c, 0x05, 0x69, 0x20, 0xfb, 0xb2, 0x04, 0x4d, 0x96, 0xdf,
    0x4e, 0x07, 0xdc, 0x95, 0x23, 0x6a, 0xb1, 0xf8, 0x94, 0xdd, 0x06, 0x4f, 0xf9, 0xb0, 0x6b, 0x22,
    0x2f, 0x66, 0xbd, 0xf4, 0x42, 0x0b, 0xd0, 0x99, 0xf5, 0xbc, 0x67, 0x2e, 0x98, 0xd1, 0x0a, 0x43,
    0xd2, 0x9b, 0x40, 0x09, 0xbf, 0xf6, 0x2d, 0x64, 0x08, 0x41, 0x9a, 0xd3, 0x65, 0x2c, 0xf7, 0xbe,
    0x9c, 0xd5, 0x0e, 0x47, 0xf1, 0xb8, 0x63, 0x2a, 0x46, 0x0f, 0xd4, 0x9d, 0x2b, 0x62, 0xb9, 0xf0,
    0x61, 0x28, 0xf3, 0xba, 0x0c, 0x45, 0x9e, 0xd7, 0xbb, 0xf2, 0x29, 0x60, 0xd6, 0x9f, 0x44, 0x0d,
    0x5e, 0x17, 0xcc, 0x85, 0x33, 0x7a, 0xa1, 0xe8, 0x84, 0xcd, 0x16, 0x5f, 0xe9, 0xa0, 0x7b, 0x32,
    0xa3, 0xea, 0x31, 0x78, 0xce, 0x87, 0x5c, 0x15, 0x79, 0x30, 0xeb, 0xa2, 0x14, 0x5d, 0x86, 0xcf,
    0xed, 0xa4, 0x7f, 0x36, 0x80, 0xc9, 0x12, 0x5b, 0x37, 0x7e, 0xa5, 0xec, 0x5a, 0x13, 0xc8, 0x81,
    0x10, 0x59, 0x82, 0xcb, 0x7d, 0x34, 0xef, 0xa6, 0xca, 0x83, 0x58, 0x11, 0xa7, 0xee, 0x35, 0x7c,
    0x71, 0x38, 0xe3, 0xaa, 0x1c, 0x55, 0x8e, 0xc7, 0xab, 0xe2, 0x39, 0x70, 0xc6, 0x8f, 0x54, 0x1d,
    0x8c, 0xc5, 0x1e, 0x57, 0xe1, 0xa8, 0x73, 0x3a, 0x56, 0x1f, 0xc4, 0x8d, 0x3b, 0x72, 0xa9, 0xe0,
    0xc2, 0x8b, 0x50, 0x19, 0xaf, 0xe6, 0x3d, 0x74, 0x18, 0x51, 0x8a, 0xc3, 0x75, 0x3c, 0xe7, 0xae,
    0x3f, 0x76, 0xad, 0xe4, 0x52, 0x1b, 0xc0, 0x89, 0xe5, 0xac, 0x77, 0x3e, 0x88, 0xc1, 0x1a, 0x53
};

make_crc_kernel_f8_t8(Fx49)

#else

static uint8_t const crc8_Fx49_tbl[16] =
{
    0x00, 0x49, 0x92, 0xdb, 0x6d, 0x24, 0xff, 0xb6, 0xda, 0x93, 0x48, 0x01, 0xb7, 0xfe, 0x25, 0x6c
};

make_crc_kernel_f8_t4(Fx49)

#endif
