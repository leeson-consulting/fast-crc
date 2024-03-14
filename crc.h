#pragma once

///////////////////////////////////////////////////////////////////////////////
//
// Fast-CRC Algorithm Interfaces
//

#include <stdint.h>
#include <stddef.h>

uint16_t crc16_Fast6_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_Fast6_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_Fast6_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_Fast6(uint8_t const *data, size_t const data_len);

uint32_t crc32_Fast6_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_Fast6_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_Fast6_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_Fast6(uint8_t const *data, size_t const data_len);

uint16_t crc16_Fast4_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_Fast4_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_Fast4_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_Fast4(uint8_t const *data, size_t const data_len);

uint8_t crc8_Fast4_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_Fast4_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_Fast4_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_Fast4(uint8_t const *data, size_t const data_len);

uint64_t crc64_Fast6_start(uint8_t const *data, size_t const data_len);
uint64_t crc64_Fast6_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_Fast6_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_Fast6(uint8_t const *data, size_t const data_len);

uint32_t crc24_Fast6_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_Fast6_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_Fast6_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_Fast6(uint8_t const *data, size_t const data_len);

uint32_t crc24_Fast4_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_Fast4_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_Fast4_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_Fast4(uint8_t const *data, size_t const data_len);

uint32_t crc32_Nguyen_Fx0006c001_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_Nguyen_Fx0006c001_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_Nguyen_Fx0006c001_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_Nguyen_Fx0006c001(uint8_t const *data, size_t const data_len);

uint32_t crc24_Nguyen_Fx018301_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_Nguyen_Fx018301_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_Nguyen_Fx018301_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_Nguyen_Fx018301(uint8_t const *data, size_t const data_len);

uint16_t crc16_Nguyen_Fx011b_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_Nguyen_Fx011b_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_Nguyen_Fx011b_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_Nguyen_Fx011b(uint8_t const *data, size_t const data_len);

uint8_t crc8_Koopman_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_Koopman_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_Koopman_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_Koopman(uint8_t const *data, size_t const data_len);

uint8_t crc5_USB_start(uint8_t const *data, size_t const data_len);
uint8_t crc5_USB_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc5_USB_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc5_USB(uint8_t const *data, size_t const data_len);

uint8_t crc8_HITAG_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_HITAG_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_HITAG_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_HITAG(uint8_t const *data, size_t const data_len);

uint32_t crc24_LTE_A_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_LTE_A_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_LTE_A_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_LTE_A(uint8_t const *data, size_t const data_len);

uint16_t crc16_M17_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_M17_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_M17_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_M17(uint8_t const *data, size_t const data_len);

uint16_t crc16_RIELLO_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_RIELLO_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_RIELLO_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_RIELLO(uint8_t const *data, size_t const data_len);

uint8_t crc3_ROHC_start(uint8_t const *data, size_t const data_len);
uint8_t crc3_ROHC_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc3_ROHC_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc3_ROHC(uint8_t const *data, size_t const data_len);

uint8_t crc4_G_704_start(uint8_t const *data, size_t const data_len);
uint8_t crc4_G_704_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc4_G_704_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc4_G_704(uint8_t const *data, size_t const data_len);

uint16_t crc16_EN_13757_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_EN_13757_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_EN_13757_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_EN_13757(uint8_t const *data, size_t const data_len);

uint32_t crc32_ISCSI_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_ISCSI_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_ISCSI_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_ISCSI(uint8_t const *data, size_t const data_len);

uint16_t crc16_GENIBUS_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_GENIBUS_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_GENIBUS_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_GENIBUS(uint8_t const *data, size_t const data_len);

uint8_t crc8_SAE_J1850_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_SAE_J1850_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_SAE_J1850_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_SAE_J1850(uint8_t const *data, size_t const data_len);

uint8_t crc6_CDMA2000_A_start(uint8_t const *data, size_t const data_len);
uint8_t crc6_CDMA2000_A_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_CDMA2000_A_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_CDMA2000_A(uint8_t const *data, size_t const data_len);

uint64_t crc64_MS_start(uint8_t const *data, size_t const data_len);
uint64_t crc64_MS_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_MS_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_MS(uint8_t const *data, size_t const data_len);

uint32_t crc24_BLE_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_BLE_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_BLE_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_BLE(uint8_t const *data, size_t const data_len);

uint16_t crc16_DDS_110_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_DDS_110_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_DDS_110_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_DDS_110(uint8_t const *data, size_t const data_len);

uint16_t crc16_IBM_SDLC_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_IBM_SDLC_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_IBM_SDLC_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_IBM_SDLC(uint8_t const *data, size_t const data_len);

