#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Forward Polynomial Lookup Tables
//
// crc64_Fx259c84cba6426349_Profile =
// {
//   "polynomial" : "x^64 + x^61 + x^58 + x^56 + x^55 + x^52 + x^51 + x^50 + x^47 + x^42 + x^39 + x^38 + x^35 + x^33 + x^32 + x^31 + x^29 + x^26 + x^25 + x^22 + x^17 + x^14 + x^13 + x^9 + x^8 + x^6 + x^3 + 1",
//   "degree"     : 64,
//   "explicit"   : "0x1259c84cba6426349",
//   "koopman"    : "0x92ce4265d32131a4",
//   "normal"     : "0x259c84cba6426349"
// }
//
///////////////////////////////////////////////////////////////////////////////

#include "crc_kernels/crc_kernel_tables.h"

#if defined(USE_CRC_KERNEL_TABLE8)

static uint64_t const Fx259c84cba6426349[256] =
{
    0x0000000000000000, 0x259c84cba6426349, 0x4b3909974c84c692, 0x6ea58d5ceac6a5db,
    0x9672132e99098d24, 0xb3ee97e53f4bee6d, 0xdd4b1ab9d58d4bb6, 0xf8d79e7273cf28ff,
    0x0978a29694517901, 0x2ce4265d32131a48, 0x4241ab01d8d5bf93, 0x67dd2fca7e97dcda,
    0x9f0ab1b80d58f425, 0xba963573ab1a976c, 0xd433b82f41dc32b7, 0xf1af3ce4e79e51fe,
    0x12f1452d28a2f202, 0x376dc1e68ee0914b, 0x59c84cba64263490, 0x7c54c871c26457d9,
    0x84835603b1ab7f26, 0xa11fd2c817e91c6f, 0xcfba5f94fd2fb9b4, 0xea26db5f5b6ddafd,
    0x1b89e7bbbcf38b03, 0x3e1563701ab1e84a, 0x50b0ee2cf0774d91, 0x752c6ae756352ed8,
    0x8dfbf49525fa0627, 0xa867705e83b8656e, 0xc6c2fd02697ec0b5, 0xe35e79c9cf3ca3fc,
    0x25e28a5a5145e404, 0x007e0e91f707874d, 0x6edb83cd1dc12296, 0x4b470706bb8341df,
    0xb3909974c84c6920, 0x960c1dbf6e0e0a69, 0xf8a990e384c8afb2, 0xdd351428228accfb,
    0x2c9a28ccc5149d05, 0x0906ac076356fe4c, 0x67a3215b89905b97, 0x423fa5902fd238de,
    0xbae83be25c1d1021, 0x9f74bf29fa5f7368, 0xf1d132751099d6b3, 0xd44db6beb6dbb5fa,
    0x3713cf7779e71606, 0x128f4bbcdfa5754f, 0x7c2ac6e03563d094, 0x59b6422b9321b3dd,
    0xa161dc59e0ee9b22, 0x84fd589246acf86b, 0xea58d5ceac6a5db0, 0xcfc451050a283ef9,
    0x3e6b6de1edb66f07, 0x1bf7e92a4bf40c4e, 0x75526476a132a995, 0x50cee0bd0770cadc,
    0xa8197ecf74bfe223, 0x8d85fa04d2fd816a, 0xe3207758383b24b1, 0xc6bcf3939e7947f8,
    0x4bc514b4a28bc808, 0x6e59907f04c9ab41, 0x00fc1d23ee0f0e9a, 0x256099e8484d6dd3,
    0xddb7079a3b82452c, 0xf82b83519dc02665, 0x968e0e0d770683be, 0xb3128ac6d144e0f7,
    0x42bdb62236dab109, 0x672132e99098d240, 0x0984bfb57a5e779b, 0x2c183b7edc1c14d2,
    0xd4cfa50cafd33c2d, 0xf15321c709915f64, 0x9ff6ac9be357fabf, 0xba6a2850451599f6,
    0x593451998a293a0a, 0x7ca8d5522c6b5943, 0x120d580ec6adfc98, 0x3791dcc560ef9fd1,
    0xcf4642b71320b72e, 0xeadac67cb562d467, 0x847f4b205fa471bc, 0xa1e3cfebf9e612f5,
    0x504cf30f1e78430b, 0x75d077c4b83a2042, 0x1b75fa9852fc8599, 0x3ee97e53f4bee6d0,
    0xc63ee0218771ce2f, 0xe3a264ea2133ad66, 0x8d07e9b6cbf508bd, 0xa89b6d7d6db76bf4,
    0x6e279eeef3ce2c0c, 0x4bbb1a25558c4f45, 0x251e9779bf4aea9e, 0x008213b2190889d7,
    0xf8558dc06ac7a128, 0xddc9090bcc85c261, 0xb36c8457264367ba, 0x96f0009c800104f3,
    0x675f3c78679f550d, 0x42c3b8b3c1dd3644, 0x2c6635ef2b1b939f, 0x09fab1248d59f0d6,
    0xf12d2f56fe96d829, 0xd4b1ab9d58d4bb60, 0xba1426c1b2121ebb, 0x9f88a20a14507df2,
    0x7cd6dbc3db6cde0e, 0x594a5f087d2ebd47, 0x37efd25497e8189c, 0x1273569f31aa7bd5,
    0xeaa4c8ed4265532a, 0xcf384c26e4273063, 0xa19dc17a0ee195b8, 0x840145b1a8a3f6f1,
    0x75ae79554f3da70f, 0x5032fd9ee97fc446, 0x3e9770c203b9619d, 0x1b0bf409a5fb02d4,
    0xe3dc6a7bd6342a2b, 0xc640eeb070764962, 0xa8e563ec9ab0ecb9, 0x8d79e7273cf28ff0,
    0x978a296945179010, 0xb216ada2e355f359, 0xdcb320fe09935682, 0xf92fa435afd135cb,
    0x01f83a47dc1e1d34, 0x2464be8c7a5c7e7d, 0x4ac133d0909adba6, 0x6f5db71b36d8b8ef,
    0x9ef28bffd146e911, 0xbb6e0f3477048a58, 0xd5cb82689dc22f83, 0xf05706a33b804cca,
    0x088098d1484f6435, 0x2d1c1c1aee0d077c, 0x43b9914604cba2a7, 0x6625158da289c1ee,
    0x857b6c446db56212, 0xa0e7e88fcbf7015b, 0xce4265d32131a480, 0xebdee1188773c7c9,
    0x13097f6af4bcef36, 0x3695fba152fe8c7f, 0x583076fdb83829a4, 0x7dacf2361e7a4aed,
    0x8c03ced2f9e41b13, 0xa99f4a195fa6785a, 0xc73ac745b560dd81, 0xe2a6438e1322bec8,
    0x1a71ddfc60ed9637, 0x3fed5937c6aff57e, 0x5148d46b2c6950a5, 0x74d450a08a2b33ec,
    0xb268a33314527414, 0x97f427f8b210175d, 0xf951aaa458d6b286, 0xdccd2e6ffe94d1cf,
    0x241ab01d8d5bf930, 0x018634d62b199a79, 0x6f23b98ac1df3fa2, 0x4abf3d41679d5ceb,
    0xbb1001a580030d15, 0x9e8c856e26416e5c, 0xf0290832cc87cb87, 0xd5b58cf96ac5a8ce,
    0x2d62128b190a8031, 0x08fe9640bf48e378, 0x665b1b1c558e46a3, 0x43c79fd7f3cc25ea,
    0xa099e61e3cf08616, 0x850562d59ab2e55f, 0xeba0ef8970744084, 0xce3c6b42d63623cd,
    0x36ebf530a5f90b32, 0x137771fb03bb687b, 0x7dd2fca7e97dcda0, 0x584e786c4f3faee9,
    0xa9e14488a8a1ff17, 0x8c7dc0430ee39c5e, 0xe2d84d1fe4253985, 0xc744c9d442675acc,
    0x3f9357a631a87233, 0x1a0fd36d97ea117a, 0x74aa5e317d2cb4a1, 0x5136dafadb6ed7e8,
    0xdc4f3ddde79c5818, 0xf9d3b91641de3b51, 0x9776344aab189e8a, 0xb2eab0810d5afdc3,
    0x4a3d2ef37e95d53c, 0x6fa1aa38d8d7b675, 0x01042764321113ae, 0x2498a3af945370e7,
    0xd5379f4b73cd2119, 0xf0ab1b80d58f4250, 0x9e0e96dc3f49e78b, 0xbb921217990b84c2,
    0x43458c65eac4ac3d, 0x66d908ae4c86cf74, 0x087c85f2a6406aaf, 0x2de00139000209e6,
    0xcebe78f0cf3eaa1a, 0xeb22fc3b697cc953, 0x8587716783ba6c88, 0xa01bf5ac25f80fc1,
    0x58cc6bde5637273e, 0x7d50ef15f0754477, 0x13f562491ab3e1ac, 0x3669e682bcf182e5,
    0xc7c6da665b6fd31b, 0xe25a5eadfd2db052, 0x8cffd3f117eb1589, 0xa963573ab1a976c0,
    0x51b4c948c2665e3f, 0x74284d8364243d76, 0x1a8dc0df8ee298ad, 0x3f11441428a0fbe4,
    0xf9adb787b6d9bc1c, 0xdc31334c109bdf55, 0xb294be10fa5d7a8e, 0x97083adb5c1f19c7,
    0x6fdfa4a92fd03138, 0x4a43206289925271, 0x24e6ad3e6354f7aa, 0x017a29f5c51694e3,
    0xf0d515112288c51d, 0xd54991da84caa654, 0xbbec1c866e0c038f, 0x9e70984dc84e60c6,
    0x66a7063fbb814839, 0x433b82f41dc32b70, 0x2d9e0fa8f7058eab, 0x08028b635147ede2,
    0xeb5cf2aa9e7b4e1e, 0xcec0766138392d57, 0xa065fb3dd2ff888c, 0x85f97ff674bdebc5,
    0x7d2ee1840772c33a, 0x58b2654fa130a073, 0x3617e8134bf605a8, 0x138b6cd8edb466e1,
    0xe224503c0a2a371f, 0xc7b8d4f7ac685456, 0xa91d59ab46aef18d, 0x8c81dd60e0ec92c4,
    0x745643129323ba3b, 0x51cac7d93561d972, 0x3f6f4a85dfa77ca9, 0x1af3ce4e79e51fe0
};

make_crc_kernel_f64_t8(Fx259c84cba6426349)

#else

static uint64_t const Fx259c84cba6426349[16] =
{
    0x0000000000000000, 0x259c84cba6426349, 0x4b3909974c84c692, 0x6ea58d5ceac6a5db,
    0x9672132e99098d24, 0xb3ee97e53f4bee6d, 0xdd4b1ab9d58d4bb6, 0xf8d79e7273cf28ff,
    0x0978a29694517901, 0x2ce4265d32131a48, 0x4241ab01d8d5bf93, 0x67dd2fca7e97dcda,
    0x9f0ab1b80d58f425, 0xba963573ab1a976c, 0xd433b82f41dc32b7, 0xf1af3ce4e79e51fe
};

make_crc_kernel_f64_t4(Fx259c84cba6426349)

#endif