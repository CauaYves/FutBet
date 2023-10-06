import { unauthorizedError } from '@/errors';
import { Bet, PostBet } from '../protocols';
import betsRepository from '@/repositories/bets-repository';
import gamesRepository from '@/repositories/games-repository';
import participantsRepository from '@/repositories/participants-repository';

// Função para criar uma nova aposta
async function createBet(betData: Omit<PostBet, 'createdAt' | 'updatedAt' | 'status' | 'amountWon'>): Promise<Bet> {
  // Verifique se o jogo existe e não está finalizado
  const game = await gamesRepository.retrieveGameById(betData.gameId);

  if (!game || game.isFinished) {
    throw unauthorizedError();
  }

  // Verifique se o participante existe e tem saldo suficiente para a aposta
  const participant = await participantsRepository.retrieveParticipantById(betData.participantId);

  if (!participant || participant.balance < betData.amountBet) {
    throw unauthorizedError();
  }

  const now = new Date();
  
  // Crie a aposta com os dados fornecidos
  const bet = await betsRepository.createBet(
    {
      ...betData,
      createdAt: now,
      updatedAt: now,
      status: 'PENDING',
      amountWon: null,
    },
    participant,
  );

  return bet;
}

export const betsService = {
  createBet,
};