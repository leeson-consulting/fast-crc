cmake_minimum_required(VERSION 3.21)

project(kernel_selection
  VERSION 0.1.0
  LANGUAGES C
)

add_executable(kernel_selection
  kernel_selection.c
)

set(CRC_ALGORITHMS_INC_PATH "${CMAKE_CURRENT_SOURCE_DIR}")

add_subdirectory("../../" "fast_crc")

target_link_libraries(kernel_selection
  PRIVATE fast_crc
)