uint8_t crc8_MAXIM_DOW_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_MAXIM_DOW_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_MAXIM_DOW_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_MAXIM_DOW(uint8_t const *data, size_t const data_len);

uint8_t crc8_TECH_3250_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_TECH_3250_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_TECH_3250_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_TECH_3250(uint8_t const *data, size_t const data_len);

uint16_t crc12_CDMA2000_start(uint8_t const *data, size_t const data_len);
uint16_t crc12_CDMA2000_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc12_CDMA2000_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc12_CDMA2000(uint8_t const *data, size_t const data_len);

uint8_t crc7_UMTS_start(uint8_t const *data, size_t const data_len);
uint8_t crc7_UMTS_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc7_UMTS_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc7_UMTS(uint8_t const *data, size_t const data_len);

uint8_t crc8_BLUETOOTH_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_BLUETOOTH_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_BLUETOOTH_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_BLUETOOTH(uint8_t const *data, size_t const data_len);

uint16_t crc16_PROFIBUS_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_PROFIBUS_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_PROFIBUS_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_PROFIBUS(uint8_t const *data, size_t const data_len);

uint16_t crc13_BBC_start(uint8_t const *data, size_t const data_len);
uint16_t crc13_BBC_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc13_BBC_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc13_BBC(uint8_t const *data, size_t const data_len);

uint8_t crc7_ROHC_start(uint8_t const *data, size_t const data_len);
uint8_t crc7_ROHC_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc7_ROHC_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc7_ROHC(uint8_t const *data, size_t const data_len);

uint32_t crc24_INTERLAKEN_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_INTERLAKEN_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_INTERLAKEN_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_INTERLAKEN(uint8_t const *data, size_t const data_len);

uint8_t crc8_GSM_A_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_GSM_A_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_GSM_A_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_GSM_A(uint8_t const *data, size_t const data_len);

uint32_t crc32_AUTOSAR_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_AUTOSAR_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_AUTOSAR_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_AUTOSAR(uint8_t const *data, size_t const data_len);

uint16_t crc16_T10_DIF_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_T10_DIF_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_T10_DIF_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_T10_DIF(uint8_t const *data, size_t const data_len);

uint8_t crc8_DVB_S2_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_DVB_S2_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_DVB_S2_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_DVB_S2(uint8_t const *data, size_t const data_len);

uint16_t crc16_OPENSAFETY_A_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_OPENSAFETY_A_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_OPENSAFETY_A_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_OPENSAFETY_A(uint8_t const *data, size_t const data_len);

uint16_t crc16_DNP_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_DNP_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_DNP_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_DNP(uint8_t const *data, size_t const data_len);

uint32_t crc24_OS_9_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_OS_9_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_OS_9_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_OS_9(uint8_t const *data, size_t const data_len);

uint16_t crc10_CDMA2000_start(uint8_t const *data, size_t const data_len);
uint16_t crc10_CDMA2000_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc10_CDMA2000_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc10_CDMA2000(uint8_t const *data, size_t const data_len);

uint16_t crc16_GSM_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_GSM_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_GSM_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_GSM(uint8_t const *data, size_t const data_len);

uint8_t crc8_ROHC_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_ROHC_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_ROHC_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_ROHC(uint8_t const *data, size_t const data_len);

uint8_t crc8_I_432_1_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_I_432_1_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_I_432_1_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_I_432_1(uint8_t const *data, size_t const data_len);

uint16_t crc14_GSM_start(uint8_t const *data, size_t const data_len);
uint16_t crc14_GSM_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc14_GSM_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc14_GSM(uint8_t const *data, size_t const data_len);

uint16_t crc16_LJ1200_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_LJ1200_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_LJ1200_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_LJ1200(uint8_t const *data, size_t const data_len);

uint32_t crc32_BZIP2_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_BZIP2_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_BZIP2_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_BZIP2(uint8_t const *data, size_t const data_len);

uint16_t crc16_CDMA2000_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_CDMA2000_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_CDMA2000_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_CDMA2000(uint8_t const *data, size_t const data_len);

uint32_t crc32_CKSUM_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_CKSUM_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_CKSUM_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_CKSUM(uint8_t const *data, size_t const data_len);

uint8_t crc8_LTE_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_LTE_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_LTE_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_LTE(uint8_t const *data, size_t const data_len);

uint16_t crc16_ARC_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_ARC_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_ARC_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_ARC(uint8_t const *data, size_t const data_len);

uint8_t crc8_OPENSAFETY_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_OPENSAFETY_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_OPENSAFETY_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_OPENSAFETY(uint8_t const *data, size_t const data_len);

