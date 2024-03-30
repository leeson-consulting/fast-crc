#define USE_CRC_KERNEL_TABLE8

// These algorithms use 8-bit kernels

#include "crc_algorithms/standard/crc16_ccitt.inc"

#undef USE_CRC_KERNEL_TABLE8

// These algorithms use 4-bit kernels ...

#include "crc_algorithms/standard/crc32_iso_hdlc.inc"

// ... except for this one,
// which implicitly uses the same 8-bit kernel-table
// that was brought in with crc16_ccitt above

#include "crc_algorithms/standard/crc16_ibm_sdlc.inc"
