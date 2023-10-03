
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { participantsService } from '@/services';
import { fakerParticipant } from '../factories/participant-factory';
import { invalidDataError } from '@/errors';
import participantsRepository from '@/repositories/participants-repository';

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
  
  // Mock da participantsRepository para simular o cenário onde createParticipant lança uma exceção
  jest.mock('../../src/repositories/participants-repository', () => ({
    createParticipant: jest.fn(() => {
      throw invalidDataError(["error on participant creation"]);
    }),
  }));

  it("should return status 500.", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(participantsRepository, "createParticipant").mockImplementation(() => {
      return undefined
    })
    const nameParticipant = faker.name.firstName();
    const balanceParticipant = faker.datatype.number({min: 1000, max: 10000});
    const response = await server.post("/participants").send({
      name: nameParticipant,
      balance: balanceParticipant
    })
    expect(response.statusCode).toBe(500)
  });
})

describe("GET /participants", () => {
  it("should return all participants and their balances", async () => {
    const participantFake = await fakerParticipant()
    const response = await participantsService.getParticipants()
    expect(response.data).toEqual([
      participantFake
    ])
  })

  it("should return all participants and their balances", async () => {
    const response = await server.get("/participants")
    expect(response.statusCode).toBe(204)
    expect(response.body).toEqual({})
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
