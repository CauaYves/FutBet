import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import httpStatus from 'http-status';
import { fakerGame, fakerParticipant } from '../factories';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app)

describe("POST /bets", () => {  
  it("should return status 400 when user doenst give a valid body", async () => {
    const response = await server.post("/bets")
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST)
  })

  it("should return status 201", async () => {
    const participant = await fakerParticipant(5000)
    const game = await fakerGame(3, 0, false)
    const body = {
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
      amountBet: 3000,
      gameId: game.id,
      participantId: participant.id,
    }
    const response = await server.post("/bets").send(body)
    expect(response.statusCode).toBe(httpStatus.CREATED)
  })

  it("should return status 422 when user want bet more than he have on balance", async () => {
    const participant = await fakerParticipant(2000)
    const game = await fakerGame(3, 0, false)
    const body = {
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
      amountBet: 3000,
      gameId: game.id,
      participantId: participant.id,
    }
    const response = await server.post("/bets").send(body)
    expect(response.statusCode).toBe(httpStatus.FORBIDDEN)
  })
})

