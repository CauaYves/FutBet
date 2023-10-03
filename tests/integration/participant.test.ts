
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { fakerParticipant } from '../factories/participant-factory';
import faker from '@faker-js/faker';
import { number, string } from 'joi';
import httpStatus from 'http-status';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app)

describe("POST /participants", () => {

  it("should return the object from participant", async () => {
    const nameParticipant = faker.name.firstName();
    const balanceParticipant = faker.datatype.number({min: 1000, max: 10000});

    const response = await server.post("/participants").send({
      name: nameParticipant,
      balance: balanceParticipant
    })
    expect(response.body).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      name: nameParticipant,
      balance: balanceParticipant
    })
  })

  it("should return status 201", async () => {
    const nameParticipant = faker.name.firstName();
    const balanceParticipant = faker.datatype.number({min: 1000, max: 10000});

    const response = await server.post("/participants").send({
      name: nameParticipant,
      balance: balanceParticipant
    })
    expect(response.statusCode).toBe(httpStatus.CREATED)
  })

  it("should ", async () => {

  const nameParticipant = faker.name.firstName();
  const balanceParticipant = faker.datatype.number({min: 0, max: 999}); //saldo menor que o proposto na regra de negócio.

  const response = await server.post("/participants").send({
    name: nameParticipant,
    balance: balanceParticipant
  })
  expect(response.statusCode).toBe(httpStatus.BAD_REQUEST)
  })
})