#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Sharded Polynomial Lookup Tables
//
// crc64_Fx000000000000002f_Profile =
// {
//   "polynomial" : "x^64 + x^5 + x^3 + x^2 + x^1 + 1",
//   "degree"     : 64,
//   "explicit"   : "0x1000000000000002f",
//   "koopman"    : "0x8000000000000017",
//   "normal"     : "0x2f"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#include "crcx_Sx002f.h"

#define Fx000000000000002f (Sx002f)

#if defined(USE_CRC_KERNEL_TABLE8)

make_crc_kernel_f64_t8(Fx000000000000002f)

#else

make_crc_kernel_f64_t4(Fx000000000000002f)

#endif
