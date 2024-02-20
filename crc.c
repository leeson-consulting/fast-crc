#include "crc.h"

///////////////////////////////////////////////////////////////////////////////
//
// 1. Include intrinsic function wappers
//    These are (very rarely) used by CRC algorithms where refin != refout,
//    eg. CRC-12/UMTS
//

#include "./crc_kernels/endianness.h"
#include "./crc_kernels/bit_reverse.c"

///////////////////////////////////////////////////////////////////////////////
//
// 2. Include application defined CRC algorithms

#undef crc_algorithms_inc
#define crc_algorithms_inc (INCLUDE_IMPLEMENTATION)

#include "crc_algorithms.inc"

