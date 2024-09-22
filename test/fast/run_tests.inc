int run_tests()
{
  SHORT_TEST_CRC(8, Fast4);
  SHORT_TEST_CRC(16, Fast4);
  SHORT_TEST_CRC(24, Fast4);

  SHORT_TEST_CRC(16, Fast6);
  SHORT_TEST_CRC(24, Fast6);
  SHORT_TEST_CRC(31, Fast6);
  SHORT_TEST_CRC(32, Fast6);
  SHORT_TEST_CRC(64, Fast6);

  // Each pair of CUSTOM_TEST_CRC calls must pass when supplied with the same expected_crc.
  // The supplied crc value was obtained manually from the table-based algorithm, which is assumed to be correct.

  CUSTOM_TEST_CRC(31, Fast6,          /* expected_crc = */ 0x7defb882);
  CUSTOM_TEST_CRC(31, Nguyen_Fxc3001, /* expected_crc = */ 0x7defb882);

  return 0;
}
