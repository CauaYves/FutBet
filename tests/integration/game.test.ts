
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { gamesService } from '@/services';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app)

describe("POST /games", () => {
  it("should return status 201 and created game.", async () => {
    const body = {
      homeTeamName: faker.company.companyName(),
      awayTeamName: faker.company.companyName()
    }
    const response = await server.post("/games").send(body)
    expect(response.statusCode).toBe(httpStatus.CREATED)
  })

  it("should return status 400.", async () => {
    const response = await server.post("/games").send({})
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST)
  })
})