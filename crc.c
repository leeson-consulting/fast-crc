#include "crc.h"

///////////////////////////////////////////////////////////////////////////////
//
// 1. Identify and define CRC kernel types and macros

#if !defined(CPU_REGISTER_WIDTH)
  #define CPU_REGISTER_WIDTH (32)
#endif

#if defined(REQUIRE_CRC_KERNEL12)
#define REQUIRE_CRC_KERNEL16
#endif

#if defined(REQUIRE_CRC_OFFSET_KERNEL12)
#define REQUIRE_CRC_OFFSET_KERNEL16
#endif

#if !defined(PREFERRED_CRC_KERNEL_WIDTH)

  #if (defined(REQUIRE_CRC_KERNEL64) || defined(REQUIRE_CRC_OFFSET_KERNEL64)) && CPU_REGISTER_WIDTH >= 64
    #define PREFERRED_CRC_KERNEL_WIDTH (64)
  #elif (defined(REQUIRE_CRC_KERNEL32) || defined(REQUIRE_CRC_OFFSET_KERNEL32)) && CPU_REGISTER_WIDTH >= 32
    #define PREFERRED_CRC_KERNEL_WIDTH (32)
  #elif (defined(REQUIRE_CRC_KERNEL16) || defined(REQUIRE_CRC_OFFSET_KERNEL16)) && CPU_REGISTER_WIDTH >= 16
    #define PREFERRED_CRC_KERNEL_WIDTH (16)
  #else
    #define PREFERRED_CRC_KERNEL_WIDTH (CPU_REGISTER_WIDTH)
  #endif

#endif

#if PREFERRED_CRC_KERNEL_WIDTH == 8

  #undef REQUIRE_CRC_KERNEL8

  #if defined(REQUIRE_CRC_OFFSET_KERNEL8)
    #undef REQUIRE_CRC_OFFSET_KERNEL8
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  typedef uint8_t  crcx_t;
  typedef crcx_t   crc8_t;
  typedef uint16_t crc12_t;
  typedef uint16_t crc16_t;
  typedef uint32_t crc32_t;
  typedef uint64_t crc64_t;

  #define calc_crc8(...)            calc_crcx(__VA_ARGS__)

  #define calc_crc8_offset(...)     calc_crcx_offset(__VA_ARGS__)

#elif PREFERRED_CRC_KERNEL_WIDTH == 16

  #undef REQUIRE_CRC_KERNEL8
  #undef REQUIRE_CRC_KERNEL16

  #if defined(REQUIRE_CRC_OFFSET_KERNEL8)
    #undef REQUIRE_CRC_OFFSET_KERNEL8
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  #if defined(REQUIRE_CRC_OFFSET_KERNEL16)
    #undef REQUIRE_CRC_OFFSET_KERNEL16
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  typedef uint16_t crcx_t;
  typedef crcx_t   crc8_t;
  typedef crcx_t   crc12_t;
  typedef crcx_t   crc16_t;
  typedef uint32_t crc32_t;
  typedef uint64_t crc64_t;

  #define calc_crc8(...)  calc_crcx(__VA_ARGS__)
  #define calc_crc12(...) calc_crcx(__VA_ARGS__)
  #define calc_crc16(...) calc_crcx(__VA_ARGS__)

  #define calc_crc8_offset(...)     calc_crcx_offset(__VA_ARGS__)
  #define calc_crc12_offset(...)    calc_crcx_offset(__VA_ARGS__)
  #define calc_crc16_offset(...)    calc_crcx_offset(__VA_ARGS__)

#elif PREFERRED_CRC_KERNEL_WIDTH == 32

  #undef REQUIRE_CRC_KERNEL8
  #undef REQUIRE_CRC_KERNEL16
  #undef REQUIRE_CRC_KERNEL32

  #if defined(REQUIRE_CRC_OFFSET_KERNEL8)
    #undef REQUIRE_CRC_OFFSET_KERNEL8
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  #if defined(REQUIRE_CRC_OFFSET_KERNEL16)
    #undef REQUIRE_CRC_OFFSET_KERNEL16
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  #if defined(REQUIRE_CRC_OFFSET_KERNEL32)
    #undef REQUIRE_CRC_OFFSET_KERNEL32
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  typedef uint32_t crcx_t;
  typedef crcx_t   crc8_t;
  typedef crcx_t   crc12_t;
  typedef crcx_t   crc16_t;
  typedef crcx_t   crc32_t;
  typedef uint64_t crc64_t;

  #define calc_crc8(...)            calc_crcx(__VA_ARGS__)
  #define calc_crc12(...)           calc_crcx(__VA_ARGS__)
  #define calc_crc16(...)           calc_crcx(__VA_ARGS__)
  #define calc_crc32(...)           calc_crcx(__VA_ARGS__)

  #define calc_crc8_offset(...)     calc_crcx_offset(__VA_ARGS__)
  #define calc_crc12_offset(...)    calc_crcx_offset(__VA_ARGS__)
  #define calc_crc16_offset(...)    calc_crcx_offset(__VA_ARGS__)
  #define calc_crc32_offset(...)    calc_crcx_offset(__VA_ARGS__)

