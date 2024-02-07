#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// UNUSED(parameter) macro to deal with C99 anachronisms
//

#if defined(__GNUC__)
#define UNUSED(x)       x##_UNUSED __attribute__((unused))
#else
#define UNUSED(x)       x##_UNUSED
#endif

///////////////////////////////////////////////////////////////////////////////
//
// fast_word_t etc.
//

#if defined(REQUIRE_CRC_OFFSET_KERNELX) || \
    defined(REQUIRE_CRC_OFFSET_KERNEL16) || \
    defined(REQUIRE_CRC_OFFSET_KERNEL32) || \
    defined(REQUIRE_CRC_OFFSET_KERNEL64)

typedef uint_fast16_t fast_word_t;
static size_t const fast_word_size_bits = sizeof(fast_word_t) * 8;
static uintptr_t const fast_alignment_mask = ~((uintptr_t) sizeof(fast_word_t) - 1);

#endif

