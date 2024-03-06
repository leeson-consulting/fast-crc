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

#include "crc_algorithms/sharded/crc8_nguyen_Fx07.inc"

///////////////////////////////////////////////////////////////////////////////
//
// 2. Algorithms that use 4-bit Lookup-Tables
//

#undef USE_CRC_KERNEL_TABLE8

#include "crc_algorithms/standard/crc12_umts.inc"
#include "crc_algorithms/standard/crc16_ccitt.inc"
#include "crc_algorithms/standard/crc16_dds_110.inc"
#include "crc_algorithms/standard/crc16_ibm3740.inc"
#include "crc_algorithms/standard/crc16_kermit.inc"
#include "crc_algorithms/standard/crc16_mcrfxx.inc"
#include "crc_algorithms/standard/crc16_modbus.inc"
#include "crc_algorithms/standard/crc32_hdlc.inc"
#include "crc_algorithms/standard/crc64_xz.inc"

#include "crc_algorithms/sharded/crc16_nguyen_Fx0007.inc"
#include "crc_algorithms/sharded/crc24_nguyen_Fx000007.inc"
#include "crc_algorithms/sharded/crc64_nguyen_Fx000000000000002f.inc"

#include "crc_algorithms/research/crc8_koopman.inc"
#include "crc_algorithms/research/crc16_nguyen_Fx011b.inc"
#include "crc_algorithms/research/crc24_nguyen_Fx018301.inc"
#include "crc_algorithms/research/crc32_nguyen_Fx0006c001.inc"

///////////////////////////////////////////////////////////////////////////////
//
// 3. Algorithms that use Nguyen's Fast-CRC algorithms
//

#include "crc_algorithms/fast/crc8_fast4.inc"
#include "crc_algorithms/fast/crc16_fast4.inc"
#include "crc_algorithms/fast/crc24_fast4.inc"

#include "crc_algorithms/fast/crc16_fast6.inc"
#include "crc_algorithms/fast/crc24_fast6.inc"
#include "crc_algorithms/fast/crc32_fast6.inc"
#include "crc_algorithms/fast/crc64_fast6.inc"
