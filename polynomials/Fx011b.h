#pragma once

// Polynomial           :      x^16 + x^8 + x^4 + x^3 + 1
// HD4+                 :      <= 28642 bits, 3580 bytes
// HD6                  :      <=    99 bits,   12 bytes
// Implicit             :      0x808d
// Explicit             :      0x1011b
// Reversed Implicit    :      0xd880
// Reversed Explicit    :      0x1b101

static uint16_t const FPoly011b[16] =
{
  0x0000, 0x011b, 0x0236, 0x032d, 0x046c, 0x0577, 0x065a, 0x0741, 0x08d8, 0x09c3, 0x0aee, 0x0bf5, 0x0cb4, 0x0daf, 0x0e82, 0x0f99
};

static inline crc16_t lookup_FPoly011b(size_t const idx) { return FPoly011b[idx]; }
