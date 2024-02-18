#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-24/Fast4:
//  width   = 24-bits
//  poly    = 0x000007
//  init    = 0x000000
//  refin   = false
//  refout  = false
//  xorout  = 0x000000
//  check   = 0x921774

uint32_t crc24_fast4_init(uint32_t const init, uint8_t const * data, size_t data_len);

uint32_t crc24_fast4(uint8_t const * data, size_t data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint32_t crc24_fast4_u8(uint32_t const crc, uint8_t const data_byte)
{
  uint32_t const A = (crc >> (24 - 8)) ^ data_byte;                     //   2 ops
  uint32_t const B = (A << 2) ^ (A << 1) ^ A;                           //   4 ops
  return (B ^ (crc << 8)) & 0xffffff;                                   // + 3 ops
}

uint32_t crc24_fast4_init(uint32_t const init, uint8_t const * data, size_t data_len)
{
  uint32_t crc = init & 0xffffff;

  for (size_t i = 0; i < data_len; ++i) {                               //    2 ops
    crc = crc24_fast4_u8(crc, data[i]);                                 // + 13 ops
  }                                                                     // --------
                                                                        //
  return crc;                                                           //   15 ops/u8
}

uint32_t crc24_fast4(uint8_t const * data, size_t data_len)
{
  return crc24_fast4_init(/* init = */ 0x000000, data, data_len);
}

#endif