#elif PREFERRED_CRC_KERNEL_WIDTH == 64

  #undef REQUIRE_CRC_KERNEL8
  #undef REQUIRE_CRC_KERNEL16
  #undef REQUIRE_CRC_KERNEL32
  #undef REQUIRE_CRC_KERNEL64

  #if defined(REQUIRE_CRC_OFFSET_KERNEL8)
    #undef REQUIRE_CRC_OFFSET_KERNEL8
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  #if defined(REQUIRE_CRC_OFFSET_KERNEL16)
    #undef REQUIRE_CRC_OFFSET_KERNEL16
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  #if defined(REQUIRE_CRC_OFFSET_KERNEL32)
    #undef REQUIRE_CRC_OFFSET_KERNEL32
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  #if defined(REQUIRE_CRC_OFFSET_KERNEL64)
    #undef REQUIRE_CRC_OFFSET_KERNEL64
    #define REQUIRE_CRC_OFFSET_KERNELX
  #endif

  typedef uint64_t crcx_t;
  typedef crcx_t   crc8_t;
  typedef crcx_t   crc12_t;
  typedef crcx_t   crc16_t;
  typedef crcx_t   crc32_t;
  typedef crcx_t   crc64_t;

  #define calc_crc8(...)            calc_crcx(__VA_ARGS__)
  #define calc_crc12(...)           calc_crcx(__VA_ARGS__)
  #define calc_crc16(...)           calc_crcx(__VA_ARGS__)
  #define calc_crc32(...)           calc_crcx(__VA_ARGS__)
  #define calc_crc64(...)           calc_crcx(__VA_ARGS__)

  #define calc_crc8_offset(...)     calc_crcx_offset(__VA_ARGS__)
  #define calc_crc12_offset(...)    calc_crcx_offset(__VA_ARGS__)
  #define calc_crc16_offset(...)    calc_crcx_offset(__VA_ARGS__)
  #define calc_crc32_offset(...)    calc_crcx_offset(__VA_ARGS__)
  #define calc_crc64_offset(...)    calc_crcx_offset(__VA_ARGS__)

#else

  #error("PREFERRED_CRC_KERNEL_WIDTH must be 8, 16, 32, or 64 bits wide")

#endif

///////////////////////////////////////////////////////////////////////////////
//
// 2. Include (generally) one or more CRC kernels
//

#include "./kernels/crc_kernelx.c"

#if defined(REQUIRE_CRC_OFFSET_KERNELX)
  #include "./kernels/crc_offset_kernelx.c"
#endif

#if defined(REQUIRE_CRC_KERNEL16)
  #include "./kernels/crc_kernel16.c"
#endif

#if defined(REQUIRE_CRC_OFFSET_KERNEL16)
  #include "./kernels/crc_offset_kernel16.c"
#endif

#if defined(REQUIRE_CRC_KERNEL32)
  #include "./kernels/crc_kernel32.c"
#endif

#if defined(REQUIRE_CRC_OFFSET_KERNEL32)
  #include "./kernels/crc_offset_kernel32.c"
#endif

#if defined(REQUIRE_CRC_KERNEL64)
  #include "./kernels/crc_kernel64.c"
#endif

#if defined(REQUIRE_CRC_OFFSET_KERNEL64)
  #include "./kernels/crc_offset_kernel64.c"
#endif

///////////////////////////////////////////////////////////////////////////////
//
// 3. Include intrinsic function wappers
//    These are (very rarely) used by CRC algorithms where refin != refout,
//    eg. CRC-12/UMTS
//

#include "./kernels/bit_reverse.c"
#include "./kernels/byte_swap.c"

///////////////////////////////////////////////////////////////////////////////
//
// 4. Include application defined CRC algorithms

#undef crc_algorithms_inc
#define crc_algorithms_inc (INCLUDE_IMPLEMENTATION)

#include "crc_algorithms.inc"

