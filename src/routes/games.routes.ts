import { Router } from 'express';
import { validateBody, validateParams } from '@/middlewares';
import { createGame, getGames, getGameById, finishGame } from '@/controllers';
import { gameWithIdOnParams, gamesSchema } from '@/schemas/games-schemas';

const gamesRouter = Router();

gamesRouter
  .get('/', getGames)
  .get('/:id', validateParams(gameWithIdOnParams), getGameById)
  .post('/', validateBody(gamesSchema), createGame)
  .post('/:id/finish', validateParams(gameWithIdOnParams), validateBody(gamesSchema), finishGame);

export { gamesRouter };