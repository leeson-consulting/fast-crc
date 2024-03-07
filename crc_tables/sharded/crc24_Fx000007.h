#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Sharded Polynomial Lookup Tables
//
// crc24_Fx000007_Profile =
// {
//   "id" : {
//     "polynomial" : "x^24 + x^2 + x^1 + 1",
//     "degree"     : 24,
//     "explicit"   : "0x1000007",
//     "koopman"    : "0x800003",
//     "normal"     : "0x7"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 8388583, "bytes"   : 1048572 },
//     /* 4 */ { "bits"    : 8388583, "bytes"   : 1048572 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#include "crcx_Sx07.h"

#define Fx000007 (Sx07)

#if defined(USE_CRC_KERNEL_TABLE8)

make_crc_kernel_f24_t8(Fx000007)

#else

make_crc_kernel_f24_t4(Fx000007)

#endif
