#include "crc.h"

#include <stdio.h>
#include <string.h>

static char const HELLO_CRC[] = "Hello, CRC!";

int main(void)
{
  uint16_t const crc = crc16_CCITT((uint8_t const *) HELLO_CRC, strlen(HELLO_CRC));

  printf("\n\nCRC-16/CCITT \"%s\" == 0x%04x\n\n", HELLO_CRC, crc);

  return 0;
}
