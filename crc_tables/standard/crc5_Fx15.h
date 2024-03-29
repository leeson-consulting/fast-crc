#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc5_Fx15_Profile =
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

static uint8_t const crc5_Fx15_tbl[256] =
{
    0x00, 0x15, 0x1f, 0x0a, 0x0b, 0x1e, 0x14, 0x01, 0x16, 0x03, 0x09, 0x1c, 0x1d, 0x08, 0x02, 0x17,
    0x19, 0x0c, 0x06, 0x13, 0x12, 0x07, 0x0d, 0x18, 0x0f, 0x1a, 0x10, 0x05, 0x04, 0x11, 0x1b, 0x0e,
    0x07, 0x12, 0x18, 0x0d, 0x0c, 0x19, 0x13, 0x06, 0x11, 0x04, 0x0e, 0x1b, 0x1a, 0x0f, 0x05, 0x10,
    0x1e, 0x0b, 0x01, 0x14, 0x15, 0x00, 0x0a, 0x1f, 0x08, 0x1d, 0x17, 0x02, 0x03, 0x16, 0x1c, 0x09,
    0x0e, 0x1b, 0x11, 0x04, 0x05, 0x10, 0x1a, 0x0f, 0x18, 0x0d, 0x07, 0x12, 0x13, 0x06, 0x0c, 0x19,
    0x17, 0x02, 0x08, 0x1d, 0x1c, 0x09, 0x03, 0x16, 0x01, 0x14, 0x1e, 0x0b, 0x0a, 0x1f, 0x15, 0x00,
    0x09, 0x1c, 0x16, 0x03, 0x02, 0x17, 0x1d, 0x08, 0x1f, 0x0a, 0x00, 0x15, 0x14, 0x01, 0x0b, 0x1e,
    0x10, 0x05, 0x0f, 0x1a, 0x1b, 0x0e, 0x04, 0x11, 0x06, 0x13, 0x19, 0x0c, 0x0d, 0x18, 0x12, 0x07,
    0x1c, 0x09, 0x03, 0x16, 0x17, 0x02, 0x08, 0x1d, 0x0a, 0x1f, 0x15, 0x00, 0x01, 0x14, 0x1e, 0x0b,
    0x05, 0x10, 0x1a, 0x0f, 0x0e, 0x1b, 0x11, 0x04, 0x13, 0x06, 0x0c, 0x19, 0x18, 0x0d, 0x07, 0x12,
    0x1b, 0x0e, 0x04, 0x11, 0x10, 0x05, 0x0f, 0x1a, 0x0d, 0x18, 0x12, 0x07, 0x06, 0x13, 0x19, 0x0c,
    0x02, 0x17, 0x1d, 0x08, 0x09, 0x1c, 0x16, 0x03, 0x14, 0x01, 0x0b, 0x1e, 0x1f, 0x0a, 0x00, 0x15,
    0x12, 0x07, 0x0d, 0x18, 0x19, 0x0c, 0x06, 0x13, 0x04, 0x11, 0x1b, 0x0e, 0x0f, 0x1a, 0x10, 0x05,
    0x0b, 0x1e, 0x14, 0x01, 0x00, 0x15, 0x1f, 0x0a, 0x1d, 0x08, 0x02, 0x17, 0x16, 0x03, 0x09, 0x1c,
    0x15, 0x00, 0x0a, 0x1f, 0x1e, 0x0b, 0x01, 0x14, 0x03, 0x16, 0x1c, 0x09, 0x08, 0x1d, 0x17, 0x02,
    0x0c, 0x19, 0x13, 0x06, 0x07, 0x12, 0x18, 0x0d, 0x1a, 0x0f, 0x05, 0x10, 0x11, 0x04, 0x0e, 0x1b
};

make_crc_kernel_f5_t8(Fx15)

#else

static uint8_t const crc5_Fx15_tbl[16] =
{
    0x00, 0x15, 0x1f, 0x0a, 0x0b, 0x1e, 0x14, 0x01, 0x16, 0x03, 0x09, 0x1c, 0x1d, 0x08, 0x02, 0x17
};

make_crc_kernel_f5_t4(Fx15)

#endif
