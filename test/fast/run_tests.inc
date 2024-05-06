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

  return 0;
}
