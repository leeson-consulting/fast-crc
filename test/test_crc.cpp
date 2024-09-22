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

  if (crc != expected_crc) {
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

  if (crc != expected_crc) {
    ERROR("\n\n>>>   CRC Accumulation Test #2 Failed: Expected 0x%016lx , Actual 0x%016lx   <<<\n\n", crc_params.check, crc);
  }

  printf("   ==>   PASS\n\n");
}

void short_test_crc(crc_parameters_t const & crc_params, CRC_Algorithm const algorithm)
{
  printf("Short Test \"%s\" on \"%s\"", crc_params.name, CRC_CHECK_STRING);

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

#define SHORT_TEST_CRC(poly_degree, crc_alg) short_test_crc(crc##poly_degree##_##crc_alg##_params, { \
      .crc_main     = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg(data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_start    = [](uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_start(data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_continue = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_continue(crc, data, data_len) & make_poly_mask(poly_degree); }, \
      .crc_finish   = [](uint64_t const crc, uint8_t const * const data, size_t const data_len) -> uint64_t { return crc##poly_degree##_##crc_alg##_finish(crc, data, data_len) & make_poly_mask(poly_degree); }, \
}); \

///////////////////////////////////////////////////////////////////////////////

int run_tests();

int main()
{
  return run_tests();
}

///////////////////////////////////////////////////////////////////////////////

#include "run_tests.inc"
