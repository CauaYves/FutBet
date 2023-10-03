import { prisma } from '@/config/database';
import { Participant, PostBet } from '../../protocols';

async function fetchBets() {
  return prisma.bet.findMany();
}

async function createBet(betData: PostBet, participant: Participant) {
  return prisma.$transaction(async (prismaClient) => {
    const newBalance = participant.balance - betData.amountBet;

    await prismaClient.participant.update({
      where: { id: betData.participantId },
      data: {
        balance: newBalance,
        updatedAt: new Date(),
      },
    });

    const createdBet = await prismaClient.bet.create({ data: betData });

    return createdBet;
  });
}

async function modifyBet(id: number, status: string, amountWon: number) {
  return await prisma.bet.update({
    where: {
      id,
    },
    data: {
      status,
      amountWon,
      updatedAt: new Date(),
    },
  });
}

const betsRepository = {
  fetchBets,
  createBet,
  modifyBet,
};

export default betsRepository;
