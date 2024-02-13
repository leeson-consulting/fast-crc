#pragma once

// Polynomial           :      x^24 + x^16 + x^15 + x^9 + x^8 + 1
// HD4+                 :      <= 4070 bits, 508 bytes
// HD6                  :      <= 2024 bits, 253 bytes
// Implicit             :      
// Explicit             :      0x1018301
// Reversed Implicit    :      
// Reversed Explicit    :      

static uint32_t const FPoly018301[16] =
{
  0x000000, 0x018301, 0x030602, 0x028503, 0x060c04, 0x078f05, 0x050a06, 0x048907, 0x0c1808, 0x0d9b09, 0x0f1e0a, 0x0e9d0b, 0x0a140c, 0x0b970d, 0x09120e, 0x08910f
};

static inline crc24_t lookup_FPoly018301(size_t const idx) { return FPoly018301[idx]; }