uint8_t crc3_GSM_start(uint8_t const *data, size_t const data_len);
uint8_t crc3_GSM_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc3_GSM_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc3_GSM(uint8_t const *data, size_t const data_len);

uint16_t crc16_NRSC_5_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_NRSC_5_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_NRSC_5_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_NRSC_5(uint8_t const *data, size_t const data_len);

uint16_t crc16_KERMIT_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_KERMIT_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_KERMIT_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_KERMIT(uint8_t const *data, size_t const data_len);

uint16_t crc15_CAN_start(uint8_t const *data, size_t const data_len);
uint16_t crc15_CAN_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc15_CAN_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc15_CAN(uint8_t const *data, size_t const data_len);

uint16_t crc16_XMODEM_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_XMODEM_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_XMODEM_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_XMODEM(uint8_t const *data, size_t const data_len);

uint32_t crc21_CAN_FD_start(uint8_t const *data, size_t const data_len);
uint32_t crc21_CAN_FD_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc21_CAN_FD_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc21_CAN_FD(uint8_t const *data, size_t const data_len);

uint16_t crc10_GSM_start(uint8_t const *data, size_t const data_len);
uint16_t crc10_GSM_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc10_GSM_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc10_GSM(uint8_t const *data, size_t const data_len);

uint32_t crc32_AIXM_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_AIXM_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_AIXM_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_AIXM(uint8_t const *data, size_t const data_len);

uint8_t crc8_CDMA2000_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_CDMA2000_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_CDMA2000_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_CDMA2000(uint8_t const *data, size_t const data_len);

uint8_t crc6_DARC_start(uint8_t const *data, size_t const data_len);
uint8_t crc6_DARC_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_DARC_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_DARC(uint8_t const *data, size_t const data_len);

uint64_t crc64_ECMA_182_start(uint8_t const *data, size_t const data_len);
uint64_t crc64_ECMA_182_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_ECMA_182_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_ECMA_182(uint8_t const *data, size_t const data_len);

uint16_t crc16_CMS_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_CMS_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_CMS_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_CMS(uint8_t const *data, size_t const data_len);

uint16_t crc16_DECT_R_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_DECT_R_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_DECT_R_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_DECT_R(uint8_t const *data, size_t const data_len);

uint16_t crc16_USB_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_USB_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_USB_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_USB(uint8_t const *data, size_t const data_len);

uint32_t crc32_XFER_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_XFER_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_XFER_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_XFER(uint8_t const *data, size_t const data_len);

uint64_t crc40_GSM_start(uint8_t const *data, size_t const data_len);
uint64_t crc40_GSM_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc40_GSM_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc40_GSM(uint8_t const *data, size_t const data_len);

uint32_t crc30_CDMA_start(uint8_t const *data, size_t const data_len);
uint32_t crc30_CDMA_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc30_CDMA_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc30_CDMA(uint8_t const *data, size_t const data_len);

uint8_t crc6_GSM_start(uint8_t const *data, size_t const data_len);
uint8_t crc6_GSM_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_GSM_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_GSM(uint8_t const *data, size_t const data_len);

uint8_t crc5_G_704_start(uint8_t const *data, size_t const data_len);
uint8_t crc5_G_704_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc5_G_704_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc5_G_704(uint8_t const *data, size_t const data_len);

uint32_t crc32_MPEG_2_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_MPEG_2_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_MPEG_2_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_MPEG_2(uint8_t const *data, size_t const data_len);

uint16_t crc11_FLEXRAY_start(uint8_t const *data, size_t const data_len);
uint16_t crc11_FLEXRAY_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc11_FLEXRAY_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc11_FLEXRAY(uint8_t const *data, size_t const data_len);

uint16_t crc12_UMTS_start(uint8_t const *data, size_t const data_len);
uint16_t crc12_UMTS_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc12_UMTS_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc12_UMTS(uint8_t const *data, size_t const data_len);

uint64_t crc64_XZ_start(uint8_t const *data, size_t const data_len);
uint64_t crc64_XZ_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_XZ_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_XZ(uint8_t const *data, size_t const data_len);

uint8_t crc8_MIFARE_MAD_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_MIFARE_MAD_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_MIFARE_MAD_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_MIFARE_MAD(uint8_t const *data, size_t const data_len);

uint16_t crc12_GSM_start(uint8_t const *data, size_t const data_len);
uint16_t crc12_GSM_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc12_GSM_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc12_GSM(uint8_t const *data, size_t const data_len);

