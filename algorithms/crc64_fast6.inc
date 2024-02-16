#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-64/Fast6:
//  width   = 64-bits
//  poly    = 0x000000000000002f (x^64 + x^5 + x3 + x^2 + x + 1)
//  init    = 0x0000000000000000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000000000000000
//  check   = 0x4966ab84f5dba52f

uint64_t crc64_fast6_init(uint64_t const init, uint8_t const * data, size_t const data_len);

uint64_t crc64_fast6(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint64_t crc64_fast6_u8(uint64_t const crc, uint8_t const data_byte)
{
  uint64_t const A = (crc >> (64 - 8)) ^ data_byte;                     //   2 ops
  uint64_t const B = (A << 5) ^ (A << 3) ^ (A << 2) ^ (A << 1) ^ A;     //   8 ops
  return B ^ (crc << 8);                                                //   2 ops
}

uint64_t crc64_fast6_init(uint64_t const init, uint8_t const * data, size_t data_len)
{
  uint64_t crc = init;

  for (size_t i = 0 ; i < data_len ; ++i) {
    crc = crc64_fast6_u8(crc, data[i]);
  }

  return crc;
}

uint64_t crc64_fast6(uint8_t const * data, size_t data_len)
{
  return crc64_fast6_init(/* init = */ 0x0000000000000000, data, data_len);
}

#endif
