export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type Participant = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  balance: number;
};
export type PostParticipant = {
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Game = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number;
  awayTeamScore: number;
  isFinished: boolean;
};

export type PostGame = {
  createdAt: Date;
  updatedAt: Date;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamScore: number;
  awayTeamScore: number;
  isFinished: boolean;
};
export type IdOnParams = {
  id: string;
};

export type Bet = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
  status: string;
  amountWon: number | null;
};

export type PostBet = {
  createdAt: Date;
  updatedAt: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
  status: string;
  amountWon: number | null;
};
