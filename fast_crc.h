#pragma once

#ifdef __cplusplus
extern "C" {
#endif

#include <stdint.h>
#include <stddef.h>

#define INCLUDE_INTERFACE         (1)
#define INCLUDE_IMPLEMENTATION    (2)

#define crc_algorithms_inc (INCLUDE_INTERFACE)

#include "crc_algorithms.inc"

#ifdef __cplusplus
}
#endif
