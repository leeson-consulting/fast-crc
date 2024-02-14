#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-24/Fast6:
//  width   = 24-bits
//  poly    = 0x018301
//  init    = 0x000000
//  refin   = false
//  refout  = false
//  xorout  = 0x000000
//  check   = 0x8a7d1b

uint32_t crc24_fast6_init(uint32_t const init, uint8_t const * data, size_t data_len);

uint32_t crc24_fast6(uint8_t const * data, size_t data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint32_t crc24_fast6_u8(uint32_t const crc, uint8_t const data_byte)
{
  uint32_t const A = (crc >> (24 - 8)) ^ data_byte;                     //   2 ops
  uint32_t const B = (A << 16) ^ (A << 15) ^ (A << 9) ^ (A << 8) ^ A;   //   8 ops
  return (B ^ (crc << 8)) & 0xffffff;                                   // + 3 ops
}

uint32_t crc24_fast6_init(uint32_t const init, uint8_t const * data, size_t data_len)
{
  uint32_t crc = init & 0xffffff;

  for (size_t i = 0; i < data_len; ++i) {                               //    2 ops
    crc = crc24_fast6_u8(crc, data[i]);                                 // + 13 ops
  }                                                                     // --------
                                                                        //
  return crc;                                                           //   15 ops/u8
}

uint32_t crc24_fast6(uint8_t const * data, size_t data_len)
{
  return crc24_fast6_init(/* init = */ 0x000000, data, data_len);
}

#endif
