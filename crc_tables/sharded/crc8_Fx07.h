#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Sharded Polynomial Lookup Tables
//
// crc8_Fx07_Profile =
// {
//   "polynomial" : "x^8 + x^2 + x^1 + 1",
//   "degree"     : 8,
//   "explicit"   : "0x107",
//   "koopman"    : "0x83",
//   "normal"     : "0x7"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#include "crcx_Sx07.h"

#define Fx07 (Sx07)

#if defined(USE_CRC_KERNEL_TABLE8)

make_crc_kernel_f8_t8(Fx07)

#else

make_crc_kernel_f8_t4(Fx07)

#endif
