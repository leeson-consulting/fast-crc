#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Sharded Polynomial Lookup Tables
//
// crc16_Fx0007_Profile =
// {
//   "id" : {
//     "polynomial" : "x^16 + x^2 + x^1 + 1",
//     "degree"     : 16,
//     "explicit"   : "0x10007",
//     "koopman"    : "0x8003",
//     "normal"     : "0x7"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
//     /* 4 */ { "bits"    : 32751, "bytes"   : 4093 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

#include "crc10_Sx007.h"

#define crc16_Fx0007_tbl (crc10_Sx007_tbl)

make_crc_kernel_f16_t8(Fx0007)

#else

#include "crc8_Sx07.h"

#define crc16_Fx0007_tbl (crc8_Sx07_tbl)

make_crc_kernel_f16_t4(Fx0007)

#endif
