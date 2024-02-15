#if crc_algorithms_inc == INCLUDE_INTERFACE

// CRC-16/Fast4:
//  width   = 16-bits
//  poly    = 0x0007
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0xef6f

uint16_t crc16_fast4_init(uint16_t const init, uint8_t const * data, size_t data_len);

uint16_t crc16_fast4(uint8_t const * data, size_t data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

static inline uint16_t crc16_fast4_u8(uint16_t const crc, uint8_t const data_byte)
{
  uint16_t const A = (crc >> (16 - 8)) ^ data_byte;                     //   2 ops
  uint16_t const B = (A << 2) ^ (A << 1) ^ A;                           //   4 ops
  return B ^ (crc << 8);                                                //   2 ops
}

static inline uint16_t crc16_fast4_u16(uint16_t crc, uint16_t const * data, size_t const data_len)
{
  uint8_t const T[4] = {0x0, 0x7, 0x9, 0xe};
  uint16_t A, A1;

  for (size_t i = 0; i < data_len; ++i) {                               //   2 ops
    uint16_t const item = ensure_be16(data[i]);                         //   1 op on little-endian platforms
    A = crc ^ item;                                                     //   1 op
    A1 = A >> 14;                                                       //   1 op
    crc = T[A1] ^ (A << 2) ^ (A << 1) ^ A;                              // + 5 ops
  }                                                                     // -------
                                                                        //  10 ops/u16
  return crc;                                                           //   5 ops/u8
}

uint16_t crc16_fast4_init(uint16_t const init, uint8_t const * data, size_t data_len)
{
  uint16_t crc = init;

  // 1. Process unaligned data prefix if necessary at a cost of 8 ops

  if ((uintptr_t) data % sizeof(uint16_t) != 0) {
    crc = crc16_fast4_u8(crc, data[0]);
    data++;
    data_len--;
  }

  if (data_len == 0) {
    return crc;
  }

  // 2. Process u16 aligned data at a cost of 5 ops / u8

  crc = crc16_fast4_u16(crc, (uint16_t const *) data, data_len / 2);

  if (data_len % 2 == 0) {
    return crc;
  }

  // 3. Process unaligned data suffix if necessary at a cost of 8 ops

  crc = crc16_fast4_u8(crc, data[data_len - 1]);

  return crc;
}

uint16_t crc16_fast4(uint8_t const * data, size_t data_len)
{
  return crc16_fast4_init(/* init = */ 0x0000, data, data_len);
}

#endif