#define UNIT_TESTS

#include "../crc.h"

#include "stdio.h"
#include "stdint.h"
#include "stdlib.h"
#include "string.h"
#include "assert.h"

static char const CRC_CHECK_STRING[10] = "123456789";
static size_t const CRC_CHECK_STRING_LEN = strlen(CRC_CHECK_STRING);

#if __STDC_VERSION__ >= 202311L || defined(__clang__)

#define ERROR(fmt, ...)                        \
do {                                           \
  printf((fmt) __VA_OPT__(,) __VA_ARGS__);     \
  exit(1);                                     \
} while (0)

#else

#define ERROR(fmt, ...)                        \
do {                                           \
  printf((fmt), ##__VA_ARGS__);                \
  exit(1);                                     \
} while (0)

#endif

///////////////////////////////////////////////////////////////////////////////

typedef uint64_t (* CRC_Algorithm_Main)(uint8_t const * const data, size_t const data_len);
typedef uint64_t (* CRC_Algorithm_Start)(uint8_t const * const data, size_t const data_len);
typedef uint64_t (* CRC_Algorithm_Continue)(uint64_t const crc, uint8_t const * const data, size_t const data_len);
typedef uint64_t (* CRC_Algorithm_Finish)(uint64_t const crc, uint8_t const * const data, size_t const data_len);

struct CRC_Algorithm
{
  CRC_Algorithm_Main const       crc_main;
  CRC_Algorithm_Start const      crc_start;
  CRC_Algorithm_Continue const   crc_continue;
  CRC_Algorithm_Finish const     crc_finish;
};

void test_crc(crc_parameters_t const & crc_params, CRC_Algorithm const algorithm)
{
  printf("Test \"%s\" on \"%s\"", crc_params.name, CRC_CHECK_STRING);

  uint8_t const * const data_start = (uint8_t *) CRC_CHECK_STRING;
  size_t const data_len = CRC_CHECK_STRING_LEN;

  // 1. Test the main CRC interface

  uint64_t crc = algorithm.crc_main(data_start, data_len);

  if (crc_params.check != crc) {
    ERROR("\n\n>>>   CRC Main Test Failed: Expected 0x%016lx , Actual 0x%016lx   <<<\n\n", crc_params.check, crc);
  }

  // 2. Test the cumulative CRC interface

  uint8_t const * data;

  // 2.1 Test ... with a 1, 2, 3, "rest of data" pass

  data = data_start;

  crc = algorithm.crc_start(data, 1);
  data += 1;

  crc = algorithm.crc_continue(crc, data, 2);
  data += 2;

  crc = algorithm.crc_continue(crc, data, 3);
  data += 3;

  crc = algorithm.crc_finish(crc, data, data_len - (data - data_start));

  if (crc_params.check != crc) {
    ERROR("\n\n>>>   CRC Accumulation Test #1 Failed: Expected 0x%016lx , Actual 0x%016lx   <<<\n\n", crc_params.check, crc);
  }

  // 2.2 Test ... with a 4, 3, 1, "rest of data" pass

  data = data_start;

  crc = algorithm.crc_start(data, 4);
  data += 4;

  crc = algorithm.crc_continue(crc, data, 3);
  data += 3;

  crc = algorithm.crc_continue(crc, data, 1);
  data += 1;

  crc = algorithm.crc_finish(crc, data, data_len - (data - data_start));

  if (crc_params.check != crc) {
    ERROR("\n\n>>>   CRC Accumulation Test #2 Failed: Expected 0x%016lx , Actual 0x%016lx   <<<\n\n", crc_params.check, crc);
  }

  printf("   ==>   PASS\n\n");
}

#define test_crc8(crc_alg) test_crc(crc_alg##_params, { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xff; }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_start(data, data_len) & 0xff; }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_continue(crc, data, data_len) & 0xff; }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_finish(crc, data, data_len) & 0xff; }, \
}); \

#define test_crc12(crc_alg) test_crc(crc_alg##_params, { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xfff; }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_start(data, data_len) & 0xfff; }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_continue(crc, data, data_len) & 0xfff; }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_finish(crc, data, data_len) & 0xfff; }, \
}); \

#define test_crc16(crc_alg) test_crc(crc_alg##_params, { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xffff; }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_start(data, data_len) & 0xffff; }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_continue(crc, data, data_len) & 0xffff; }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_finish(crc, data, data_len) & 0xffff; }, \
}); \

#define test_crc24(crc_alg) test_crc(crc_alg##_params, { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xffffff; }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_start(data, data_len) & 0xffffff; }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_continue(crc, data, data_len) & 0xffffff; }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_finish(crc, data, data_len) & 0xffffff; }, \
}); \

#define test_crc32(crc_alg) test_crc(crc_alg##_params, { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xffffffff; }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_start(data, data_len) & 0xffffffff; }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_continue(crc, data, data_len) & 0xffffffff; }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_finish(crc, data, data_len) & 0xffffffff; }, \
}); \

#define test_crc64(crc_alg) test_crc(crc_alg##_params, { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xffffffffffffffff; }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_start(data, data_len) & 0xffffffffffffffff; }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_continue(crc, data, data_len) & 0xffffffffffffffff; }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg##_finish(crc, data, data_len) & 0xffffffffffffffff; }, \
}); \

int main(void)
{
  // CRC-8 Algorithms

  test_crc8(crc8_Koopman);
  test_crc8(crc8_Nguyen_Fx07);
  test_crc8(crc8_Fast4);

  // CRC-12 Algorithms

  test_crc12(crc12_UMTS);

  // CRC-16 Algorithms

  test_crc16(crc16_IBM3740);
  test_crc16(crc16_MCRFXX);
  test_crc16(crc16_MODBUS);

  test_crc16(crc16_Nguyen_Fx0007);
  test_crc16(crc16_Fast4);

  test_crc16(crc16_Nguyen_Fx011b);
  test_crc16(crc16_Fast6);

  // CRC-24 Algorithms

  test_crc24(crc24_Nguyen_Fx000007);
  test_crc24(crc24_Fast4);

  test_crc24(crc24_Nguyen_Fx018301);
  test_crc24(crc24_Fast6);

  // CRC-32 Algorithms

  test_crc32(crc32_ISO_HDLC);

  test_crc32(crc32_Nguyen_Fx0006c001);
  test_crc32(crc32_Fast6);

  // CRC-64 Algorithms

  test_crc64(crc64_XZ);

  test_crc64(crc64_Nguyen_Fx000000000000002f);
  test_crc64(crc64_Fast6);

  return 0;
}
