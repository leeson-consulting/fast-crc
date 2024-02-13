#pragma once

// Polynomial           :      x^16 + x^12 + x^5 + 1
// HD4                  :      <= 32751 bits, 4093 bytes
// Implicit             :      0x8810
// Explicit             :      0x11021
// Reversed Implicit    :      0x8408
// Reversed Explicit    :      0x10811

static uint16_t const RPoly1021[16] =
{
  0x0000, 0x1081, 0x2102, 0x3183, 0x4204, 0x5285, 0x6306, 0x7387, 0x8408, 0x9489, 0xa50a, 0xb58b, 0xc60c, 0xd68d, 0xe70e, 0xf78f
};

static inline crc16_t lookup_RPoly1021(size_t const idx) { return RPoly1021[idx]; }
