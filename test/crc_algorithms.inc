// Each application should include its required CRC algorithms here

// CRC-8 algorithms

#include "./algorithms/crc8_koopman.inc"

#include "./algorithms/crc8_nguyen.inc"
#include "./algorithms/crc8_fast4.inc"

// CRC-12 algorithms

#include "./algorithms/crc12_umts.inc"

// CRC-16 algorithms

#include "./algorithms/crc16_ibm3740.inc"
#include "./algorithms/crc16_mcrfxx.inc"
#include "./algorithms/crc16_modbus.inc"

#include "./algorithms/crc16_nguyen_0007.inc"
#include "./algorithms/crc16_fast4.inc"

#include "./algorithms/crc16_nguyen_011b.inc"
#include "./algorithms/crc16_fast6.inc"

#include "./algorithms/crc16_ibm3740_offset.inc"

// CRC-24 algorithms

#include "./algorithms/crc24_nguyen_018301.inc"
#include "./algorithms/crc24_fast6.inc"

// CRC-32 algorithms

#include "./algorithms/crc32_hdlc.inc"

#include "./algorithms/crc32_nguyen_0006c001.inc"
#include "./algorithms/crc32_fast6.inc"

#include "./algorithms/crc32_hdlc_offset.inc"

// CRC-64 algorithms

#include "./algorithms/crc64_xz.inc"
