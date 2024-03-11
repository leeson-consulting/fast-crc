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

  char const * const    poly;

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
  .poly     = #crc_poly, \
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

///////////////////////////////////////////////////////////////////////////////

#define make_crc3_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 3, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint8_t crc3_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint8_t crc3_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc3_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc3_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc3_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint8_t crc3_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc3_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint8_t crc3_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc3_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint8_t crc3_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc3_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint8_t crc3_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc3_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc4_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 4, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint8_t crc4_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint8_t crc4_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc4_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc4_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc4_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint8_t crc4_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc4_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint8_t crc4_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc4_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint8_t crc4_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc4_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint8_t crc4_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc4_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc5_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 5, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint8_t crc5_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint8_t crc5_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc5_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc5_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc5_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint8_t crc5_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc5_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint8_t crc5_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc5_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint8_t crc5_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc5_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint8_t crc5_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc5_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc6_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 6, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint8_t crc6_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint8_t crc6_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc6_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc6_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc6_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint8_t crc6_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc6_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint8_t crc6_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc6_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint8_t crc6_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc6_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint8_t crc6_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc6_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc7_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 7, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint8_t crc7_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint8_t crc7_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc7_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len); \
\
uint8_t crc7_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc7_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint8_t crc7_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc7_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint8_t crc7_##crc_name##_continue(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc7_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint8_t crc7_##crc_name##_finish(uint8_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc7_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint8_t crc7_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc7_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

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

