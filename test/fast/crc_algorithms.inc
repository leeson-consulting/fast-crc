///////////////////////////////////////////////////////////////////////////////
//
// Algorithms that use Nguyen's Fast-CRC algorithms
//

#include "crc_algorithms/fast/crc8_fast4.inc"
#include "crc_algorithms/fast/crc16_fast4.inc"
#include "crc_algorithms/fast/crc24_fast4.inc"

#include "crc_algorithms/fast/crc16_fast6.inc"
#include "crc_algorithms/fast/crc24_fast6.inc"
#include "crc_algorithms/fast/crc31_fast6.inc"
#include "crc_algorithms/fast/crc32_fast6.inc"
#include "crc_algorithms/fast/crc64_fast6.inc"

// The following table-based algorithms are included for comparison with the fast algorithms.
// The crc values calculated by each fast algoritm must be the same as the corresponding table-based algorithm.

#define USE_CRC_KERNEL_TABLE8

#include "crc_algorithms/research/crc31_nguyen_Fxc3001.inc" // equivalent to crc31_fast6.inc

