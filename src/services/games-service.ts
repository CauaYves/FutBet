import httpStatus from 'http-status';
import gamesRepository from '@/repositories/games-repository';
import participantsRepository from '@/repositories/participants-repository';
import betsRepository from '@/repositories/bets-repository';
import { Bet, Game, PostGame } from '../../protocols';
import { noContentError, notFoundError } from '@/errors';
import roundDown from '@/utils/roundDown';

// Interface para a resposta da API de jogos
interface ApiResponse<Game> {
  status: number;
  data: Game[] | Game | null;
}

// Função para obter todos os jogos
async function getGames(): Promise<ApiResponse<Game>> {
  const games = await gamesRepository.fetchGames();
  if (!games || !games.length) {
    throw noContentError("No have games posted.")
  }
  return {
    status: httpStatus.OK,
    data: games,
  };
}

// Função para criar um novo jogo
async function createGame(
  gameData: Omit<PostGame, 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>,
): Promise<Game> {
  const now = new Date();
  const game = await gamesRepository.createGame({
    ...gameData,
    createdAt: now,
    updatedAt: now,
    homeTeamScore: 0,
    awayTeamScore: 0,
    isFinished: false,
  });

  return game;
}

// Função para obter um jogo por ID
async function getGameById(id: number): Promise<ApiResponse<Game>> {
  const game = await gamesRepository.retrieveGameById(id);
  if (!game) {
    // Retorna o status 404 (Not Found) quando nenhum jogo é encontrado
    throw notFoundError();
  }
  return {
    status: httpStatus.OK,
    data: game,
  };
}

// Função para finalizar um jogo e calcular os ganhos
async function finishGame(gameId: number, score: { homeTeamScore: number; awayTeamScore: number }): Promise<Game> {
  // Encontrando o jogo existente
  const existingGame = await gamesRepository.retrieveGameById(gameId);

  if (!existingGame || existingGame.isFinished) {
    // Jogo não encontrado ou já finalizado
    throw new Error('Jogo não encontrado ou já finalizado.');
  }

  // Atualiza o status do jogo
  const updatedGame = await gamesRepository.finishGame(gameId, score.homeTeamScore, score.awayTeamScore);

  // Calcula o montante total ganho
  const totalWinningAmount = existingGame.bets.reduce((total: number, bet: Bet) => total + bet.amountBet, 0);
  const houseEdge = 0.3;
  const totalAmountWon = totalWinningAmount * (1 - houseEdge);

  // Atualiza todas as apostas
  for (const bet of existingGame.bets) {
    const participant = await participantsRepository.retrieveParticipantById(bet.participantId);

    if (bet.status === 'PENDING') {
      if (bet.homeTeamScore === score.homeTeamScore && bet.awayTeamScore === score.awayTeamScore) {
        // Aposta vencedora
        const betAmount = bet.amountBet;
        const betWinningAmount = roundDown((betAmount / totalWinningAmount) * totalAmountWon);
        await betsRepository.modifyBet(bet.id, 'WON', betWinningAmount);

        // Atualiza o saldo do participante
        if (participant) {
          const newBalance = participant.balance + betWinningAmount;
          await participantsRepository.modifyParticipant(participant.id, newBalance);
        } else {
          // Aposta perdida
          await betsRepository.modifyBet(bet.id, 'LOST', 0);
        }
      }
    }
  }

  return updatedGame;
}

export const gamesService = {
  getGames,
  createGame,
  getGameById,
  finishGame,
};
