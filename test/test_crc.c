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

// CRC-8/Koopman:
//  width   = 8-bits
//  poly    = 0x4d
//  init    = 0xff
//  refin   = true
//  refout  = true
//  xorout  = 0xff
//  check   = 0xd8
//
//  See:
//
//  http://www.ece.cmu.edu/~koopman/roses/dsn04/koopman04_crc_poly_embedded.pdf
//  https://stackoverflow.com/a/51748961

static uint8_t const CRC8_KOOPMAN_CHECK = 0xd8;

void test_crc8_koopman(void)
{
  printf(">>>   Test CRC8_KOOPMAN   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint8_t crc = crc8_koopman((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC8_KOOPMAN_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%02x , Actual 0x%02x\n\n", CRC8_KOOPMAN_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-8/Nguyen_Fx07:
//  width   = 8-bits
//  poly    = 0x07
//  init    = 0x00
//  refin   = false
//  refout  = false
//  xorout  = 0x00
//  check   = 0xf4

static uint8_t const CRC8_NGUYEN_Fx07_CHECK = 0xf4;

void test_crc8_nguyen_Fx07(void)
{
  printf(">>>   Test CRC8_NGUYEN_Fx07   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint8_t crc = crc8_nguyen_Fx07((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC8_NGUYEN_Fx07_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%02x , Actual 0x%02x\n\n", CRC8_NGUYEN_Fx07_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-8/Fast4:
//  width   = 8-bits
//  poly    = 0x07
//  init    = 0x00
//  refin   = false
//  refout  = false
//  xorout  = 0x00
//  check   = 0xf4

static uint8_t const CRC8_FAST4_CHECK = 0xf4;

void test_crc8_fast4(void)
{
  printf(">>>   Test CRC8_FAST   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint8_t crc = crc8_fast4((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC8_FAST4_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%02x , Actual 0x%02x\n\n", CRC8_FAST4_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-12/UMTS:
//  width   = 12-bits
//  poly    = 0x80f
//  init    = 0x000
//  refin   = false
//  refout  = true
//  xorout  = 0x000
//  check   = 0xdaf
//  residue = 0x000

static uint16_t const CRC12_UMTS_CHECK = 0xdaf;

void test_crc12_umts(void)
{
  printf(">>>   Test CRC12_UMTS   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint16_t crc = crc12_umts((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC12_UMTS_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC12_UMTS_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-16/IBM3740:
//  width   = 16-bits
//  poly    = 0x1021
//  init    = 0xffff
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x29b1
//  residue = 0x0000

static uint16_t const CRC16_IBM3740_CHECK = 0x29b1;

void test_crc16_ibm3740(void)
{
  printf(">>>   Test CRC16_IBM3740   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint16_t crc = crc16_ibm3740((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC16_IBM3740_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC16_IBM3740_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-16/MCRFXX:
//  width   = 16-bits
//  poly    = 0x1021
//  init    = 0xffff
//  refin   = true
//  refout  = true
//  xorout  = 0x0000
//  check   = 0x6f91
//  residue = 0x0000

static uint16_t const CRC16_MCRFXX_CHECK = 0x6f91;

void test_crc16_mcrfxx(void)
{
  printf(">>>   Test CRC16_MCRFXX   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint16_t crc = crc16_mcrfxx((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC16_MCRFXX_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC16_MCRFXX_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-16/MODBUS:
//  width   = 16-bits
//  poly    = 0x8005
//  init    = 0xffff
//  refin   = true
//  refout  = true
//  xorout  = 0x0000
//  check   = 0x4b37
//  residue = 0x0000

static uint16_t const CRC16_MODBUS_CHECK = 0x4b37;

void test_crc16_modbus(void)
{
  printf(">>>   Test CRC16_MODBUS   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint16_t crc = crc16_modbus((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC16_MODBUS_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC16_MODBUS_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-16/Nguyen_Fx0007:
//  width   = 16-bits
//  poly    = 0x0007
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0xef6f

static uint16_t const CRC16_NGUYEN_Fx0007_CHECK = 0xef6f;

void test_crc16_nguyen_Fx0007(void)
{
  printf(">>>   Test CRC16_NGUYEN_Fx0007   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint16_t crc = crc16_nguyen_Fx0007((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC16_NGUYEN_Fx0007_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC16_NGUYEN_Fx0007_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-16/Fast4:
//  width   = 16-bits
//  poly    = 0x0007
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0xef6f

static uint16_t const CRC16_FAST4_CHECK = 0xef6f;

void test_crc16_fast4(void)
{
  printf(">>>   Test CRC16_FAST4   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint16_t crc = crc16_fast4((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC16_FAST4_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC16_FAST4_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-16/Nguyen_Fx011b:
//  width   = 16-bits
//  poly    = 0x011b
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x8d1c

static uint16_t const CRC16_NGUYEN_Fx011B_CHECK = 0x8d1c;

void test_crc16_nguyen_Fx011b(void)
{
  printf(">>>   Test CRC16_NGUYEN_Fx011B   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint16_t crc = crc16_nguyen_Fx011b((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC16_NGUYEN_Fx011B_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC16_NGUYEN_Fx011B_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-16/Fast6:
//  width   = 16-bits
//  poly    = 0x011b
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x8d1c

static uint16_t const CRC16_FAST6_CHECK = 0x8d1c;

void test_crc16_fast6(void)
{
  printf(">>>   Test CRC16_FAST6   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint16_t crc = crc16_fast6((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC16_FAST6_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC16_FAST6_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-24/Nguyen_Fx018301:
//  width   = 24-bits
//  poly    = 0x018301
//  init    = 0x000000
//  refin   = false
//  refout  = false
//  xorout  = 0x000000
//  check   = 0x8a7d1b

static uint32_t const CRC24_NGUYEN_FxCHECK = 0x8a7d1b;

void test_crc24_nguyen(void)
{
  printf(">>>   Test CRC24_NGUYEN   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint32_t crc = crc24_nguyen_Fx018301((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC24_NGUYEN_FxCHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%04x , Actual 0x%04x\n\n", CRC24_NGUYEN_FxCHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-24/Fast6:
//  width   = 24-bits
//  poly    = 0x018301
//  init    = 0x000000
//  refin   = false
//  refout  = false
//  xorout  = 0x000000
//  check   = 0x8a7d1b

static uint32_t const CRC24_FAST6_CHECK = 0x8a7d1b;

void test_crc24_fast6(void)
{
  printf(">>>   Test CRC24_FAST6   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint32_t crc;
  uint8_t data[32] = {0};
  size_t i = 0; // To experiment with offset behaviour

  memcpy(data + i, CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  crc = crc24_fast6(data + i, strlen(CRC_CHECK_STRING));

  if (CRC24_FAST6_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%08x , Actual 0x%08x\n\n", CRC24_FAST6_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-32/ISO-HDLC:
//  width   = 32-bits
//  poly    = 0x04c11db7
//  init    = 0xffffffff
//  refin   = true
//  refout  = true
//  xorout  = 0xffffffff
//  check   = 0xcbf43926
//  residue = 0xdebb20e3

static uint32_t const CRC32_HDLC_CHECK = 0xcbf43926;

void test_crc32_hdlc(void)
{
  printf(">>>   Test CRC32_HDLC   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint32_t crc = crc32_hdlc((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC32_HDLC_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%08x , Actual 0x%08x\n\n", CRC32_HDLC_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-32/Nguyen_Fx0006c001:
//  width   = 32-bits
//  poly    = 0x0006c001
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x1d40bcf7

static uint32_t const CRC32_NGUYEN_Fx0006C001_CHECK = 0x1d40bcf7;

void test_crc32_nguyen_Fx0006c001(void)
{
  printf(">>>   Test CRC32_NGUYEN_Fx0006C001   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint32_t crc = crc32_nguyen_Fx0006c001((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC32_NGUYEN_Fx0006C001_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%08x , Actual 0x%08x\n\n", CRC32_NGUYEN_Fx0006C001_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-32/Fast6:
//  width   = 32-bits
//  poly    = 0x0006c001
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x1d40bcf7

static uint32_t const CRC32_FAST6_CHECK = 0x1d40bcf7;

void test_crc32_fast6(void)
{
  printf(">>>   Test CRC32_FAST6   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint32_t crc;
  uint8_t data[32] = {0};
  size_t i = 1; // To experiment with offset behaviour

  memcpy(data + i, CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  crc = crc32_fast6(data + i, strlen(CRC_CHECK_STRING));

  if (CRC32_FAST6_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%08x , Actual 0x%08x\n\n", CRC32_FAST6_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-64/XZ:
//  width   = 64-bits
//  poly    = 42f0e1eba9ea3693
//  init    = 0xffffffffffffffff
//  refin   = true
//  refout  = true
//  xorout  = 0xffffffffffffffff
//  check   = 0x995dc9bbdf1939fa
//  residue = 0x49958c9abd7d353f

static uint64_t const CRC64_XZ_CHECK = 0x995dc9bbdf1939fa;

void test_crc64_xz(void)
{
  printf(">>>   Test CRC64_XZ   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint64_t crc = crc64_xz((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC64_XZ_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%016lx , Actual 0x%016lx\n\n", CRC64_XZ_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

///////////////////////////////////////////////////////////////////////////////

// CRC-64/Nguyen_Fx000000000000002f:
//  width   = 64-bits
//  poly    = 0x000000000000002f
//  init    = 0x0000000000000000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000000000000000
//  check   = 0x4966ab84f5dba52f

static uint64_t const CRC64_NGUYEN_Fx000000000000002F_CHECK = 0x4966ab84f5dba52f;

void test_crc64_nguyen_Fx000000000000002f(void)
{
  printf(">>>   Test CRC64_NGUYEN_Fx000000000000002F   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint64_t crc = crc64_nguyen_Fx000000000000002f((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (CRC64_NGUYEN_Fx000000000000002F_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%016lx , Actual 0x%016lx\n\n", CRC64_NGUYEN_Fx000000000000002F_CHECK, crc);
  }

  printf("CRC Test Pass\n\n");
}

int main(void)
{
  test_crc8_koopman();

  test_crc8_nguyen_Fx07();
  test_crc8_fast4();

  test_crc16_ibm3740();
  test_crc12_umts();
  test_crc16_mcrfxx();
  test_crc16_modbus();

  test_crc16_nguyen_Fx0007();
  test_crc16_fast4();

  test_crc16_nguyen_Fx011b();
  test_crc16_fast6();

  test_crc24_nguyen();
  test_crc24_fast6();

  test_crc32_hdlc();

  test_crc32_nguyen_Fx0006c001();
  test_crc32_fast6();

  test_crc64_xz();
  test_crc64_nguyen_Fx000000000000002f();

  return 0;
}
