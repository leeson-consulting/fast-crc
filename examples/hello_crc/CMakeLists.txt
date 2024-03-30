cmake_minimum_required(VERSION 3.21)

project(hello_crc
  VERSION 0.1.0
  LANGUAGES C
)

add_executable(hello_crc
  hello_crc.c
)

set(CRC_ALGORITHMS_INC_PATH "${CMAKE_CURRENT_SOURCE_DIR}")

add_subdirectory("../../" "fast_crc")

target_link_libraries(hello_crc
  PRIVATE fast_crc
)
