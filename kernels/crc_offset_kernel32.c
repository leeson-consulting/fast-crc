#pragma once

#include "crc_kernel32.c"

///////////////////////////////////////////////////////////////////////////////
//
// Reflected CRC Kernel Functions

// calc_crc32_r44 calculates the reversed CRC from @crc and the 4 LSB of @data_byte using the 4-bit @lookup_crc32 table

static inline crc32_t calc_crc32_r44(size_t const UNUSED(crc_msb), crc32_t const crc, uint8_t const data_byte, Lookup_CRC32 const lookup_crc32)
{
  return lookup_crc32((crc ^ data_byte) & 0x0f) ^ (crc >> 4);
}

// calc_crc32_r24 calculates the reversed CRC from @crc and the 2 LSB of @data_byte using the 4-bit @lookup_crc32 table

static inline crc32_t calc_crc32_r24(size_t const UNUSED(crc_msb), crc32_t const crc, uint8_t const data_byte, Lookup_CRC32 const lookup_crc32)
{
  return lookup_crc32(((crc ^ data_byte) << 2) & 0x0c) ^ (crc >> 2);
}

// calc_crc32_r14 calculates the reversed CRC from @crc and the 1 LSB of @data_byte using the 4-bit @lookup_crc32 table

static inline crc32_t calc_crc32_r14(size_t const UNUSED(crc_msb), crc32_t const crc, uint8_t const data_byte, Lookup_CRC32 const lookup_crc32)
{
  return lookup_crc32(((crc ^ data_byte) << 3) & 0x08) ^ (crc >> 1);
}

///////////////////////////////////////////////////////////////////////////////
//
// Forward CRC Kernel Functions

// calc_crc32_f44 calculates the forward CRC from @crc and the 4 LSB of @data_byte using the 4-bit @lookup_crc32 table

static inline crc32_t calc_crc32_f44(size_t const crc_msb, crc32_t const crc, uint8_t const data_byte, Lookup_CRC32 const lookup_crc32)
{
  return lookup_crc32(((crc >> (crc_msb - 4)) ^ data_byte) & 0x0f) ^ (crc << 4);
}

// calc_crc32_f24 calculates the forward CRC from @crc and the 2 LSB of @data_byte using the 4-bit @lookup_crc32 table

static inline crc32_t calc_crc32_f24(size_t const crc_msb, crc32_t const crc, uint8_t const data_byte, Lookup_CRC32 const lookup_crc32)
{
  return lookup_crc32(((crc >> (crc_msb - 2)) ^ data_byte) & 0x03) ^ (crc << 2);
}

// calc_crc32_f14 calculates the forward CRC from @crc and the 1 LSB of @data_byte using the 4-bit @lookup_crc32 table

static inline crc32_t calc_crc32_f14(size_t const crc_msb, crc32_t const crc, uint8_t const data_byte, Lookup_CRC32 const lookup_crc32)
{
  return lookup_crc32(((crc >> (crc_msb - 1)) ^ data_byte) & 0x01) ^ (crc << 1);
}

///////////////////////////////////////////////////////////////////////////////
//
// Shared CRC Kernel Functions

static crc32_t calc_crc32_offset(
  size_t const crc_msb,
  crc32_t const init,
  uint8_t const * data,
  size_t bit_offset,
  size_t bit_length,
  Lookup_CRC32 const lookup_crc32)
{
  // 1. Initialize CRC

  crc32_t crc = init;

  // 2. Skip to the first word to process

  fast_word_t * fast_data = (fast_word_t *) (((uintptr_t) (data + (bit_offset / 8))) & fast_alignment_mask);

  size_t const alignment_offset = (size_t) (data - (uint8_t *) fast_data);

  bit_offset = (alignment_offset * 8) + bit_offset;

  // 3. Process words

  size_t fast_data_len = (bit_length + fast_word_size_bits) / fast_word_size_bits;

  fast_word_t next_word = *fast_data;
  fast_data++;

  while (fast_data_len--) {

    // 4. Read next word, correct offset, and combine with current word to reform the underlying data

    fast_word_t current_word = next_word;
    next_word = *fast_data;

    fast_word_t aligned_word = current_word >> bit_offset;

    if (bit_offset > 0) {
      aligned_word |= next_word << (fast_word_size_bits - bit_offset);
    }

    // 5. Calculate the CRC across the reformed data

    uint8_t * temp_data = (uint8_t *) &aligned_word;

    size_t data_len;

    if (fast_data_len > 0) {
      data_len = sizeof(fast_word_t);
      bit_length -= fast_word_size_bits;
    } else if (crc_msb == 0) /* Reversed CRC */ {
      data_len = (bit_length + 7) / 8;
      bit_length = 0;
    } else /* Forward CRC */ {
      data_len = bit_length / 8;
      bit_length = bit_length % 8;
    }

    while (data_len--) {

      if (crc_msb == 0) {
        crc = calc_crc32_r84(crc_msb, crc, *temp_data, lookup_crc32);
      } else {
        crc = calc_crc32_f84(crc_msb, crc, *temp_data, lookup_crc32);
      }

      temp_data++;
    }

    if (bit_length == 0 || bit_length > 7) {
      fast_data++;
      continue;
    }

    // assert(crc_msb > 0); // ==> Must be a Forward CRC

    // 6. Calculate the Forward CRC across the 1 to 7 data-suffix bits

    *temp_data = *temp_data << (8 - bit_length);

    if (bit_length >= 4) {
      crc = calc_crc32_f44(crc_msb, crc, *temp_data, lookup_crc32);
      *temp_data = *temp_data << 4;
      bit_length -= 4;
    }

    if (bit_length >= 2) {
      crc = calc_crc32_f24(crc_msb, crc, *temp_data, lookup_crc32);
      *temp_data = *temp_data << 2;
      bit_length -= 2;
    }

    if (bit_length >= 1) {
      crc = calc_crc32_f14(crc_msb, crc, *temp_data, lookup_crc32);
      *temp_data = *temp_data << 1;
      bit_length -= 1;
    }
  }

  return crc;
}
