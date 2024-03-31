#include "crc.h"

#include <stdio.h>
#include <string.h>

static char const DATAPASS_1[] = "Sometimes data arrives... ";
static char const DATAPASS_2[] = "in dribs and drabs, but ";
static char const DATAPASS_3[] = "it's still important to ";
static char const DATAPASS_4[] = "check for errors!";

static size_t const TOTAL_DATA_LEN = sizeof(DATAPASS_1) + sizeof(DATAPASS_2) + sizeof(DATAPASS_3) + sizeof(DATAPASS_4);

int main(void)
{
  // 1. Concantenate the data and compute the CRC using the single Single-Pass interface

  char const flat_buffer[1024] = {0};
  char * data_inserter = (char *) &flat_buffer[0];

  memcpy(data_inserter, DATAPASS_1, sizeof(DATAPASS_1));
  data_inserter += sizeof(DATAPASS_1);

  memcpy(data_inserter, DATAPASS_2, sizeof(DATAPASS_2));
  data_inserter += sizeof(DATAPASS_2);

  memcpy(data_inserter, DATAPASS_3, sizeof(DATAPASS_3));
  data_inserter += sizeof(DATAPASS_3);

  memcpy(data_inserter, DATAPASS_4, sizeof(DATAPASS_4));

  uint32_t const crc32_single_pass = crc32_ISO_HDLC((uint8_t const *) flat_buffer, TOTAL_DATA_LEN);

  printf("\nCRC-32/ISO_HDLC Single-Pass \"%s%s%s%s\" == 0x%08x\n", DATAPASS_1, DATAPASS_2, DATAPASS_3, DATAPASS_4,
         crc32_single_pass);

  // 2. Compute the CRC across multiple data passes using the Multi-Pass interface

  uint32_t crc32_multi_pass = crc32_ISO_HDLC_start((uint8_t const *) DATAPASS_1, sizeof(DATAPASS_1));

  crc32_multi_pass = crc32_ISO_HDLC_continue(crc32_multi_pass, (uint8_t const *) DATAPASS_2, sizeof(DATAPASS_2));

  crc32_multi_pass = crc32_ISO_HDLC_continue(crc32_multi_pass, (uint8_t const *) DATAPASS_3, sizeof(DATAPASS_3));

  crc32_multi_pass = crc32_ISO_HDLC_finish(crc32_multi_pass, (uint8_t const *) DATAPASS_4, sizeof(DATAPASS_4));

  printf("\nCRC-32/ISO_HDLC Multi-Pass \"%s%s%s%s\" == 0x%08x\n", DATAPASS_1, DATAPASS_2, DATAPASS_3, DATAPASS_4,
         crc32_multi_pass);

  return crc32_single_pass == crc32_multi_pass ? 0 : 1;
}
