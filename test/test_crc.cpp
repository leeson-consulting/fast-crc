#define UNIT_TESTS

#include "../crc.h"

#include "stdio.h"
#include "stdint.h"
#include "stdlib.h"
#include "string.h"
#include "assert.h"

static char const CRC_CHECK_STRING[10] = "123456789";

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

typedef uint64_t (* CRC_Algorithm)(uint8_t const * const data, size_t const data_len);

void test_crc(crc_parameters_t const & crc_params, CRC_Algorithm const crc_algorithm)
{
  printf("Test \"%s\" on \"%s\"", crc_params.name, CRC_CHECK_STRING);

  uint64_t const crc = crc_algorithm((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (crc_params.check != crc) {
    ERROR("\n\n>>>   CRC Test failed: Expected 0x%016lx , Actual 0x%016lx   <<<\n\n", crc_params.check, crc);
  }

  printf("   ==>   PASS\n\n");
}

#define test_crc8(crc_alg) test_crc(crc_alg##_params, [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xff; });

#define test_crc12(crc_alg) test_crc(crc_alg##_params, [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xfff; });

#define test_crc16(crc_alg) test_crc(crc_alg##_params, [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xffff; });

#define test_crc24(crc_alg) test_crc(crc_alg##_params, [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xffffff; });

#define test_crc32(crc_alg) test_crc(crc_alg##_params, [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xffffffff; });

#define test_crc64(crc_alg) test_crc(crc_alg##_params, [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc_alg(data, data_len) & 0xffffffffffffffff; });

int main(void)
{
  // CRC-8 Algorithms

  test_crc8(crc8_koopman);
  test_crc8(crc8_nguyen_Fx07);
  test_crc8(crc8_fast4);

  // CRC-12 Algorithms

  test_crc12(crc12_umts);

  // CRC-16 Algorithms

  test_crc16(crc16_ibm3740);
  test_crc16(crc16_mcrfxx);
  test_crc16(crc16_modbus);

  test_crc16(crc16_nguyen_Fx0007);
  test_crc16(crc16_fast4);

  test_crc16(crc16_nguyen_Fx011b);
  test_crc16(crc16_fast6);

  // CRC-24 Algorithms

  test_crc24(crc24_nguyen_Fx000007);
  test_crc24(crc24_fast4);

  test_crc24(crc24_nguyen_Fx018301);
  test_crc24(crc24_fast6);

  // CRC-32 Algorithms

  test_crc32(crc32_hdlc);

  test_crc32(crc32_nguyen_Fx0006c001);
  test_crc32(crc32_fast6);

  // CRC-64 Algorithms

  test_crc64(crc64_xz);

  test_crc64(crc64_nguyen_Fx000000000000002f);
  test_crc64(crc64_fast6);

  return 0;
}
