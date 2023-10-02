import { prisma } from "@/config/database";
import faker from '@faker-js/faker';

export async function fakerParticipant() {
  const name = faker.name.firstName("male")
  const balance = Number(faker.finance.account(4))
  return prisma.participant.create({
    data: {
      name,
      balance
    }
  })
}