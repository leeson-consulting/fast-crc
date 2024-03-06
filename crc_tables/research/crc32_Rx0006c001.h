#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Reverse Polynomial Lookup Tables
//
// crc32_Rx0006c001_Profile =
// {
//   "polynomial" : "x^32 + x^18 + x^17 + x^15 + x^14 + 1",
//   "degree"     : 32,
//   "explicit"   : "0x10006c001",
//   "koopman"    : "0x80036000",
//   "normal"     : "0x6c001"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint32_t const Rx0006c001[256] =
{
    0x00000000, 0x010006c0, 0x02000d80, 0x03000b40, 0x04001b00, 0x05001dc0, 0x06001680, 0x07001040,
    0x08003600, 0x090030c0, 0x0a003b80, 0x0b003d40, 0x0c002d00, 0x0d002bc0, 0x0e002080, 0x0f002640,
    0x10006c00, 0x11006ac0, 0x12006180, 0x13006740, 0x14007700, 0x150071c0, 0x16007a80, 0x17007c40,
    0x18005a00, 0x19005cc0, 0x1a005780, 0x1b005140, 0x1c004100, 0x1d0047c0, 0x1e004c80, 0x1f004a40,
    0x2000d800, 0x2100dec0, 0x2200d580, 0x2300d340, 0x2400c300, 0x2500c5c0, 0x2600ce80, 0x2700c840,
    0x2800ee00, 0x2900e8c0, 0x2a00e380, 0x2b00e540, 0x2c00f500, 0x2d00f3c0, 0x2e00f880, 0x2f00fe40,
    0x3000b400, 0x3100b2c0, 0x3200b980, 0x3300bf40, 0x3400af00, 0x3500a9c0, 0x3600a280, 0x3700a440,
    0x38008200, 0x390084c0, 0x3a008f80, 0x3b008940, 0x3c009900, 0x3d009fc0, 0x3e009480, 0x3f009240,
    0x4001b000, 0x4101b6c0, 0x4201bd80, 0x4301bb40, 0x4401ab00, 0x4501adc0, 0x4601a680, 0x4701a040,
    0x48018600, 0x490180c0, 0x4a018b80, 0x4b018d40, 0x4c019d00, 0x4d019bc0, 0x4e019080, 0x4f019640,
    0x5001dc00, 0x5101dac0, 0x5201d180, 0x5301d740, 0x5401c700, 0x5501c1c0, 0x5601ca80, 0x5701cc40,
    0x5801ea00, 0x5901ecc0, 0x5a01e780, 0x5b01e140, 0x5c01f100, 0x5d01f7c0, 0x5e01fc80, 0x5f01fa40,
    0x60016800, 0x61016ec0, 0x62016580, 0x63016340, 0x64017300, 0x650175c0, 0x66017e80, 0x67017840,
    0x68015e00, 0x690158c0, 0x6a015380, 0x6b015540, 0x6c014500, 0x6d0143c0, 0x6e014880, 0x6f014e40,
    0x70010400, 0x710102c0, 0x72010980, 0x73010f40, 0x74011f00, 0x750119c0, 0x76011280, 0x77011440,
    0x78013200, 0x790134c0, 0x7a013f80, 0x7b013940, 0x7c012900, 0x7d012fc0, 0x7e012480, 0x7f012240,
    0x80036000, 0x810366c0, 0x82036d80, 0x83036b40, 0x84037b00, 0x85037dc0, 0x86037680, 0x87037040,
    0x88035600, 0x890350c0, 0x8a035b80, 0x8b035d40, 0x8c034d00, 0x8d034bc0, 0x8e034080, 0x8f034640,
    0x90030c00, 0x91030ac0, 0x92030180, 0x93030740, 0x94031700, 0x950311c0, 0x96031a80, 0x97031c40,
    0x98033a00, 0x99033cc0, 0x9a033780, 0x9b033140, 0x9c032100, 0x9d0327c0, 0x9e032c80, 0x9f032a40,
    0xa003b800, 0xa103bec0, 0xa203b580, 0xa303b340, 0xa403a300, 0xa503a5c0, 0xa603ae80, 0xa703a840,
    0xa8038e00, 0xa90388c0, 0xaa038380, 0xab038540, 0xac039500, 0xad0393c0, 0xae039880, 0xaf039e40,
    0xb003d400, 0xb103d2c0, 0xb203d980, 0xb303df40, 0xb403cf00, 0xb503c9c0, 0xb603c280, 0xb703c440,
    0xb803e200, 0xb903e4c0, 0xba03ef80, 0xbb03e940, 0xbc03f900, 0xbd03ffc0, 0xbe03f480, 0xbf03f240,
    0xc002d000, 0xc102d6c0, 0xc202dd80, 0xc302db40, 0xc402cb00, 0xc502cdc0, 0xc602c680, 0xc702c040,
    0xc802e600, 0xc902e0c0, 0xca02eb80, 0xcb02ed40, 0xcc02fd00, 0xcd02fbc0, 0xce02f080, 0xcf02f640,
    0xd002bc00, 0xd102bac0, 0xd202b180, 0xd302b740, 0xd402a700, 0xd502a1c0, 0xd602aa80, 0xd702ac40,
    0xd8028a00, 0xd9028cc0, 0xda028780, 0xdb028140, 0xdc029100, 0xdd0297c0, 0xde029c80, 0xdf029a40,
    0xe0020800, 0xe1020ec0, 0xe2020580, 0xe3020340, 0xe4021300, 0xe50215c0, 0xe6021e80, 0xe7021840,
    0xe8023e00, 0xe90238c0, 0xea023380, 0xeb023540, 0xec022500, 0xed0223c0, 0xee022880, 0xef022e40,
    0xf0026400, 0xf10262c0, 0xf2026980, 0xf3026f40, 0xf4027f00, 0xf50279c0, 0xf6027280, 0xf7027440,
    0xf8025200, 0xf90254c0, 0xfa025f80, 0xfb025940, 0xfc024900, 0xfd024fc0, 0xfe024480, 0xff024240
};

make_crc_kernel_r32_t8(Rx0006c001)

#else

static uint32_t const Rx0006c001[16] =
{
    0x00000000, 0x10006c00, 0x2000d800, 0x3000b400, 0x4001b000, 0x5001dc00, 0x60016800, 0x70010400,
    0x80036000, 0x90030c00, 0xa003b800, 0xb003d400, 0xc002d000, 0xd002bc00, 0xe0020800, 0xf0026400
};

make_crc_kernel_r32_t4(Rx0006c001)

#endif
