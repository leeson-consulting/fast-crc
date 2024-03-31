#include "crc16_foobar.h"

#include <stdio.h>
#include <string.h>

static char const HELLO_CUSTOM_CRC[] = "Hello, Custom CRC!";

int main(void)
{
  uint16_t const crc = crc16_FooBar((uint8_t const *) HELLO_CUSTOM_CRC, strlen(HELLO_CUSTOM_CRC));

  printf("\n\nCRC-16/FooBar \"%s\" == 0x%04x\n\n", HELLO_CUSTOM_CRC, crc);

  return 0;
}
