#pragma once

// Polynomial           :      x^32 + x^18 + x^17 + x^15 + x^14 + 1
// HD4+                 :      >= 65538 bits, 8192 bytes
// HD6                  :      <= 32770 bits, 4096 bytes
// Implicit             :      
// Explicit             :      0x10006c001
// Reversed Implicit    :      
// Reversed Explicit    :      

static uint32_t const FPoly0006c001[16] =
{
  0x00000000, 0x0006c001, 0x000d8002, 0x000b4003, 0x001b0004, 0x001dc005, 0x00168006, 0x00104007, 0x00360008, 0x0030c009, 0x003b800a, 0x003d400b, 0x002d000c, 0x002bc00d, 0x0020800e, 0x0026400f
};

static inline crc32_t lookup_FPoly0006c001(size_t const idx) { return FPoly0006c001[idx]; }
