#if crc_algorithms_inc == INCLUDE_INTERFACE

#define REQUIRE_CRC_KERNEL16

// CRC-16/Fast:
//  width   = 16-bits
//  poly    = 0x0007
//  init    = 0x0000
//  refin   = false
//  refout  = false
//  xorout  = 0x0000
//  check   = 0xef6f

uint16_t crc16_fast(uint8_t const *data, size_t const data_len);

#elif crc_algorithms_inc == INCLUDE_IMPLEMENTATION

uint16_t crc16_fast(uint8_t const *data, size_t const data_len)
{
  uint16_t crc = /* init = */ 0x0000;
  uint16_t pol_Ax_mult_x2_x1_1;

  const size_t s_val = 8;
  const size_t h_s_val = 16 - s_val;

  for (size_t i = 0 ; i < data_len ; ++i) {
    // A(x)
    pol_Ax_mult_x2_x1_1 = (crc >> h_s_val) ^ data[i];

    // A(x)*x^2 + A(x)*x^1 + A(x)
    pol_Ax_mult_x2_x1_1 = (pol_Ax_mult_x2_x1_1 << 2) ^ (pol_Ax_mult_x2_x1_1 << 1) ^ pol_Ax_mult_x2_x1_1;

    crc = (crc << s_val) ^ pol_Ax_mult_x2_x1_1;
  }

  return crc;
}

#endif
