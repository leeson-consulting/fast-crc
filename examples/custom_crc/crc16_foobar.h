#pragma once

#include <stdint.h>
#include <stddef.h>

uint16_t crc16_FooBar_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_FooBar_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_FooBar_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_FooBar(uint8_t const *data, size_t const data_len);

