
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { fakerGame } from '../factories';
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

  it("should return status 400 when format of body is incorrect.", async () => {
    const body = {
      homeTeamName: faker.datatype.number(),
      awayTeamName: faker.company.companyName()
    }
    const response = await server.post("/games").send(body)
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST)
  })

  it("should return status 400 when user has no sended a valid body.", async () => {
    const response = await server.post("/games").send({})
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST)
  })
})

describe("GET /games", () => {
  it("should return one game on database", async () => {
    const game = await fakerGame()
    const response = await server.get("/games")
    expect(response.body[0]).toEqual({
      awayTeamName: game.awayTeamName,
      homeTeamName: game.homeTeamName,
      awayTeamScore: game.awayTeamScore,
      homeTeamScore: game.homeTeamScore,
      isFinished: game.isFinished,
      updatedAt: game.updatedAt.toISOString(),
      createdAt: game.createdAt.toISOString(),
      id: game.id
    })
  })
  
  it("should return status 204 when no have any game on database", async () => {
    expect
    try {
      await gamesService.getGames();
      // Se a função acima não lançar uma exceção, o teste deve falhar
      fail('Expected an exception to be thrown');
    } catch (error) {
      expect(error.message).toEqual('No have games posted.');
    }
  })
})

describe("GET /games/:id", () => {
  it("should return one game and status 200", async () => {
    const game = await fakerGame()
    const response = await gamesService.getGameById(game.id)
    expect(response.data).toEqual({...game, bets: []})
  })

  it("should return no content and status 204", async () => {
    const response = await server.get("/games/1")
    expect(response.body).toEqual({})
    expect(response.statusCode).toBe(httpStatus.NO_CONTENT)
  })

  it("should return bad request error", async () => {
    const response = await server.get("/games/dois")
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST)
  })
})