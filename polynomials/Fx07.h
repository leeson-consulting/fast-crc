#pragma once

// Polynomial           :      x^8 + x^2 + x + 1
// HD4                  :      <= 119 bits, 14 bytes
// Implicit             :      0x83
// Explicit             :      0x107
// Reversed Implicit    :      0xe0
// Reversed Explicit    :      0x1c1

static uint8_t const FPoly07[16] =
{
  0x00, 0x07, 0x0e, 0x09, 0x1c, 0x1b, 0x12, 0x15, 0x38, 0x3f, 0x36, 0x31, 0x24, 0x23, 0x2a, 0x2d
};

static inline crc8_t lookup_FPoly07(size_t const idx) { return FPoly07[idx]; }
