#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc16_Fx080b_Profile =
// {
//   "polynomial" : "x^16 + x^11 + x^3 + x^1 + 1",
//   "degree"     : 16,
//   "explicit"   : "0x1080b",
//   "koopman"    : "0x8405",
//   "normal"     : "0x80b"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint16_t const crc16_Fx080b_tbl[256] =
{
    0x0000, 0x080b, 0x1016, 0x181d, 0x202c, 0x2827, 0x303a, 0x3831,
    0x4058, 0x4853, 0x504e, 0x5845, 0x6074, 0x687f, 0x7062, 0x7869,
    0x80b0, 0x88bb, 0x90a6, 0x98ad, 0xa09c, 0xa897, 0xb08a, 0xb881,
    0xc0e8, 0xc8e3, 0xd0fe, 0xd8f5, 0xe0c4, 0xe8cf, 0xf0d2, 0xf8d9,
    0x096b, 0x0160, 0x197d, 0x1176, 0x2947, 0x214c, 0x3951, 0x315a,
    0x4933, 0x4138, 0x5925, 0x512e, 0x691f, 0x6114, 0x7909, 0x7102,
    0x89db, 0x81d0, 0x99cd, 0x91c6, 0xa9f7, 0xa1fc, 0xb9e1, 0xb1ea,
    0xc983, 0xc188, 0xd995, 0xd19e, 0xe9af, 0xe1a4, 0xf9b9, 0xf1b2,
    0x12d6, 0x1add, 0x02c0, 0x0acb, 0x32fa, 0x3af1, 0x22ec, 0x2ae7,
    0x528e, 0x5a85, 0x4298, 0x4a93, 0x72a2, 0x7aa9, 0x62b4, 0x6abf,
    0x9266, 0x9a6d, 0x8270, 0x8a7b, 0xb24a, 0xba41, 0xa25c, 0xaa57,
    0xd23e, 0xda35, 0xc228, 0xca23, 0xf212, 0xfa19, 0xe204, 0xea0f,
    0x1bbd, 0x13b6, 0x0bab, 0x03a0, 0x3b91, 0x339a, 0x2b87, 0x238c,
    0x5be5, 0x53ee, 0x4bf3, 0x43f8, 0x7bc9, 0x73c2, 0x6bdf, 0x63d4,
    0x9b0d, 0x9306, 0x8b1b, 0x8310, 0xbb21, 0xb32a, 0xab37, 0xa33c,
    0xdb55, 0xd35e, 0xcb43, 0xc348, 0xfb79, 0xf372, 0xeb6f, 0xe364,
    0x25ac, 0x2da7, 0x35ba, 0x3db1, 0x0580, 0x0d8b, 0x1596, 0x1d9d,
    0x65f4, 0x6dff, 0x75e2, 0x7de9, 0x45d8, 0x4dd3, 0x55ce, 0x5dc5,
    0xa51c, 0xad17, 0xb50a, 0xbd01, 0x8530, 0x8d3b, 0x9526, 0x9d2d,
    0xe544, 0xed4f, 0xf552, 0xfd59, 0xc568, 0xcd63, 0xd57e, 0xdd75,
    0x2cc7, 0x24cc, 0x3cd1, 0x34da, 0x0ceb, 0x04e0, 0x1cfd, 0x14f6,
    0x6c9f, 0x6494, 0x7c89, 0x7482, 0x4cb3, 0x44b8, 0x5ca5, 0x54ae,
    0xac77, 0xa47c, 0xbc61, 0xb46a, 0x8c5b, 0x8450, 0x9c4d, 0x9446,
    0xec2f, 0xe424, 0xfc39, 0xf432, 0xcc03, 0xc408, 0xdc15, 0xd41e,
    0x377a, 0x3f71, 0x276c, 0x2f67, 0x1756, 0x1f5d, 0x0740, 0x0f4b,
    0x7722, 0x7f29, 0x6734, 0x6f3f, 0x570e, 0x5f05, 0x4718, 0x4f13,
    0xb7ca, 0xbfc1, 0xa7dc, 0xafd7, 0x97e6, 0x9fed, 0x87f0, 0x8ffb,
    0xf792, 0xff99, 0xe784, 0xef8f, 0xd7be, 0xdfb5, 0xc7a8, 0xcfa3,
    0x3e11, 0x361a, 0x2e07, 0x260c, 0x1e3d, 0x1636, 0x0e2b, 0x0620,
    0x7e49, 0x7642, 0x6e5f, 0x6654, 0x5e65, 0x566e, 0x4e73, 0x4678,
    0xbea1, 0xb6aa, 0xaeb7, 0xa6bc, 0x9e8d, 0x9686, 0x8e9b, 0x8690,
    0xfef9, 0xf6f2, 0xeeef, 0xe6e4, 0xded5, 0xd6de, 0xcec3, 0xc6c8
};

make_crc_kernel_f16_t8(Fx080b)

#else

static uint16_t const crc16_Fx080b_tbl[16] =
{
    0x0000, 0x080b, 0x1016, 0x181d, 0x202c, 0x2827, 0x303a, 0x3831,
    0x4058, 0x4853, 0x504e, 0x5845, 0x6074, 0x687f, 0x7062, 0x7869
};

make_crc_kernel_f16_t4(Fx080b)

#endif
