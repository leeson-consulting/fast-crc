///////////////////////////////////////////////////////////////////////////////
//
// 0. Each application must create its own "crc_algorithms.inc" file.
//    Make sure the preprocessor can see this file in its include path.
//    Copy the pattern shown below to include the appropriate CRC algorithms.
//

///////////////////////////////////////////////////////////////////////////////
//
// 1. Algorithms that use the 8-bit Lookup-Tables
//

#define USE_CRC_KERNEL_TABLE8

#include "./algorithms/crc8_nguyen_Fx07.inc"

///////////////////////////////////////////////////////////////////////////////
//
// 2. Algorithms that use 4-bit Lookup-Tables
//

#undef USE_CRC_KERNEL_TABLE8

#include "./algorithms/crc8_koopman.inc"

#include "./algorithms/crc12_umts.inc"

#include "./algorithms/crc16_ibm3740.inc"
#include "./algorithms/crc16_mcrfxx.inc"
#include "./algorithms/crc16_modbus.inc"
#include "./algorithms/crc16_nguyen_Fx0007.inc"
#include "./algorithms/crc16_nguyen_Fx011b.inc"

#include "./algorithms/crc24_nguyen_Fx000007.inc"
#include "./algorithms/crc24_nguyen_Fx018301.inc"

#include "./algorithms/crc32_hdlc.inc"
#include "./algorithms/crc32_nguyen_Fx0006c001.inc"

#include "./algorithms/crc64_nguyen_Fx000000000000002f.inc"
#include "./algorithms/crc64_xz.inc"

///////////////////////////////////////////////////////////////////////////////
//
// 3. Algorithms that use Nguyen's Fast-CRC algorithms
//

#include "./algorithms/crc8_fast4.inc"
#include "./algorithms/crc16_fast4.inc"
#include "./algorithms/crc24_fast4.inc"

#include "./algorithms/crc16_fast6.inc"
#include "./algorithms/crc24_fast6.inc"
#include "./algorithms/crc32_fast6.inc"
#include "./algorithms/crc64_fast6.inc"
