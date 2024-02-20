#pragma once

#include "stdint.h"
#include "stdbool.h"

// @CRC_Parameters is used to capture the standardised CRC parameterisation popularised by Ross Williams [1]:
//  - Provided primarily for >> documentation purposes <<
//  - Used by unit tests to extract things like the "check" value
//  - Not suitable for use in production code due to size and layout etc.
//
// [1] "A Painless Guide to CRC Error Detection Algorithms", Ross Williams

typedef struct CRC_Parameters
{
  char const * const    name;         // eg. "CRC-8/Koopman"
  size_t const          width;        // in bits

  // @poly is expressed in explicit forward notation, but without the leading bit:
  //
  //   eg. x^16 + x^12 + x^5 + 1             ==>   0x1021
  //   eg. x^12 + x^11 + x^3 + x^2 + x + 1   ==>   0x080f
  //

  uint64_t const        poly;

  uint64_t const        init;         // used to seed CRC value
  bool const            refin;        // are the data bits reflected when processed
  bool const            refout;       // are the CRC value bits reflected prior to XOR out
  uint64_t const        xorout;       // XORed with (possibly reflected) CRC value prior to return
  uint64_t const        check;        // the result of crc_algorithm("123456789")
  uint64_t const        residue;      // the result of crc_algorithm(codeword) == crc_algorithm(concat(dataword, crc_val))

} crc_parameters_t;

