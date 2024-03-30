cmake_minimum_required(VERSION 3.5)

project(lib_fast_crc
  VERSION 0.1.0
  LANGUAGES C
)

if( NOT DEFINED CRC_ALGORITHMS_INC_PATH)
  set(CRC_ALGORITHMS_INC_PATH "$ENV{CRC_ALGORITHMS_INC_PATH}")
endif()

if( NOT DEFINED CRC_ALGORITHMS_INC_PATH OR
    NOT IS_DIRECTORY "${CRC_ALGORITHMS_INC_PATH}" OR
    NOT EXISTS "${CRC_ALGORITHMS_INC_PATH}/crc_algorithms.inc")
  message(FATAL_ERROR
[[

  CRC_ALGORITHMS_INC_PATH undefined or invalid.

  CRC_ALGORITHMS_INC_PATH points to a directory containing a crc_algorithms.inc template file.
  This template specifies the CRC algorithms required by your project.
  CRC_ALGORITHMS_INC_PATH can be set in your project's CMakeLists.txt or via the environment.

]]
"  See \"${CMAKE_CURRENT_SOURCE_DIR}/templates\" for crc_algorithms.inc examples.\n"
)
endif()

message("Configuring lib_fast_crc using \"${CRC_ALGORITHMS_INC_PATH}/crc_algorithms.inc\"\n")

add_library(fast_crc fast_crc.c)

target_include_directories(fast_crc
  PRIVATE "${CRC_ALGORITHMS_INC_PATH}"
  PUBLIC  "."
)

