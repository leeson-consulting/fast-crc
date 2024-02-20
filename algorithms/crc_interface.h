#pragma once

#include "stdint.h"
#include "stdbool.h"

// @CRC_Parameters is used to capture the standardised CRC parameterisation popularised by Ross Williams [1]:
//  - Provided primarily for >> documentation purposes <<
//  - Used by unit tests to extract things like the "check" value
//  - Not suitable for use in production code due to member types, size, layout, etc.
//
// [1] "A Painless Guide to CRC Error Detection Algorithms", Ross Williams

typedef struct CRC_Parameters
{
  char const * const    name;         // eg. "CRC-8/Koopman"
  size_t const          width;        // in bits

  // @poly is a pseudo hex-string describing "F"orward/"R"everse CRC polynomial in explicit notation, but without the leading bit:
  //
  //   eg. "Fx1021"   ==>   Forward_Polynomial(x^16 + x^12 + x^5 + 1)
  //   eg. "Rx1021"   ==>   Reverse_Polynomial(x^16 + x^12 + x^5 + 1)
  //   eg. "Fx80f"    ==>   Forward_Polynomial(x^12 + x^11 + x^3 + x^2 + x + 1)
  //
  // The "F"/"R" component of the polynomial typically interacts with the table-based implementations,
  // where the entire table is encoded "Reversed" for "R"eversed polynomials.
  //
  // This eliminates the need to reverse the input data bits,
  // and (importantly) eliminates one bit shift operation in the implementation.
  //

  uint64_t const          poly;
  //char const * const    poly;

  uint64_t const        init;         // used to seed CRC value
  bool const            refin;        // are the data bits reflected when processed
  bool const            refout;       // are the CRC value bits reflected prior to XOR out
  uint64_t const        xorout;       // XORed with (possibly reflected) CRC value prior to return
  uint64_t const        check;        // the result of crc_algorithm("123456789")
  uint64_t const        residue;      // the result of crc_algorithm(codeword) == crc_algorithm(concat(dataword, crc_val))

} crc_parameters_t;

#if defined(UNIT_TESTS)

#define define_crc_parameters(crc_name, crc_width, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
static const crc_parameters_t \
crc##crc_width##_##crc_name##_params = { \
  .name     = "CRC-"#crc_width"/"#crc_name, \
  .width    = crc_width, \
  .poly     = 0xBaaDf00d, \
  .init     = crc_init, \
  .refin    = crc_refin, \
  .refout   = crc_refout, \
  .xorout   = crc_xorout, \
  .check    = crc_check, \
  .residue  = crc_residue \
}; \

#else

#define define_crc_parameters(crc_name, crc_width, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue)

#endif

///////////////////////////////////////////////////////////////////////////////
//
// CRC Interface Construction Macros
//

#define make_crc8_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 8, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint8_t crc8_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint8_t crc8_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc8_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc8_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc8_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint8_t crc8_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc8_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint8_t crc8_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc8_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint8_t crc8_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc8_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint8_t crc8_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc8_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc12_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 12, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc12_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc12_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc12_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc12_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc12_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc12_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc12_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc12_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc12_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc12_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc12_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc12_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc12_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc16_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 16, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc16_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc16_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc16_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc16_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc16_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc16_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc16_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc16_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc16_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc16_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc16_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc16_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc16_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc24_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 24, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc24_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc24_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc24_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc24_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc24_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc24_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc24_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc24_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc24_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc24_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc24_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc24_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc24_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc32_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 32, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc32_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc32_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc32_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc32_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc32_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc32_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc32_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc32_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc32_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc32_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc32_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc32_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc32_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc64_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 64, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc64_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc64_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc64_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc64_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc64_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc64_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc64_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc64_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc64_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc64_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc64_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc64_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc64_##crc_name##_finish(crc_init, data, data_len); \
} \

