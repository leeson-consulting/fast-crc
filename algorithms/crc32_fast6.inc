#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-32/Fast6:
//  width   = 32-bits
//  poly    = 0x0006c001
//  init    = 0x00000000
//  refin   = false
//  refout  = false
//  xorout  = 0x00000000
//  check   = 0x1d40bcf7

uint32_t crc32_fast6(uint8_t const * data, size_t data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint32_t crc32_fast6_u8(uint32_t crc, uint8_t const data_byte)
{
  uint32_t const s = 8;
  uint32_t const hs = 32 - s;
  uint32_t const A = (crc >> hs) ^ data_byte;                           //   2 ops
  uint32_t const B = (A << 18) ^ (A << 17) ^ (A << 15) ^ (A << 14) ^ A; //   8 ops
  crc = B ^ (crc << 8);                                                 // + 2 ops
                                                                        // -------
  return crc;                                                           //  12 ops/u8
}

static inline uint32_t crc32_fast6_u16(uint32_t crc, uint16_t const * data, size_t const data_len)
{
  size_t const s = 16;
  size_t const hs = 32 - s;
  static const uint32_t T[4] = {0x00000000, 0x8006c001, 0x000b4003, 0x800d8002};

  uint32_t A, A1, A2, B;

  for (size_t i = 0; i < data_len; ++i) {                               //   2 ops
    uint16_t const item = byte_swap_16(data[i]);                        //   1 op
    A = (crc >> hs) ^ item;                                             //   2 ops
    A1 = A >> 14;                                                       //   1 op
    A2 = A & 0x3fff;                                                    //   1 op
    B = T[A1] ^ (A2 << 18) ^ (A2 << 17) ^ (A << 15) ^ (A << 14) ^ A;    //   9 ops
    crc = B ^ (crc << s);                                               // + 2 ops
  }                                                                     // -------
                                                                        //  18 ops/u16
  return crc;                                                           //   9 ops/u8
}

uint32_t crc32_fast6(uint8_t const * data, size_t data_len)
{
  uint32_t crc = 0x00000000; // init;

  if ((uintptr_t) data % sizeof(uint16_t) != 0) {
    crc = crc32_fast6_u8(crc, *data);                                   // 12 ops
    data++;
    data_len--;
  }

  if (data_len == 0) {
    return crc;
  }

  crc = crc32_fast6_u16(crc, (uint16_t const *) data, data_len / 2);    // 18 * (data_len / 2) ops

  if (data_len % 2 == 0) {
    return crc;
  }

  return crc32_fast6_u8(crc, data[data_len - 1]);                       // 12 ops
}

#endif
