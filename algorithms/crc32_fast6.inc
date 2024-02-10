#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-32/Fast6:
//  width   = 32-bits
//  poly    = 0x0006c001
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x1d40bcf7

uint32_t crc32_fast6_u8(uint8_t const *data, size_t const data_len);

uint32_t crc32_fast6(uint16_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

#include <stdio.h>

uint32_t crc32_fast6_u8(uint8_t const *data, size_t const data_len)
{
  uint32_t A, B, P;
  size_t s = 8;
  size_t hs = 24; /* hs = h-s, h = 32 */

  P = /* init = */ 0;

  for (size_t i = 0 ; i < data_len; ++i) /* 2 */
  {
    A = (P >> hs) ^ data[i]; /* 2 */
    B = (A << 18) ^ (A << 17) ^ (A << 15) ^ (A << 14) ^ A; /* 8 */
    P = B ^ (P << s);    /* 2 */
    
    printf("crc32_fast6_u8: data[%lu] = 0x%04x, P = 0x%08x\n", i, data[i], P);
  }

  return P;
}
//   0x00000000, 0x0006c001, 0x000d8002, 0x000b4003, 0x001b0004, 0x001dc005, 0x00168006, 0x00104007, 0x00360008, 0x0030c009, 0x003b800a, 0x003d400b, 0x002d000c, 0x002bc00d, 0x0020800e, 0x0026400f


uint32_t crc32_fast6(uint16_t const *data, size_t const data_len)
{
  uint32_t A, A1, A2, B, P;
  static uint32_t T[4] = {0x0, 0x8006c001, 0xb4003, 0x800d8002};

  size_t s = 16;
  size_t hs = 16; /* hs = h-s, h = 32 */
  P = /* init = */ 0;

  for (size_t i = 0; i < data_len; ++i) /* 2 */
  {
    uint16_t const item = __builtin_bswap16(data[i]);
    //uint16_t const item = data[i];

    //A = (P >> hs) ^ data[i]; /* 2 */
    A = (P >> hs) ^ item; /* 2 */
    A1 = A >> 14; /* 1 */
    A2 = A & 0x3fff; /* 1 */
    
    //printf("crc32_fast6: data[%lu] = 0x%04x, A1 = 0x%08x\n", i, data[i], A1);
    
    B = T[A1] ^ (A2 << 18) ^ (A2 << 17) ^ (A << 15) ^ (A << 14) ^ A; /* 9 */
    P = B ^ (P << s); /* 2 */
    printf("crc32_fast6_u16: data[%lu] = 0x%04x, P = 0x%08x\n", i, data[i], P);
  }

  return P;
}

#endif
