
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

describe("POST /games", async () => {
  it("games test", async () => {
    const response = await server.post("/games")
    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })
})