uint8_t crc6_CDMA2000_B_start(uint8_t const *data, size_t const data_len);
uint8_t crc6_CDMA2000_B_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_CDMA2000_B_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_CDMA2000_B(uint8_t const *data, size_t const data_len);

uint8_t crc7_MMC_start(uint8_t const *data, size_t const data_len);
uint8_t crc7_MMC_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc7_MMC_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc7_MMC(uint8_t const *data, size_t const data_len);

uint32_t crc32_ISO_HDLC_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_ISO_HDLC_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_ISO_HDLC_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_ISO_HDLC(uint8_t const *data, size_t const data_len);

uint8_t crc8_SMBUS_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_SMBUS_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_SMBUS_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_SMBUS(uint8_t const *data, size_t const data_len);

uint16_t crc16_MCRF4XX_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_MCRF4XX_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_MCRF4XX_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_MCRF4XX(uint8_t const *data, size_t const data_len);

uint16_t crc16_MODBUS_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_MODBUS_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_MODBUS_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_MODBUS(uint8_t const *data, size_t const data_len);

uint16_t crc16_TMS37157_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_TMS37157_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_TMS37157_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_TMS37157(uint8_t const *data, size_t const data_len);

uint32_t crc24_OPENPGP_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_OPENPGP_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_OPENPGP_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_OPENPGP(uint8_t const *data, size_t const data_len);

uint64_t crc64_REDIS_start(uint8_t const *data, size_t const data_len);
uint64_t crc64_REDIS_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_REDIS_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_REDIS(uint8_t const *data, size_t const data_len);

uint8_t crc8_WCDMA_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_WCDMA_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_WCDMA_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_WCDMA(uint8_t const *data, size_t const data_len);

uint16_t crc16_OPENSAFETY_B_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_OPENSAFETY_B_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_OPENSAFETY_B_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_OPENSAFETY_B(uint8_t const *data, size_t const data_len);

uint8_t crc5_EPC_C1G2_start(uint8_t const *data, size_t const data_len);
uint8_t crc5_EPC_C1G2_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc5_EPC_C1G2_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc5_EPC_C1G2(uint8_t const *data, size_t const data_len);

uint16_t crc11_UMTS_start(uint8_t const *data, size_t const data_len);
uint16_t crc11_UMTS_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc11_UMTS_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc11_UMTS(uint8_t const *data, size_t const data_len);

uint8_t crc8_GSM_B_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_GSM_B_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_GSM_B_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_GSM_B(uint8_t const *data, size_t const data_len);

uint8_t crc6_G_704_start(uint8_t const *data, size_t const data_len);
uint8_t crc6_G_704_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_G_704_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc6_G_704(uint8_t const *data, size_t const data_len);

uint32_t crc24_FLEXRAY_B_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_FLEXRAY_B_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_FLEXRAY_B_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_FLEXRAY_B(uint8_t const *data, size_t const data_len);

uint32_t crc24_LTE_B_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_LTE_B_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_LTE_B_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_LTE_B(uint8_t const *data, size_t const data_len);

uint16_t crc16_ISO_IEC_14443_3_A_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_ISO_IEC_14443_3_A_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_ISO_IEC_14443_3_A_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_ISO_IEC_14443_3_A(uint8_t const *data, size_t const data_len);

uint64_t crc64_GO_ISO_start(uint8_t const *data, size_t const data_len);
uint64_t crc64_GO_ISO_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_GO_ISO_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_GO_ISO(uint8_t const *data, size_t const data_len);

uint16_t crc12_DECT_start(uint8_t const *data, size_t const data_len);
uint16_t crc12_DECT_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc12_DECT_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc12_DECT(uint8_t const *data, size_t const data_len);

uint16_t crc15_MPT1327_start(uint8_t const *data, size_t const data_len);
uint16_t crc15_MPT1327_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc15_MPT1327_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc15_MPT1327(uint8_t const *data, size_t const data_len);

uint16_t crc16_IBM_3740_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_IBM_3740_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_IBM_3740_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_IBM_3740(uint8_t const *data, size_t const data_len);

uint32_t crc32_CD_ROM_EDC_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_CD_ROM_EDC_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_CD_ROM_EDC_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_CD_ROM_EDC(uint8_t const *data, size_t const data_len);

uint16_t crc16_CCITT_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_CCITT_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_CCITT_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_CCITT(uint8_t const *data, size_t const data_len);

uint32_t crc31_PHILIPS_start(uint8_t const *data, size_t const data_len);
uint32_t crc31_PHILIPS_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc31_PHILIPS_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc31_PHILIPS(uint8_t const *data, size_t const data_len);

