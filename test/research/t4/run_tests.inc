int run_tests()
{
  SHORT_TEST_CRC(8, Koopman);
  SHORT_TEST_CRC(16, Nguyen_Fx011b);
  SHORT_TEST_CRC(24, Nguyen_Fx018301);
  SHORT_TEST_CRC(32, Nguyen_Fx0006c001);

  return 0;
}
