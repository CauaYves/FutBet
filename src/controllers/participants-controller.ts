import { Request, Response } from 'express';

export async function createParticipant(req: Request, res: Response) {
  try {
    console.log(req.body);
    return res.sendStatus(200);
  } catch (error) {
    return "controller error";
  }
}