#define make_crc9_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 9, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc9_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc9_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc9_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc9_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc9_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc9_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc9_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc9_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc9_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc9_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc9_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc9_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc9_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc10_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 10, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc10_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc10_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc10_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc10_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc10_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc10_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc10_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc10_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc10_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc10_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc10_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc10_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc10_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc11_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 11, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc11_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc11_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc11_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc11_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc11_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc11_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc11_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc11_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc11_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc11_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc11_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc11_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc11_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc12_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 12, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc12_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc12_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc12_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc12_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc12_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc12_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc12_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc12_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc12_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc12_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc12_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc12_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc12_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc13_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 13, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc13_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc13_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc13_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc13_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc13_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc13_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc13_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc13_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc13_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc13_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc13_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc13_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc13_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc14_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 14, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc14_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc14_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc14_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc14_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc14_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc14_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc14_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc14_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc14_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc14_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc14_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc14_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc14_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc15_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 15, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc15_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc15_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc15_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc15_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc15_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc15_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc15_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc15_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc15_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc15_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc15_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc15_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc15_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc16_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 16, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint16_t crc16_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint16_t crc16_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc16_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len); \
\
uint16_t crc16_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc16_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint16_t crc16_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc16_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint16_t crc16_##crc_name##_continue(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc16_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint16_t crc16_##crc_name##_finish(uint16_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc16_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint16_t crc16_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc16_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc17_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 17, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc17_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc17_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc17_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc17_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc17_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc17_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc17_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc17_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc17_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc17_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc17_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc17_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc17_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc18_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 18, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc18_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc18_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc18_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc18_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc18_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc18_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc18_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc18_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc18_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc18_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc18_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc18_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc18_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc19_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 19, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc19_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc19_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc19_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc19_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc19_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc19_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc19_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc19_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc19_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc19_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc19_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc19_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc19_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc20_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 20, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc20_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc20_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc20_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc20_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc20_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc20_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc20_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc20_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc20_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc20_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc20_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc20_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc20_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc21_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 21, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc21_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc21_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc21_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc21_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc21_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc21_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc21_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc21_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc21_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc21_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc21_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc21_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc21_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc22_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 22, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc22_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc22_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc22_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc22_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc22_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc22_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc22_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc22_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc22_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc22_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc22_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc22_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc22_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc23_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 23, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc23_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc23_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc23_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc23_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc23_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc23_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc23_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc23_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc23_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc23_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc23_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc23_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc23_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc24_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 24, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc24_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc24_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc24_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc24_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc24_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc24_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc24_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc24_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc24_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc24_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc24_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc24_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc24_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc25_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 25, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc25_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc25_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc25_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc25_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc25_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc25_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc25_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc25_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc25_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc25_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc25_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc25_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc25_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc26_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 26, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc26_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc26_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc26_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc26_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc26_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc26_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc26_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc26_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc26_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc26_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc26_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc26_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc26_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc27_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 27, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc27_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc27_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc27_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc27_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc27_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc27_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc27_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc27_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc27_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc27_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc27_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc27_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc27_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc28_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 28, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc28_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc28_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc28_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc28_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc28_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc28_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc28_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc28_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc28_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc28_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc28_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc28_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc28_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc29_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 29, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc29_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc29_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc29_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc29_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc29_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc29_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc29_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc29_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc29_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc29_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc29_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc29_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc29_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc30_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 30, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc30_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc30_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc30_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc30_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc30_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc30_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc30_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc30_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc30_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc30_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc30_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc30_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc30_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc31_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 31, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc31_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc31_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc31_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc31_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc31_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc31_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc31_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc31_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc31_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc31_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc31_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc31_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc31_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc32_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 32, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint32_t crc32_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint32_t crc32_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc32_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len); \
\
uint32_t crc32_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc32_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint32_t crc32_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc32_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint32_t crc32_##crc_name##_continue(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc32_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint32_t crc32_##crc_name##_finish(uint32_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc32_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint32_t crc32_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc32_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc33_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 33, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc33_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc33_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc33_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc33_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc33_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc33_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc33_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc33_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc33_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc33_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc33_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc33_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc33_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc34_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 34, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc34_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc34_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc34_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc34_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc34_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc34_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc34_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc34_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc34_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc34_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc34_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc34_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc34_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc35_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 35, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc35_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc35_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc35_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc35_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc35_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc35_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc35_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc35_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc35_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc35_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc35_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc35_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc35_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc36_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 36, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc36_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc36_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc36_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc36_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc36_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc36_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc36_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc36_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc36_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc36_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc36_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc36_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc36_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc37_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 37, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc37_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc37_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc37_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc37_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc37_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc37_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc37_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc37_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc37_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc37_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc37_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc37_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc37_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc38_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 38, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc38_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc38_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc38_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc38_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc38_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc38_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc38_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc38_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc38_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc38_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc38_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc38_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc38_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc39_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 39, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc39_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc39_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc39_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc39_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc39_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc39_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc39_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc39_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc39_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc39_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc39_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc39_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc39_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc40_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 40, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc40_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc40_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc40_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc40_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc40_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc40_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc40_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc40_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc40_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc40_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc40_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc40_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc40_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc41_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 41, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc41_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc41_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc41_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc41_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc41_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc41_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc41_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc41_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc41_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc41_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc41_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc41_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc41_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc42_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 42, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc42_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc42_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc42_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc42_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc42_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc42_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc42_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc42_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc42_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc42_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc42_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc42_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc42_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc43_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 43, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc43_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc43_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc43_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc43_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc43_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc43_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc43_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc43_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc43_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc43_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc43_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc43_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc43_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc44_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 44, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc44_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc44_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc44_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc44_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc44_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc44_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc44_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc44_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc44_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc44_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc44_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc44_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc44_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc45_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 45, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc45_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc45_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc45_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc45_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc45_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc45_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc45_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc45_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc45_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc45_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc45_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc45_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc45_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc46_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 46, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc46_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc46_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc46_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc46_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc46_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc46_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc46_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc46_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc46_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc46_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc46_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc46_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc46_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc47_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 47, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc47_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc47_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc47_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc47_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc47_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc47_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc47_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc47_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc47_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc47_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc47_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc47_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc47_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc48_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 48, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc48_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc48_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc48_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc48_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc48_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc48_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc48_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc48_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc48_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc48_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc48_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc48_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc48_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc49_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 49, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc49_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc49_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc49_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc49_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc49_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc49_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc49_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc49_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc49_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc49_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc49_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc49_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc49_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc50_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 50, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc50_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc50_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc50_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc50_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc50_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc50_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc50_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc50_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc50_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc50_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc50_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc50_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc50_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc51_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 51, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc51_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc51_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc51_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc51_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc51_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc51_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc51_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc51_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc51_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc51_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc51_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc51_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc51_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc52_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 52, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc52_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc52_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc52_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc52_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc52_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc52_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc52_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc52_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc52_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc52_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc52_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc52_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc52_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc53_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 53, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc53_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc53_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc53_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc53_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc53_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc53_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc53_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc53_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc53_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc53_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc53_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc53_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc53_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc54_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 54, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc54_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc54_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc54_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc54_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc54_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc54_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc54_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc54_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc54_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc54_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc54_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc54_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc54_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc55_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 55, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc55_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc55_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc55_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc55_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc55_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc55_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc55_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc55_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc55_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc55_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc55_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc55_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc55_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc56_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 56, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc56_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc56_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc56_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc56_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc56_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc56_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc56_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc56_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc56_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc56_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc56_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc56_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc56_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc57_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 57, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc57_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc57_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc57_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc57_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc57_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc57_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc57_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc57_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc57_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc57_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc57_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc57_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc57_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc58_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 58, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc58_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc58_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc58_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc58_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc58_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc58_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc58_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc58_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc58_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc58_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc58_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc58_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc58_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc59_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 59, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc59_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc59_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc59_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc59_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc59_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc59_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc59_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc59_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc59_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc59_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc59_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc59_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc59_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc60_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 60, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc60_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc60_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc60_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc60_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc60_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc60_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc60_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc60_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc60_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc60_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc60_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc60_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc60_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc61_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 61, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc61_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc61_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc61_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc61_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc61_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc61_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc61_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc61_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc61_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc61_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc61_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc61_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc61_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc62_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 62, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc62_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc62_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc62_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc62_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc62_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc62_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc62_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc62_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc62_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc62_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc62_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc62_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc62_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc63_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 63, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc63_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc63_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc63_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc63_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc63_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc63_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc63_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc63_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc63_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc63_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc63_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc63_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc63_##crc_name##_finish(crc_init, data, data_len); \
} \

///////////////////////////////////////////////////////////////////////////////

#define make_crc64_interface(crc_name, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
define_crc_parameters(crc_name, /* crc_width = */ 64, crc_poly, crc_init, crc_refin, crc_refout, crc_xorout, crc_check, crc_residue) \
\
uint64_t crc64_##crc_name##_start(uint8_t const *data, size_t const data_len); \
\
uint64_t crc64_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc64_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len); \
\
uint64_t crc64_##crc_name(uint8_t const *data, size_t const data_len); \

#define make_crc64_implementation(crc_name, crc_poly, crc_init, crc_xorout) \
\
uint64_t crc64_##crc_name##_start(uint8_t const *data, size_t const data_len) \
{ \
  return crc64_##crc_poly(/* init = */ crc_init, data, data_len); \
} \
\
uint64_t crc64_##crc_name##_continue(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc64_##crc_poly(/* init = */ crc, data, data_len); \
} \
\
uint64_t crc64_##crc_name##_finish(uint64_t const crc, uint8_t const *data, size_t const data_len) \
{ \
  return crc64_##crc_poly(/* init = */ crc, data, data_len) ^ crc_xorout; /* NB. Compiler eliminates xor(0) */ \
} \
\
uint64_t crc64_##crc_name(uint8_t const *data, size_t const data_len) \
{ \
  return crc64_##crc_name##_finish(crc_init, data, data_len); \
} \

