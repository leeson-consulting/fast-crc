#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc4_Rx3_Profile =
// {
//   "polynomial" : "x^4 + x^1 + 1",
//   "degree"     : 4,
//   "explicit"   : "0x13",
//   "koopman"    : "0x9",
//   "normal"     : "0x3"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint8_t const crc4_Rx3_tbl[256] =
{
    0x00, 0x07, 0x0e, 0x09, 0x05, 0x02, 0x0b, 0x0c, 0x0a, 0x0d, 0x04, 0x03, 0x0f, 0x08, 0x01, 0x06,
    0x0d, 0x0a, 0x03, 0x04, 0x08, 0x0f, 0x06, 0x01, 0x07, 0x00, 0x09, 0x0e, 0x02, 0x05, 0x0c, 0x0b,
    0x03, 0x04, 0x0d, 0x0a, 0x06, 0x01, 0x08, 0x0f, 0x09, 0x0e, 0x07, 0x00, 0x0c, 0x0b, 0x02, 0x05,
    0x0e, 0x09, 0x00, 0x07, 0x0b, 0x0c, 0x05, 0x02, 0x04, 0x03, 0x0a, 0x0d, 0x01, 0x06, 0x0f, 0x08,
    0x06, 0x01, 0x08, 0x0f, 0x03, 0x04, 0x0d, 0x0a, 0x0c, 0x0b, 0x02, 0x05, 0x09, 0x0e, 0x07, 0x00,
    0x0b, 0x0c, 0x05, 0x02, 0x0e, 0x09, 0x00, 0x07, 0x01, 0x06, 0x0f, 0x08, 0x04, 0x03, 0x0a, 0x0d,
    0x05, 0x02, 0x0b, 0x0c, 0x00, 0x07, 0x0e, 0x09, 0x0f, 0x08, 0x01, 0x06, 0x0a, 0x0d, 0x04, 0x03,
    0x08, 0x0f, 0x06, 0x01, 0x0d, 0x0a, 0x03, 0x04, 0x02, 0x05, 0x0c, 0x0b, 0x07, 0x00, 0x09, 0x0e,
    0x0c, 0x0b, 0x02, 0x05, 0x09, 0x0e, 0x07, 0x00, 0x06, 0x01, 0x08, 0x0f, 0x03, 0x04, 0x0d, 0x0a,
    0x01, 0x06, 0x0f, 0x08, 0x04, 0x03, 0x0a, 0x0d, 0x0b, 0x0c, 0x05, 0x02, 0x0e, 0x09, 0x00, 0x07,
    0x0f, 0x08, 0x01, 0x06, 0x0a, 0x0d, 0x04, 0x03, 0x05, 0x02, 0x0b, 0x0c, 0x00, 0x07, 0x0e, 0x09,
    0x02, 0x05, 0x0c, 0x0b, 0x07, 0x00, 0x09, 0x0e, 0x08, 0x0f, 0x06, 0x01, 0x0d, 0x0a, 0x03, 0x04,
    0x0a, 0x0d, 0x04, 0x03, 0x0f, 0x08, 0x01, 0x06, 0x00, 0x07, 0x0e, 0x09, 0x05, 0x02, 0x0b, 0x0c,
    0x07, 0x00, 0x09, 0x0e, 0x02, 0x05, 0x0c, 0x0b, 0x0d, 0x0a, 0x03, 0x04, 0x08, 0x0f, 0x06, 0x01,
    0x09, 0x0e, 0x07, 0x00, 0x0c, 0x0b, 0x02, 0x05, 0x03, 0x04, 0x0d, 0x0a, 0x06, 0x01, 0x08, 0x0f,
    0x04, 0x03, 0x0a, 0x0d, 0x01, 0x06, 0x0f, 0x08, 0x0e, 0x09, 0x00, 0x07, 0x0b, 0x0c, 0x05, 0x02
};

make_crc_kernel_r4_t8(Rx3)

#else

static uint8_t const crc4_Rx3_tbl[16] =
{
    0x00, 0x0d, 0x03, 0x0e, 0x06, 0x0b, 0x05, 0x08, 0x0c, 0x01, 0x0f, 0x02, 0x0a, 0x07, 0x09, 0x04
};

make_crc_kernel_r4_t4(Rx3)

#endif
