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

#include "crc_kernels/crc_tables.h"

#include "crc8_Sx07.h"

#if defined(USE_CRC_KERNEL_TABLE8)

#define crc8_Fx07_tbl (crc8_Sx07_tbl)

make_crc_kernel_f8_t8(Fx07)

#else

#define crc8_Fx07_tbl (crc8_Sx07_tbl)

make_crc_kernel_f8_t4(Fx07)

#endif
