
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import { fakerBet, fakerGame, fakerParticipant } from '../factories';
import { gamesService } from '@/services';
import { prisma } from '@/config/database';

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

  it("should an empty array when no have games on database", async () => {
    const response = await server.get("/games")
    expect(response.body).toEqual({})
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

describe("POST /games/:id/finish", () => {
  it("should return status 404 when game doesn't exist", async () => {
    const body = {
      homeTeamScore: 1,
      awayTeamScore: 2
    }
    const response = await server.post("/games/99/finish").send(body)
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND)
  })

  it("should update the status finished from false to true", async () => {
    const game = await fakerGame(3, 0, false)
    const body = {
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore
    }
    await server.post(`/games/${game.id}/finish`).send(body)
    const statusGame = await prisma.game.findUnique({
      where: {id: game.id}
    })
    expect(statusGame.isFinished).toBe(true)
  })

  it("should return status 200", async () => {
    const game = await fakerGame(3, 0, false)
    const body = {
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore
    }
    const response = await server.post(`/games/${game.id}/finish`).send(body)
    expect(response.statusCode).toBe(httpStatus.CREATED)
  })
  //PRECISA CRIAR O TESTE COM APOSTAS, MAS NÃO CRIEI FACTORY DE APOSTAS AINDA.
  it("should return statusSADOADPUIOASHNDO", async () => {
    const game = await fakerGame(3, 0, false)
    const participant = await fakerParticipant(6000)
    await fakerBet(participant.id, game, 3000)
    const body = {
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore
    }
    const response = await server.post(`/games/${game.id}/finish`).send(body)
    expect(response.statusCode).toBe(httpStatus.CREATED)
  })
})