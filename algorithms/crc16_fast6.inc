#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-16/Fast6:
//  width   = 16-bits
//  poly    = 0x011b
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0x8d1c

uint16_t crc16_fast6(uint8_t const * data, size_t data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint32_t crc16_fast6_u8(uint32_t crc, uint8_t const data_byte)
{
  uint32_t const s = 8;
  uint32_t const hs = 16 - s;
  uint32_t const A = (crc >> hs) ^ data_byte;                           //   2 ops
  uint32_t const B = (A << 8) ^ (A << 4) ^ (A << 3) ^ (A << 1) ^ A;     //   8 ops
  crc = (B ^ (crc << 8)) & 0xffff;                                      // + 3 ops
                                                                        // -------
  return crc;                                                           //  13 ops
}

uint16_t crc16_fast6(uint8_t const * data, size_t data_len)
{
  uint32_t crc = 0x0000; // init;

  for (size_t i = 0; i < data_len; ++i) {                               //    2 ops
    crc = crc16_fast6_u8(crc, data[i]);                                 // + 13 ops
  }                                                                     // --------
                                                                        //
  return crc;                                                           //   15 ops/u8
}

#endif
