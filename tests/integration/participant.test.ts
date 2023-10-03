
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { participantsService } from '@/services';
import { fakerParticipant } from '../factories/participant-factory';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app)

describe("POST /participants", () => {

  it("should return the object from participant.", async () => {
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

  it("should return status 201.", async () => {
    const nameParticipant = faker.name.firstName();
    const balanceParticipant = faker.datatype.number({min: 1000, max: 10000});

    const response = await server.post("/participants").send({
      name: nameParticipant,
      balance: balanceParticipant
    })
    expect(response.statusCode).toBe(httpStatus.CREATED)
  })

  it("should return status 400 when user no have the minimum balance.", async () => {

  const nameParticipant = faker.name.firstName();
  const balanceParticipant = faker.datatype.number({min: 0, max: 999}); //saldo menor que o proposto na regra de negócio.

  const response = await server.post("/participants").send({
    name: nameParticipant,
    balance: balanceParticipant
  })
  expect(response.statusCode).toBe(httpStatus.BAD_REQUEST)
  })
})

describe("GET /participants", () => {
  it("should return all participants and their balances", async () => {
    const participantFake = await fakerParticipant()
    const response = await participantsService.getParticipants()
    expect(response.data).toEqual([
      participantFake
    ])
  })

  it("should return NULL when no have participants on database", async () => {
    try {
      await participantsService.getParticipants();
      // Se a função acima não lançar uma exceção, o teste deve falhar
      fail('Expected an exception to be thrown');
    } catch (error) {
      expect(error.message).toEqual('No have participants');
    }
  });
})
