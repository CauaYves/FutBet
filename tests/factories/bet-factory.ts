import { prisma } from "@/config/database"
import { Game } from "../../protocols"


export async function fakerBet(participantId: number, game: Game, amountBet: number, status: string = "PENDING") {
  const bet = {
    homeTeamScore: game.homeTeamScore,
    awayTeamScore: game.awayTeamScore,
    amountBet,
    gameId: game.id,
    participantId: participantId,
    status
  }
  return prisma.bet.create({
    data: bet
  })
}