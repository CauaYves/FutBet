import { prisma } from "@/config/database";
import faker from '@faker-js/faker';

export async function fakerParticipant(balanceParam?: number) {
  const name = faker.name.firstName("male")
  const balance = balanceParam || Number(faker.finance.account(5)) 

  return prisma.participant.create({
    data: {
      name,
      balance
    }
  })
}
  // status: string;
  // amountWon: number | null;