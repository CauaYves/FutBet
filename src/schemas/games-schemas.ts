import Joi from 'joi';

export const gameWithIdOnParams = Joi.object({
  id: Joi.string().regex(/^\d+$/).required(),
});

export const gamesSchema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const finishGameSchema = Joi.object({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
})