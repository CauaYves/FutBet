import { prisma } from '@/config/database';
import { PostGame } from '../../protocols';

async function fetchGames() {
  return prisma.game.findMany();
}

async function createGame(gameData: PostGame) {
  return prisma.game.create({ data: gameData });
}

async function retrieveGameById(id: number) {
  return prisma.game.findUnique({
    where: {
      id,
    },
    include: {
      bets: true,
    },
  });
}

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
  return prisma.game.update({
    where: {
      id,
    },
    data: {
      homeTeamScore,
      awayTeamScore,
      isFinished: true,
      updatedAt: new Date(),
    },
  });
}

const gamesRepository = {
  fetchGames,
  createGame,
  retrieveGameById,
  finishGame,
};

export default gamesRepository;
