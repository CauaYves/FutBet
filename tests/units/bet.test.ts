
import { init } from '@/app';
// import supertest from 'supertest';
import { cleanDb } from '../helpers';
// import httpStatus from 'http-status';
// import { betsService } from '@/services';
beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

describe("POST /bets unitario", async () => {
  it("should bet unitario", () => {
    expect(true).toBe(true)
  })
})