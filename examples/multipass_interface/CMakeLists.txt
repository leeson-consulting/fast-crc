cmake_minimum_required(VERSION 3.21)

project(multipass_interface
  VERSION 0.1.0
  LANGUAGES C
)

add_executable(multipass_interface
  multipass_interface.c
)

set(CRC_ALGORITHMS_INC_PATH "${CMAKE_CURRENT_SOURCE_DIR}")

add_subdirectory("../../" "fast_crc")

target_link_libraries(multipass_interface
  PRIVATE fast_crc
)
