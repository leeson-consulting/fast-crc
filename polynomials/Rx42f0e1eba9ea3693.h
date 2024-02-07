#pragma once

static uint64_t const RPoly42f0e1eba9ea3693[16] =
{
  0x0000000000000000, 0x7d9ba13851336649, 0xfb374270a266cc92, 0x86ace348f355aadb,
  0x64b62bcaebc387a1, 0x192d8af2baf0e1e8, 0x9f8169ba49a54b33, 0xe21ac88218962d7a,
  0xc96c5795d7870f42, 0xb4f7f6ad86b4690b, 0x325b15e575e1c3d0, 0x4fc0b4dd24d2a599,
  0xadda7c5f3c4488e3, 0xd041dd676d77eeaa, 0x56ed3e2f9e224471, 0x2b769f17cf112238
};

static inline crc64_t lookup_RPoly42f0e1eba9ea3693(size_t const idx) { return RPoly42f0e1eba9ea3693[idx]; }
