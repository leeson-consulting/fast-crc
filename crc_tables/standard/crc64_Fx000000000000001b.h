#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc64_Fx000000000000001b_Profile =
// {
//   "polynomial" : "x^64 + x^4 + x^3 + x^1 + 1",
//   "degree"     : 64,
//   "explicit"   : "0x1000000000000001b",
//   "koopman"    : "0x800000000000000d",
//   "normal"     : "0x1b"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint64_t const Fx000000000000001b[256] =
{
    0x0000000000000000, 0x000000000000001b, 0x0000000000000036, 0x000000000000002d,
    0x000000000000006c, 0x0000000000000077, 0x000000000000005a, 0x0000000000000041,
    0x00000000000000d8, 0x00000000000000c3, 0x00000000000000ee, 0x00000000000000f5,
    0x00000000000000b4, 0x00000000000000af, 0x0000000000000082, 0x0000000000000099,
    0x00000000000001b0, 0x00000000000001ab, 0x0000000000000186, 0x000000000000019d,
    0x00000000000001dc, 0x00000000000001c7, 0x00000000000001ea, 0x00000000000001f1,
    0x0000000000000168, 0x0000000000000173, 0x000000000000015e, 0x0000000000000145,
    0x0000000000000104, 0x000000000000011f, 0x0000000000000132, 0x0000000000000129,
    0x0000000000000360, 0x000000000000037b, 0x0000000000000356, 0x000000000000034d,
    0x000000000000030c, 0x0000000000000317, 0x000000000000033a, 0x0000000000000321,
    0x00000000000003b8, 0x00000000000003a3, 0x000000000000038e, 0x0000000000000395,
    0x00000000000003d4, 0x00000000000003cf, 0x00000000000003e2, 0x00000000000003f9,
    0x00000000000002d0, 0x00000000000002cb, 0x00000000000002e6, 0x00000000000002fd,
    0x00000000000002bc, 0x00000000000002a7, 0x000000000000028a, 0x0000000000000291,
    0x0000000000000208, 0x0000000000000213, 0x000000000000023e, 0x0000000000000225,
    0x0000000000000264, 0x000000000000027f, 0x0000000000000252, 0x0000000000000249,
    0x00000000000006c0, 0x00000000000006db, 0x00000000000006f6, 0x00000000000006ed,
    0x00000000000006ac, 0x00000000000006b7, 0x000000000000069a, 0x0000000000000681,
    0x0000000000000618, 0x0000000000000603, 0x000000000000062e, 0x0000000000000635,
    0x0000000000000674, 0x000000000000066f, 0x0000000000000642, 0x0000000000000659,
    0x0000000000000770, 0x000000000000076b, 0x0000000000000746, 0x000000000000075d,
    0x000000000000071c, 0x0000000000000707, 0x000000000000072a, 0x0000000000000731,
    0x00000000000007a8, 0x00000000000007b3, 0x000000000000079e, 0x0000000000000785,
    0x00000000000007c4, 0x00000000000007df, 0x00000000000007f2, 0x00000000000007e9,
    0x00000000000005a0, 0x00000000000005bb, 0x0000000000000596, 0x000000000000058d,
    0x00000000000005cc, 0x00000000000005d7, 0x00000000000005fa, 0x00000000000005e1,
    0x0000000000000578, 0x0000000000000563, 0x000000000000054e, 0x0000000000000555,
    0x0000000000000514, 0x000000000000050f, 0x0000000000000522, 0x0000000000000539,
    0x0000000000000410, 0x000000000000040b, 0x0000000000000426, 0x000000000000043d,
    0x000000000000047c, 0x0000000000000467, 0x000000000000044a, 0x0000000000000451,
    0x00000000000004c8, 0x00000000000004d3, 0x00000000000004fe, 0x00000000000004e5,
    0x00000000000004a4, 0x00000000000004bf, 0x0000000000000492, 0x0000000000000489,
    0x0000000000000d80, 0x0000000000000d9b, 0x0000000000000db6, 0x0000000000000dad,
    0x0000000000000dec, 0x0000000000000df7, 0x0000000000000dda, 0x0000000000000dc1,
    0x0000000000000d58, 0x0000000000000d43, 0x0000000000000d6e, 0x0000000000000d75,
    0x0000000000000d34, 0x0000000000000d2f, 0x0000000000000d02, 0x0000000000000d19,
    0x0000000000000c30, 0x0000000000000c2b, 0x0000000000000c06, 0x0000000000000c1d,
    0x0000000000000c5c, 0x0000000000000c47, 0x0000000000000c6a, 0x0000000000000c71,
    0x0000000000000ce8, 0x0000000000000cf3, 0x0000000000000cde, 0x0000000000000cc5,
    0x0000000000000c84, 0x0000000000000c9f, 0x0000000000000cb2, 0x0000000000000ca9,
    0x0000000000000ee0, 0x0000000000000efb, 0x0000000000000ed6, 0x0000000000000ecd,
    0x0000000000000e8c, 0x0000000000000e97, 0x0000000000000eba, 0x0000000000000ea1,
    0x0000000000000e38, 0x0000000000000e23, 0x0000000000000e0e, 0x0000000000000e15,
    0x0000000000000e54, 0x0000000000000e4f, 0x0000000000000e62, 0x0000000000000e79,
    0x0000000000000f50, 0x0000000000000f4b, 0x0000000000000f66, 0x0000000000000f7d,
    0x0000000000000f3c, 0x0000000000000f27, 0x0000000000000f0a, 0x0000000000000f11,
    0x0000000000000f88, 0x0000000000000f93, 0x0000000000000fbe, 0x0000000000000fa5,
    0x0000000000000fe4, 0x0000000000000fff, 0x0000000000000fd2, 0x0000000000000fc9,
    0x0000000000000b40, 0x0000000000000b5b, 0x0000000000000b76, 0x0000000000000b6d,
    0x0000000000000b2c, 0x0000000000000b37, 0x0000000000000b1a, 0x0000000000000b01,
    0x0000000000000b98, 0x0000000000000b83, 0x0000000000000bae, 0x0000000000000bb5,
    0x0000000000000bf4, 0x0000000000000bef, 0x0000000000000bc2, 0x0000000000000bd9,
    0x0000000000000af0, 0x0000000000000aeb, 0x0000000000000ac6, 0x0000000000000add,
    0x0000000000000a9c, 0x0000000000000a87, 0x0000000000000aaa, 0x0000000000000ab1,
    0x0000000000000a28, 0x0000000000000a33, 0x0000000000000a1e, 0x0000000000000a05,
    0x0000000000000a44, 0x0000000000000a5f, 0x0000000000000a72, 0x0000000000000a69,
    0x0000000000000820, 0x000000000000083b, 0x0000000000000816, 0x000000000000080d,
    0x000000000000084c, 0x0000000000000857, 0x000000000000087a, 0x0000000000000861,
    0x00000000000008f8, 0x00000000000008e3, 0x00000000000008ce, 0x00000000000008d5,
    0x0000000000000894, 0x000000000000088f, 0x00000000000008a2, 0x00000000000008b9,
    0x0000000000000990, 0x000000000000098b, 0x00000000000009a6, 0x00000000000009bd,
    0x00000000000009fc, 0x00000000000009e7, 0x00000000000009ca, 0x00000000000009d1,
    0x0000000000000948, 0x0000000000000953, 0x000000000000097e, 0x0000000000000965,
    0x0000000000000924, 0x000000000000093f, 0x0000000000000912, 0x0000000000000909
};

make_crc_kernel_f64_t8(Fx000000000000001b)

#else

static uint64_t const Fx000000000000001b[16] =
{
    0x0000000000000000, 0x000000000000001b, 0x0000000000000036, 0x000000000000002d,
    0x000000000000006c, 0x0000000000000077, 0x000000000000005a, 0x0000000000000041,
    0x00000000000000d8, 0x00000000000000c3, 0x00000000000000ee, 0x00000000000000f5,
    0x00000000000000b4, 0x00000000000000af, 0x0000000000000082, 0x0000000000000099
};

make_crc_kernel_f64_t4(Fx000000000000001b)

#endif