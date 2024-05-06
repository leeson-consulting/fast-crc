#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc31_Fxc3001_Profile =
// {
//   "id" : {
//     "polynomial" : "x^31 + x^19 + x^18 + x^13 + x^12 + 1",
//     "degree"     : 31,
//     "explicit"   : "0x800c3001",
//     "koopman"    : "0x40061800",
//     "normal"     : "0xc3001"
//   },
//   "hd" :     [null, null, null,
//     /* 3 */ { "bits"    : 32738, "bytes"   : 4092 },
//     /* 4 */ { "bits"    : 32738, "bytes"   : 4092 },
//     /* 5 */ { "bits"    : 32738, "bytes"   : 4092 },
//     /* 6 */ { "bits"    : 32738, "bytes"   : 4092 }
//   ],
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint32_t const crc31_Fxc3001_tbl[256] =
{
    0x00000000, 0x000c3001, 0x00186002, 0x00145003, 0x0030c004, 0x003cf005, 0x0028a006, 0x00249007,
    0x00618008, 0x006db009, 0x0079e00a, 0x0075d00b, 0x0051400c, 0x005d700d, 0x0049200e, 0x0045100f,
    0x00c30010, 0x00cf3011, 0x00db6012, 0x00d75013, 0x00f3c014, 0x00fff015, 0x00eba016, 0x00e79017,
    0x00a28018, 0x00aeb019, 0x00bae01a, 0x00b6d01b, 0x0092401c, 0x009e701d, 0x008a201e, 0x0086101f,
    0x01860020, 0x018a3021, 0x019e6022, 0x01925023, 0x01b6c024, 0x01baf025, 0x01aea026, 0x01a29027,
    0x01e78028, 0x01ebb029, 0x01ffe02a, 0x01f3d02b, 0x01d7402c, 0x01db702d, 0x01cf202e, 0x01c3102f,
    0x01450030, 0x01493031, 0x015d6032, 0x01515033, 0x0175c034, 0x0179f035, 0x016da036, 0x01619037,
    0x01248038, 0x0128b039, 0x013ce03a, 0x0130d03b, 0x0114403c, 0x0118703d, 0x010c203e, 0x0100103f,
    0x030c0040, 0x03003041, 0x03146042, 0x03185043, 0x033cc044, 0x0330f045, 0x0324a046, 0x03289047,
    0x036d8048, 0x0361b049, 0x0375e04a, 0x0379d04b, 0x035d404c, 0x0351704d, 0x0345204e, 0x0349104f,
    0x03cf0050, 0x03c33051, 0x03d76052, 0x03db5053, 0x03ffc054, 0x03f3f055, 0x03e7a056, 0x03eb9057,
    0x03ae8058, 0x03a2b059, 0x03b6e05a, 0x03bad05b, 0x039e405c, 0x0392705d, 0x0386205e, 0x038a105f,
    0x028a0060, 0x02863061, 0x02926062, 0x029e5063, 0x02bac064, 0x02b6f065, 0x02a2a066, 0x02ae9067,
    0x02eb8068, 0x02e7b069, 0x02f3e06a, 0x02ffd06b, 0x02db406c, 0x02d7706d, 0x02c3206e, 0x02cf106f,
    0x02490070, 0x02453071, 0x02516072, 0x025d5073, 0x0279c074, 0x0275f075, 0x0261a076, 0x026d9077,
    0x02288078, 0x0224b079, 0x0230e07a, 0x023cd07b, 0x0218407c, 0x0214707d, 0x0200207e, 0x020c107f,
    0x06180080, 0x06143081, 0x06006082, 0x060c5083, 0x0628c084, 0x0624f085, 0x0630a086, 0x063c9087,
    0x06798088, 0x0675b089, 0x0661e08a, 0x066dd08b, 0x0649408c, 0x0645708d, 0x0651208e, 0x065d108f,
    0x06db0090, 0x06d73091, 0x06c36092, 0x06cf5093, 0x06ebc094, 0x06e7f095, 0x06f3a096, 0x06ff9097,
    0x06ba8098, 0x06b6b099, 0x06a2e09a, 0x06aed09b, 0x068a409c, 0x0686709d, 0x0692209e, 0x069e109f,
    0x079e00a0, 0x079230a1, 0x078660a2, 0x078a50a3, 0x07aec0a4, 0x07a2f0a5, 0x07b6a0a6, 0x07ba90a7,
    0x07ff80a8, 0x07f3b0a9, 0x07e7e0aa, 0x07ebd0ab, 0x07cf40ac, 0x07c370ad, 0x07d720ae, 0x07db10af,
    0x075d00b0, 0x075130b1, 0x074560b2, 0x074950b3, 0x076dc0b4, 0x0761f0b5, 0x0775a0b6, 0x077990b7,
    0x073c80b8, 0x0730b0b9, 0x0724e0ba, 0x0728d0bb, 0x070c40bc, 0x070070bd, 0x071420be, 0x071810bf,
    0x051400c0, 0x051830c1, 0x050c60c2, 0x050050c3, 0x0524c0c4, 0x0528f0c5, 0x053ca0c6, 0x053090c7,
    0x057580c8, 0x0579b0c9, 0x056de0ca, 0x0561d0cb, 0x054540cc, 0x054970cd, 0x055d20ce, 0x055110cf,
    0x05d700d0, 0x05db30d1, 0x05cf60d2, 0x05c350d3, 0x05e7c0d4, 0x05ebf0d5, 0x05ffa0d6, 0x05f390d7,
    0x05b680d8, 0x05bab0d9, 0x05aee0da, 0x05a2d0db, 0x058640dc, 0x058a70dd, 0x059e20de, 0x059210df,
    0x049200e0, 0x049e30e1, 0x048a60e2, 0x048650e3, 0x04a2c0e4, 0x04aef0e5, 0x04baa0e6, 0x04b690e7,
    0x04f380e8, 0x04ffb0e9, 0x04ebe0ea, 0x04e7d0eb, 0x04c340ec, 0x04cf70ed, 0x04db20ee, 0x04d710ef,
    0x045100f0, 0x045d30f1, 0x044960f2, 0x044550f3, 0x0461c0f4, 0x046df0f5, 0x0479a0f6, 0x047590f7,
    0x043080f8, 0x043cb0f9, 0x0428e0fa, 0x0424d0fb, 0x040040fc, 0x040c70fd, 0x041820fe, 0x041410ff
};

make_crc_kernel_f31_t8(Fxc3001)

#else

static uint32_t const crc31_Fxc3001_tbl[16] =
{
    0x00000000, 0x000c3001, 0x00186002, 0x00145003, 0x0030c004, 0x003cf005, 0x0028a006, 0x00249007,
    0x00618008, 0x006db009, 0x0079e00a, 0x0075d00b, 0x0051400c, 0x005d700d, 0x0049200e, 0x0045100f
};

make_crc_kernel_f31_t4(Fxc3001)

#endif
