
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app)

describe("POST /games", () => {
  it("games test", async () => {
    const response = await server.post("/games")
    console.log(response)
    expect(true).toBe(true)
  })
})