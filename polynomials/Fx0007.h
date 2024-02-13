#pragma once

// Polynomial           :      x^16 + x^2 + x + 1
// HD4                  :      <= 32751 bits, 4093 bytes
// Implicit             :      0x8003
// Explicit             :      0x10007
// Reversed Implicit    :      0xe000
// Reversed Explicit    :      0x1c001

static uint16_t const FPoly0007[16] =
{
  0x0000, 0x0007, 0x000e, 0x0009, 0x001c, 0x001b, 0x0012, 0x0015, 0x0038, 0x003f, 0x0036, 0x0031, 0x0024, 0x0023, 0x002a, 0x002d
};

static inline crc16_t lookup_FPoly0007(size_t const idx) { return FPoly0007[idx]; }
