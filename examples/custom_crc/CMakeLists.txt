cmake_minimum_required(VERSION 3.21)

project(custom_crc
  VERSION 0.1.0
  LANGUAGES C
)

add_executable(custom_crc
  custom_crc.c
)

set(CRC_ALGORITHMS_INC_PATH "${CMAKE_CURRENT_SOURCE_DIR}")

add_subdirectory("../../" "fast_crc")

target_link_libraries(custom_crc
  PRIVATE fast_crc
)
