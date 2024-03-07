#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc64_Fxad93d23594c935a9_Profile =
// {
//   "polynomial" : "x^64 + x^63 + x^61 + x^59 + x^58 + x^56 + x^55 + x^52 + x^49 + x^48 + x^47 + x^46 + x^44 + x^41 + x^37 + x^36 + x^34 + x^32 + x^31 + x^28 + x^26 + x^23 + x^22 + x^19 + x^16 + x^13 + x^12 + x^10 + x^8 + x^7 + x^5 + x^3 + 1",
//   "degree"     : 64,
//   "explicit"   : "0x1ad93d23594c935a9",
//   "koopman"    : "0xd6c9e91aca649ad4",
//   "normal"     : "0xad93d23594c935a9"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint64_t const Fxad93d23594c935a9[256] =
{
    0x0000000000000000, 0xad93d23594c935a9, 0xf6b4765ebd5b5efb, 0x5b27a46b29926b52,
    0x40fb3e88ee7f885f, 0xed68ecbd7ab6bdf6, 0xb64f48d65324d6a4, 0x1bdc9ae3c7ede30d,
    0x81f67d11dcff10be, 0x2c65af2448362517, 0x77420b4f61a44e45, 0xdad1d97af56d7bec,
    0xc10d4399328098e1, 0x6c9e91aca649ad48, 0x37b935c78fdbc61a, 0x9a2ae7f21b12f3b3,
    0xae7f28162d3714d5, 0x03ecfa23b9fe217c, 0x58cb5e48906c4a2e, 0xf5588c7d04a57f87,
    0xee84169ec3489c8a, 0x4317c4ab5781a923, 0x183060c07e13c271, 0xb5a3b2f5eadaf7d8,
    0x2f895507f1c8046b, 0x821a8732650131c2, 0xd93d23594c935a90, 0x74aef16cd85a6f39,
    0x6f726b8f1fb78c34, 0xc2e1b9ba8b7eb99d, 0x99c61dd1a2ecd2cf, 0x3455cfe43625e766,
    0xf16d8219cea71c03, 0x5cfe502c5a6e29aa, 0x07d9f44773fc42f8, 0xaa4a2672e7357751,
    0xb196bc9120d8945c, 0x1c056ea4b411a1f5, 0x4722cacf9d83caa7, 0xeab118fa094aff0e,
    0x709bff0812580cbd, 0xdd082d3d86913914, 0x862f8956af035246, 0x2bbc5b633bca67ef,
    0x3060c180fc2784e2, 0x9df313b568eeb14b, 0xc6d4b7de417cda19, 0x6b4765ebd5b5efb0,
    0x5f12aa0fe39008d6, 0xf281783a77593d7f, 0xa9a6dc515ecb562d, 0x04350e64ca026384,
    0x1fe994870def8089, 0xb27a46b29926b520, 0xe95de2d9b0b4de72, 0x44ce30ec247debdb,
    0xdee4d71e3f6f1868, 0x7377052baba62dc1, 0x2850a14082344693, 0x85c3737516fd733a,
    0x9e1fe996d1109037, 0x338c3ba345d9a59e, 0x68ab9fc86c4bcecc, 0xc5384dfdf882fb65,
    0x4f48d60609870daf, 0xe2db04339d4e3806, 0xb9fca058b4dc5354, 0x146f726d201566fd,
    0x0fb3e88ee7f885f0, 0xa2203abb7331b059, 0xf9079ed05aa3db0b, 0x54944ce5ce6aeea2,
    0xcebeab17d5781d11, 0x632d792241b128b8, 0x380add49682343ea, 0x95990f7cfcea7643,
    0x8e45959f3b07954e, 0x23d647aaafcea0e7, 0x78f1e3c1865ccbb5, 0xd56231f41295fe1c,
    0xe137fe1024b0197a, 0x4ca42c25b0792cd3, 0x1783884e99eb4781, 0xba105a7b0d227228,
    0xa1ccc098cacf9125, 0x0c5f12ad5e06a48c, 0x5778b6c67794cfde, 0xfaeb64f3e35dfa77,
    0x60c18301f84f09c4, 0xcd5251346c863c6d, 0x9675f55f4514573f, 0x3be6276ad1dd6296,
    0x203abd891630819b, 0x8da96fbc82f9b432, 0xd68ecbd7ab6bdf60, 0x7b1d19e23fa2eac9,
    0xbe25541fc72011ac, 0x13b6862a53e92405, 0x489122417a7b4f57, 0xe502f074eeb27afe,
    0xfede6a97295f99f3, 0x534db8a2bd96ac5a, 0x086a1cc99404c708, 0xa5f9cefc00cdf2a1,
    0x3fd3290e1bdf0112, 0x9240fb3b8f1634bb, 0xc9675f50a6845fe9, 0x64f48d65324d6a40,
    0x7f281786f5a0894d, 0xd2bbc5b36169bce4, 0x899c61d848fbd7b6, 0x240fb3eddc32e21f,
    0x105a7c09ea170579, 0xbdc9ae3c7ede30d0, 0xe6ee0a57574c5b82, 0x4b7dd862c3856e2b,
    0x50a1428104688d26, 0xfd3290b490a1b88f, 0xa61534dfb933d3dd, 0x0b86e6ea2dfae674,
    0x91ac011836e815c7, 0x3c3fd32da221206e, 0x671877468bb34b3c, 0xca8ba5731f7a7e95,
    0xd1573f90d8979d98, 0x7cc4eda54c5ea831, 0x27e349ce65ccc363, 0x8a709bfbf105f6ca,
    0x9e91ac0c130e1b5e, 0x33027e3987c72ef7, 0x6825da52ae5545a5, 0xc5b608673a9c700c,
    0xde6a9284fd719301, 0x73f940b169b8a6a8, 0x28dee4da402acdfa, 0x854d36efd4e3f853,
    0x1f67d11dcff10be0, 0xb2f403285b383e49, 0xe9d3a74372aa551b, 0x44407576e66360b2,
    0x5f9cef95218e83bf, 0xf20f3da0b547b616, 0xa92899cb9cd5dd44, 0x04bb4bfe081ce8ed,
    0x30ee841a3e390f8b, 0x9d7d562faaf03a22, 0xc65af24483625170, 0x6bc9207117ab64d9,
    0x7015ba92d04687d4, 0xdd8668a7448fb27d, 0x86a1cccc6d1dd92f, 0x2b321ef9f9d4ec86,
    0xb118f90be2c61f35, 0x1c8b2b3e760f2a9c, 0x47ac8f555f9d41ce, 0xea3f5d60cb547467,
    0xf1e3c7830cb9976a, 0x5c7015b69870a2c3, 0x0757b1ddb1e2c991, 0xaac463e8252bfc38,
    0x6ffc2e15dda9075d, 0xc26ffc20496032f4, 0x9948584b60f259a6, 0x34db8a7ef43b6c0f,
    0x2f07109d33d68f02, 0x8294c2a8a71fbaab, 0xd9b366c38e8dd1f9, 0x7420b4f61a44e450,
    0xee0a5304015617e3, 0x43998131959f224a, 0x18be255abc0d4918, 0xb52df76f28c47cb1,
    0xaef16d8cef299fbc, 0x0362bfb97be0aa15, 0x58451bd25272c147, 0xf5d6c9e7c6bbf4ee,
    0xc1830603f09e1388, 0x6c10d43664572621, 0x3737705d4dc54d73, 0x9aa4a268d90c78da,
    0x8178388b1ee19bd7, 0x2cebeabe8a28ae7e, 0x77cc4ed5a3bac52c, 0xda5f9ce03773f085,
    0x40757b122c610336, 0xede6a927b8a8369f, 0xb6c10d4c913a5dcd, 0x1b52df7905f36864,
    0x008e459ac21e8b69, 0xad1d97af56d7bec0, 0xf63a33c47f45d592, 0x5ba9e1f1eb8ce03b,
    0xd1d97a0a1a8916f1, 0x7c4aa83f8e402358, 0x276d0c54a7d2480a, 0x8afede61331b7da3,
    0x91224482f4f69eae, 0x3cb196b7603fab07, 0x679632dc49adc055, 0xca05e0e9dd64f5fc,
    0x502f071bc676064f, 0xfdbcd52e52bf33e6, 0xa69b71457b2d58b4, 0x0b08a370efe46d1d,
    0x10d4399328098e10, 0xbd47eba6bcc0bbb9, 0xe6604fcd9552d0eb, 0x4bf39df8019be542,
    0x7fa6521c37be0224, 0xd2358029a377378d, 0x891224428ae55cdf, 0x2481f6771e2c6976,
    0x3f5d6c94d9c18a7b, 0x92cebea14d08bfd2, 0xc9e91aca649ad480, 0x647ac8fff053e129,
    0xfe502f0deb41129a, 0x53c3fd387f882733, 0x08e45953561a4c61, 0xa5778b66c2d379c8,
    0xbeab1185053e9ac5, 0x1338c3b091f7af6c, 0x481f67dbb865c43e, 0xe58cb5ee2cacf197,
    0x20b4f813d42e0af2, 0x8d272a2640e73f5b, 0xd6008e4d69755409, 0x7b935c78fdbc61a0,
    0x604fc69b3a5182ad, 0xcddc14aeae98b704, 0x96fbb0c5870adc56, 0x3b6862f013c3e9ff,
    0xa142850208d11a4c, 0x0cd157379c182fe5, 0x57f6f35cb58a44b7, 0xfa6521692143711e,
    0xe1b9bb8ae6ae9213, 0x4c2a69bf7267a7ba, 0x170dcdd45bf5cce8, 0xba9e1fe1cf3cf941,
    0x8ecbd005f9191e27, 0x235802306dd02b8e, 0x787fa65b444240dc, 0xd5ec746ed08b7575,
    0xce30ee8d17669678, 0x63a33cb883afa3d1, 0x388498d3aa3dc883, 0x95174ae63ef4fd2a,
    0x0f3dad1425e60e99, 0xa2ae7f21b12f3b30, 0xf989db4a98bd5062, 0x541a097f0c7465cb,
    0x4fc6939ccb9986c6, 0xe25541a95f50b36f, 0xb972e5c276c2d83d, 0x14e137f7e20bed94
};

make_crc_kernel_f64_t8(Fxad93d23594c935a9)

#else

static uint64_t const Fxad93d23594c935a9[16] =
{
    0x0000000000000000, 0xad93d23594c935a9, 0xf6b4765ebd5b5efb, 0x5b27a46b29926b52,
    0x40fb3e88ee7f885f, 0xed68ecbd7ab6bdf6, 0xb64f48d65324d6a4, 0x1bdc9ae3c7ede30d,
    0x81f67d11dcff10be, 0x2c65af2448362517, 0x77420b4f61a44e45, 0xdad1d97af56d7bec,
    0xc10d4399328098e1, 0x6c9e91aca649ad48, 0x37b935c78fdbc61a, 0x9a2ae7f21b12f3b3
};

make_crc_kernel_f64_t4(Fxad93d23594c935a9)

#endif
