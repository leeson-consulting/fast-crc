#define UNIT_TESTS

#include "fast_crc.h"

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

void test_crc(
  crc_parameters_t const & crc_params,
  CRC_Algorithm const algorithm,
  uint8_t const * const data_start,
  size_t const data_len,
  uint64_t const expected_crc)
{
  assert(data_start != nullptr);
  assert(data_len > 0);

  // 1. Test the main CRC interface

  uint64_t crc = algorithm.crc_main(data_start, data_len);

  if (crc != expected_crc) {
    ERROR("\n\n>>>   CRC Main Test Failed: Expected 0x%016lx , Actual 0x%016lx   <<<\n\n", expected_crc, crc);
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

  if (crc != expected_crc) {
    ERROR("\n\n>>>   CRC Accumulation Test #1 Failed: Expected 0x%016lx , Actual 0x%016lx   <<<\n\n", expected_crc, crc);
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

  if (crc != expected_crc) {
    ERROR("\n\n>>>   CRC Accumulation Test #2 Failed: Expected 0x%016lx , Actual 0x%016lx   <<<\n\n", expected_crc, crc);
  }

  printf("   ==>   PASS\n\n");
}

void test_crc_of_standard_check_string(crc_parameters_t const & crc_params, CRC_Algorithm const algorithm)
{
  printf("Test \"%s\" of \"%s\"", crc_params.name, CRC_CHECK_STRING);

  uint8_t const * const data_start = (uint8_t *) CRC_CHECK_STRING;
  size_t const data_len = CRC_CHECK_STRING_LEN;

  return test_crc(crc_params, algorithm, data_start, data_len, crc_params.check);
}

constexpr uint64_t make_poly_mask(size_t const poly_degree)
{
  if (poly_degree == 64) {
    return 0xffffffffffffffff;
  }

  return (((uint64_t) 1) << poly_degree) - 1;
}

#define SHORT_TEST_CRC(poly_degree, crc_alg) test_crc_of_standard_check_string(crc##poly_degree##_##crc_alg##_params, { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg(data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_start(data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_continue(crc, data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_finish(crc, data, data_len) & make_poly_mask(poly_degree); }, \
}); \

// RANDOM_TEST_DATA was produced from the following command:
//
//   sha512sum -b < <(echo -e "1234567890\x00")
//
// which produced
//
// 105194f44660635453275382ef4e5f69954adea8e629eb7fe7e0baf5ab0ee63b63c9109da32e6b14154f6a76bebac6190686f7a76f558fe1ade53066971a9ffb *-
//

static const uint8_t RANDOM_TEST_DATA[] = {
    0x10, 0x51, 0x94, 0xf4, 0x46, 0x60, 0x63, 0x54, 0x53, 0x27, 0x53, 0x82, 0xef, 0x4e, 0x5f, 0x69,
    0x95, 0x4a, 0xde, 0xa8, 0xe6, 0x29, 0xeb, 0x7f, 0xe7, 0xe0, 0xba, 0xf5, 0xab, 0x0e, 0xe6, 0x3b,
    0x63, 0xc9, 0x10, 0x9d, 0xa3, 0x2e, 0x6b, 0x14, 0x15, 0x4f, 0x6a, 0x76, 0xbe, 0xba, 0xc6, 0x19,
    0x06, 0x86, 0xf7, 0xa7, 0x6f, 0x55, 0x8f, 0xe1, 0xad, 0xe5, 0x30, 0x66, 0x97, 0x1a, 0x9f, 0xfb
};

static const size_t RANDOM_TEST_DATA_LEN = sizeof(RANDOM_TEST_DATA) / sizeof(RANDOM_TEST_DATA[0]);

void test_crc_of_random_data(crc_parameters_t const & crc_params, CRC_Algorithm const algorithm, uint64_t const expected_crc)
{
  printf("Test \"%s\" of random test data", crc_params.name);

  uint8_t const * const data_start = &RANDOM_TEST_DATA[0];
  size_t const data_len = RANDOM_TEST_DATA_LEN;

  return test_crc(crc_params, algorithm, data_start, data_len, expected_crc);
}

#define CUSTOM_TEST_CRC(poly_degree, crc_alg, expected_crc) test_crc_of_random_data( \
    crc##poly_degree##_##crc_alg##_params, \
    { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg(data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_start(data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_continue(crc, data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_finish(crc, data, data_len) & make_poly_mask(poly_degree); }, \
    }, \
    expected_crc \
); \

///////////////////////////////////////////////////////////////////////////////

int run_tests();

int main()
{
  return run_tests();
}

///////////////////////////////////////////////////////////////////////////////

#include "run_tests.inc"
