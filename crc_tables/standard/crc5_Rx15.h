#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc5_Rx15_Profile =
// {
//   "polynomial" : "x^5 + x^4 + x^2 + 1",
//   "degree"     : 5,
//   "explicit"   : "0x35",
//   "koopman"    : "0x1a",
//   "normal"     : "0x15"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const crc5_Rx15_tbl[256] =
{
    0x00, 0x07, 0x0e, 0x09, 0x1c, 0x1b, 0x12, 0x15, 0x13, 0x14, 0x1d, 0x1a, 0x0f, 0x08, 0x01, 0x06,
    0x0d, 0x0a, 0x03, 0x04, 0x11, 0x16, 0x1f, 0x18, 0x1e, 0x19, 0x10, 0x17, 0x02, 0x05, 0x0c, 0x0b,
    0x1a, 0x1d, 0x14, 0x13, 0x06, 0x01, 0x08, 0x0f, 0x09, 0x0e, 0x07, 0x00, 0x15, 0x12, 0x1b, 0x1c,
    0x17, 0x10, 0x19, 0x1e, 0x0b, 0x0c, 0x05, 0x02, 0x04, 0x03, 0x0a, 0x0d, 0x18, 0x1f, 0x16, 0x11,
    0x1f, 0x18, 0x11, 0x16, 0x03, 0x04, 0x0d, 0x0a, 0x0c, 0x0b, 0x02, 0x05, 0x10, 0x17, 0x1e, 0x19,
    0x12, 0x15, 0x1c, 0x1b, 0x0e, 0x09, 0x00, 0x07, 0x01, 0x06, 0x0f, 0x08, 0x1d, 0x1a, 0x13, 0x14,
    0x05, 0x02, 0x0b, 0x0c, 0x19, 0x1e, 0x17, 0x10, 0x16, 0x11, 0x18, 0x1f, 0x0a, 0x0d, 0x04, 0x03,
    0x08, 0x0f, 0x06, 0x01, 0x14, 0x13, 0x1a, 0x1d, 0x1b, 0x1c, 0x15, 0x12, 0x07, 0x00, 0x09, 0x0e,
    0x15, 0x12, 0x1b, 0x1c, 0x09, 0x0e, 0x07, 0x00, 0x06, 0x01, 0x08, 0x0f, 0x1a, 0x1d, 0x14, 0x13,
    0x18, 0x1f, 0x16, 0x11, 0x04, 0x03, 0x0a, 0x0d, 0x0b, 0x0c, 0x05, 0x02, 0x17, 0x10, 0x19, 0x1e,
    0x0f, 0x08, 0x01, 0x06, 0x13, 0x14, 0x1d, 0x1a, 0x1c, 0x1b, 0x12, 0x15, 0x00, 0x07, 0x0e, 0x09,
    0x02, 0x05, 0x0c, 0x0b, 0x1e, 0x19, 0x10, 0x17, 0x11, 0x16, 0x1f, 0x18, 0x0d, 0x0a, 0x03, 0x04,
    0x0a, 0x0d, 0x04, 0x03, 0x16, 0x11, 0x18, 0x1f, 0x19, 0x1e, 0x17, 0x10, 0x05, 0x02, 0x0b, 0x0c,
    0x07, 0x00, 0x09, 0x0e, 0x1b, 0x1c, 0x15, 0x12, 0x14, 0x13, 0x1a, 0x1d, 0x08, 0x0f, 0x06, 0x01,
    0x10, 0x17, 0x1e, 0x19, 0x0c, 0x0b, 0x02, 0x05, 0x03, 0x04, 0x0d, 0x0a, 0x1f, 0x18, 0x11, 0x16,
    0x1d, 0x1a, 0x13, 0x14, 0x01, 0x06, 0x0f, 0x08, 0x0e, 0x09, 0x00, 0x07, 0x12, 0x15, 0x1c, 0x1b
};

make_crc_kernel_r5_t8(Rx15)

#else

static uint8_t const crc5_Rx15_tbl[16] =
{
    0x00, 0x0d, 0x1a, 0x17, 0x1f, 0x12, 0x05, 0x08, 0x15, 0x18, 0x0f, 0x02, 0x0a, 0x07, 0x10, 0x1d
};

make_crc_kernel_r5_t4(Rx15)

#endif