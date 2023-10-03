import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import httpStatus from 'http-status';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app)

describe("POST /bets", () => {  
  it("bets test", async () => {
    const response = await server.post("/bets")
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST)
  })
})