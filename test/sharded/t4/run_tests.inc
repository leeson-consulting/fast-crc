int run_tests()
{
  SHORT_TEST_CRC(8, Nguyen_Fx07);
  SHORT_TEST_CRC(16, Nguyen_Fx0007);
  SHORT_TEST_CRC(24, Nguyen_Fx000007);
  SHORT_TEST_CRC(64, Nguyen_Fx000000000000002f);

  return 0;
}
