#include "crc.h"

#include <stdio.h>
#include <string.h>

static char const MIXED_KERNELS[] = "Fast-CRC can mix and match CRC algorithms and table-kernels!";

int main(void)
{
  printf("\n\nCRC-16/CCITT \"%s\" == 0x%04x\n\n", MIXED_KERNELS,
         crc16_CCITT((uint8_t const *) MIXED_KERNELS, strlen(MIXED_KERNELS)));

  printf("\n\nCRC-16/IBM_SDLC \"%s\" == 0x%04x\n\n", MIXED_KERNELS,
         crc16_IBM_SDLC((uint8_t const *) MIXED_KERNELS, strlen(MIXED_KERNELS)));

  printf("\n\nCRC-32/ISO_HDLC \"%s\" == 0x%08x\n\n", MIXED_KERNELS,
         crc32_ISO_HDLC((uint8_t const *) MIXED_KERNELS, strlen(MIXED_KERNELS)));

  return 0;
}
