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

static uint8_t const crc8_koopman_CHECK = 0xd8;

void test_crc8_koopman(void)
{
  printf(">>>   Test crc8_koopman   <<<\n\n");

  printf("Check test string \"%s\"\n", CRC_CHECK_STRING);

  uint8_t crc = crc8_koopman((uint8_t *)CRC_CHECK_STRING, strlen(CRC_CHECK_STRING));

  if (crc8_koopman_CHECK != crc) {
    ERROR("CRC Test failed: Expected 0x%02x , Actual 0x%02x\n\n", crc8_koopman_CHECK, crc);
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
//
// Test CRC Offset Kernels
//

void test_bit_offset(size_t const bit_offset)
{
  uint64_t test_data[3] = { 0 };
  memset(test_data, 0, sizeof(test_data));

  memcpy(((uint8_t *) &test_data[1]), &CRC_CHECK_STRING[0], strlen(CRC_CHECK_STRING));

  test_data[0] = (test_data[1] << bit_offset);
  test_data[1] = (test_data[1] >> (64 - bit_offset)) | (test_data[2] << bit_offset);
  test_data[2] = (test_data[2] >> (64 - bit_offset));

  uint32_t crc32 = crc32_hdlc_offset((uint8_t *) &test_data[0], bit_offset, strlen(CRC_CHECK_STRING) * 8);

  if (CRC32_HDLC_CHECK != crc32) {
    ERROR("CRC32 HDLC failed for bit offset %lu : Expected 0x%08x , Actual 0x%08x\n\n", bit_offset, CRC32_HDLC_CHECK, crc32);
  }

  uint16_t crc16 = crc16_ibm3740_offset((uint8_t *) &test_data[0], bit_offset, strlen(CRC_CHECK_STRING) * 8);

  if (CRC16_IBM3740_CHECK != crc16) {
    ERROR("IBM3740 CRC16 failed for bit offset %lu : Expected 0x%04x , Actual 0x%04x\n\n", bit_offset, CRC16_IBM3740_CHECK, crc16);
  }
}

void test_bit_offsets(void)
{
  printf(">>>   Test CRC32 HDLC Offset Kernel   <<<\n\n");

  for (size_t i = 0 ; i < 64 ; ++i) {
    test_bit_offset(i);
  }

  printf("Pass CRC Offset Kernel Test\n");
}

int main(void)
{
  test_crc8_koopman();

  test_crc16_ibm3740();
  test_crc12_umts();
  test_crc16_mcrfxx();
  test_crc16_modbus();

  test_crc32_hdlc();

  test_crc64_xz();

  /////////////////////
  //
  // Test Arbitrary bit patterns

  test_bit_offsets();

  return 0;
}
