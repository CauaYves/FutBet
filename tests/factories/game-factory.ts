import { prisma } from "@/config/database";
import faker from "@faker-js/faker";

export async function fakerGame(homeScore?: number, awayScore?: number, finished?: boolean) {
  const homeTeamName = faker.name.jobDescriptor()
  const awayTeamName = faker.name.jobDescriptor()
  const homeTeamScore = homeScore || faker.datatype.number({min: 0, max: 3})
  const awayTeamScore = awayScore || faker.datatype.number({min: 0, max: 9})
  const isFinished = finished || false
  
  return prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName,
      homeTeamScore,
      awayTeamScore,
      isFinished,
    }
  })
  
}