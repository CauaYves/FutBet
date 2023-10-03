import { Router } from 'express';
import { validateBody, validateParams } from '@/middlewares';
import { createGame, getGames, getGameById, finishGame } from '@/controllers';
import { finishGameSchema, gameWithIdOnParams, gamesSchema } from '@/schemas';

const gamesRouter = Router();

gamesRouter
  .get('/', getGames)
  .get('/:id', validateParams(gameWithIdOnParams), getGameById)
  .post('/', validateBody(gamesSchema), createGame)
  .post('/:id/finish', validateParams(gameWithIdOnParams), validateBody(finishGameSchema), finishGame);

export { gamesRouter };