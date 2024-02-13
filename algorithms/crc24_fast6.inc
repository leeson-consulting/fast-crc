#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-24/Fast6:
//  width   = 24-bits
//  poly    = 0x018301
//  init    = 0x000000
//  refin   = false
//  refout  = false
//  xorout  = 0x000000
//  check   = 0x8a7d1b

uint32_t crc24_fast6(uint8_t const * data, size_t data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint32_t crc24_fast6_u8(uint32_t crc, uint8_t const data_byte)
{
  uint32_t const s = 8;
  uint32_t const hs = 24 - s;
  uint32_t const A = (crc >> hs) ^ data_byte;                           //   2 ops
  uint32_t const B = (A << 16) ^ (A << 15) ^ (A << 9) ^ (A << 8) ^ A;   //   8 ops
  crc = (B ^ (crc << 8)) & 0xffffff;                                    // + 3 ops
                                                                        // -------
  return crc;                                                           //  13 ops
}

uint32_t crc24_fast6(uint8_t const * data, size_t data_len)
{
  uint32_t crc = 0x000000; // init;

  for (size_t i = 0; i < data_len; ++i) {                               //    2 ops
    crc = crc24_fast6_u8(crc, data[i]);                                 // + 13 ops
  }                                                                     // --------
                                                                        //
  return crc;                                                           //   15 ops/u8
}

#endif
