#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc5_Rx09_Profile =
// {
//   "polynomial" : "x^5 + x^3 + 1",
//   "degree"     : 5,
//   "explicit"   : "0x29",
//   "koopman"    : "0x14",
//   "normal"     : "0x9"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const crc5_Rx09_tbl[256] =
{
    0x00, 0x0f, 0x1e, 0x11, 0x19, 0x16, 0x07, 0x08, 0x17, 0x18, 0x09, 0x06, 0x0e, 0x01, 0x10, 0x1f,
    0x0b, 0x04, 0x15, 0x1a, 0x12, 0x1d, 0x0c, 0x03, 0x1c, 0x13, 0x02, 0x0d, 0x05, 0x0a, 0x1b, 0x14,
    0x16, 0x19, 0x08, 0x07, 0x0f, 0x00, 0x11, 0x1e, 0x01, 0x0e, 0x1f, 0x10, 0x18, 0x17, 0x06, 0x09,
    0x1d, 0x12, 0x03, 0x0c, 0x04, 0x0b, 0x1a, 0x15, 0x0a, 0x05, 0x14, 0x1b, 0x13, 0x1c, 0x0d, 0x02,
    0x09, 0x06, 0x17, 0x18, 0x10, 0x1f, 0x0e, 0x01, 0x1e, 0x11, 0x00, 0x0f, 0x07, 0x08, 0x19, 0x16,
    0x02, 0x0d, 0x1c, 0x13, 0x1b, 0x14, 0x05, 0x0a, 0x15, 0x1a, 0x0b, 0x04, 0x0c, 0x03, 0x12, 0x1d,
    0x1f, 0x10, 0x01, 0x0e, 0x06, 0x09, 0x18, 0x17, 0x08, 0x07, 0x16, 0x19, 0x11, 0x1e, 0x0f, 0x00,
    0x14, 0x1b, 0x0a, 0x05, 0x0d, 0x02, 0x13, 0x1c, 0x03, 0x0c, 0x1d, 0x12, 0x1a, 0x15, 0x04, 0x0b,
    0x12, 0x1d, 0x0c, 0x03, 0x0b, 0x04, 0x15, 0x1a, 0x05, 0x0a, 0x1b, 0x14, 0x1c, 0x13, 0x02, 0x0d,
    0x19, 0x16, 0x07, 0x08, 0x00, 0x0f, 0x1e, 0x11, 0x0e, 0x01, 0x10, 0x1f, 0x17, 0x18, 0x09, 0x06,
    0x04, 0x0b, 0x1a, 0x15, 0x1d, 0x12, 0x03, 0x0c, 0x13, 0x1c, 0x0d, 0x02, 0x0a, 0x05, 0x14, 0x1b,
    0x0f, 0x00, 0x11, 0x1e, 0x16, 0x19, 0x08, 0x07, 0x18, 0x17, 0x06, 0x09, 0x01, 0x0e, 0x1f, 0x10,
    0x1b, 0x14, 0x05, 0x0a, 0x02, 0x0d, 0x1c, 0x13, 0x0c, 0x03, 0x12, 0x1d, 0x15, 0x1a, 0x0b, 0x04,
    0x10, 0x1f, 0x0e, 0x01, 0x09, 0x06, 0x17, 0x18, 0x07, 0x08, 0x19, 0x16, 0x1e, 0x11, 0x00, 0x0f,
    0x0d, 0x02, 0x13, 0x1c, 0x14, 0x1b, 0x0a, 0x05, 0x1a, 0x15, 0x04, 0x0b, 0x03, 0x0c, 0x1d, 0x12,
    0x06, 0x09, 0x18, 0x17, 0x1f, 0x10, 0x01, 0x0e, 0x11, 0x1e, 0x0f, 0x00, 0x08, 0x07, 0x16, 0x19
};

make_crc_kernel_r5_t8(Rx09)

#else

static uint8_t const crc5_Rx09_tbl[16] =
{
    0x00, 0x0b, 0x16, 0x1d, 0x09, 0x02, 0x1f, 0x14, 0x12, 0x19, 0x04, 0x0f, 0x1b, 0x10, 0x0d, 0x06
};

make_crc_kernel_r5_t4(Rx09)

#endif