uint32_t crc17_CAN_FD_start(uint8_t const *data, size_t const data_len);
uint32_t crc17_CAN_FD_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc17_CAN_FD_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc17_CAN_FD(uint8_t const *data, size_t const data_len);

uint8_t crc8_DARC_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_DARC_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_DARC_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_DARC(uint8_t const *data, size_t const data_len);

uint16_t crc16_DECT_X_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_DECT_X_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_DECT_X_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_DECT_X(uint8_t const *data, size_t const data_len);

uint16_t crc16_TELEDISK_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_TELEDISK_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_TELEDISK_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_TELEDISK(uint8_t const *data, size_t const data_len);

uint16_t crc14_DARC_start(uint8_t const *data, size_t const data_len);
uint16_t crc14_DARC_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc14_DARC_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc14_DARC(uint8_t const *data, size_t const data_len);

uint16_t crc10_ATM_start(uint8_t const *data, size_t const data_len);
uint16_t crc10_ATM_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc10_ATM_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc10_ATM(uint8_t const *data, size_t const data_len);

uint64_t crc64_WE_start(uint8_t const *data, size_t const data_len);
uint64_t crc64_WE_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_WE_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_WE(uint8_t const *data, size_t const data_len);

uint8_t crc4_INTERLAKEN_start(uint8_t const *data, size_t const data_len);
uint8_t crc4_INTERLAKEN_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc4_INTERLAKEN_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc4_INTERLAKEN(uint8_t const *data, size_t const data_len);

uint16_t crc16_MAXIM_DOW_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_MAXIM_DOW_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_MAXIM_DOW_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_MAXIM_DOW(uint8_t const *data, size_t const data_len);

uint32_t crc32_BASE91_D_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_BASE91_D_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_BASE91_D_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_BASE91_D(uint8_t const *data, size_t const data_len);

uint8_t crc8_AUTOSAR_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_AUTOSAR_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_AUTOSAR_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_AUTOSAR(uint8_t const *data, size_t const data_len);

uint16_t crc16_SPI_FUJITSU_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_SPI_FUJITSU_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_SPI_FUJITSU_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_SPI_FUJITSU(uint8_t const *data, size_t const data_len);

uint16_t crc16_UMTS_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_UMTS_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_UMTS_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_UMTS(uint8_t const *data, size_t const data_len);

uint32_t crc32_JAMCRC_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_JAMCRC_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_JAMCRC_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_JAMCRC(uint8_t const *data, size_t const data_len);

uint8_t crc8_NRSC_5_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_NRSC_5_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_NRSC_5_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_NRSC_5(uint8_t const *data, size_t const data_len);

uint8_t crc8_I_CODE_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_I_CODE_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_I_CODE_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_I_CODE(uint8_t const *data, size_t const data_len);

uint32_t crc32_MEF_start(uint8_t const *data, size_t const data_len);
uint32_t crc32_MEF_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_MEF_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc32_MEF(uint8_t const *data, size_t const data_len);

uint32_t crc24_FLEXRAY_A_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_FLEXRAY_A_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_FLEXRAY_A_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_FLEXRAY_A(uint8_t const *data, size_t const data_len);

uint32_t crc24_Nguyen_Fx000007_start(uint8_t const *data, size_t const data_len);
uint32_t crc24_Nguyen_Fx000007_continue(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_Nguyen_Fx000007_finish(uint32_t const crc, uint8_t const *data, size_t const data_len);
uint32_t crc24_Nguyen_Fx000007(uint8_t const *data, size_t const data_len);

uint16_t crc16_Nguyen_Fx0007_start(uint8_t const *data, size_t const data_len);
uint16_t crc16_Nguyen_Fx0007_continue(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_Nguyen_Fx0007_finish(uint16_t const crc, uint8_t const *data, size_t const data_len);
uint16_t crc16_Nguyen_Fx0007(uint8_t const *data, size_t const data_len);

uint64_t crc64_Nguyen_Fx000000000000002f_start(uint8_t const *data, size_t const data_len);
uint64_t crc64_Nguyen_Fx000000000000002f_continue(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_Nguyen_Fx000000000000002f_finish(uint64_t const crc, uint8_t const *data, size_t const data_len);
uint64_t crc64_Nguyen_Fx000000000000002f(uint8_t const *data, size_t const data_len);

uint8_t crc8_Nguyen_Fx07_start(uint8_t const *data, size_t const data_len);
uint8_t crc8_Nguyen_Fx07_continue(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_Nguyen_Fx07_finish(uint8_t const crc, uint8_t const *data, size_t const data_len);
uint8_t crc8_Nguyen_Fx07(uint8_t const *data, size_t const data_len);

