import httpStatus from 'http-status';
import participantsRepository from '@/repositories/participants-repository';
import { Participant, PostParticipant } from '../../protocols';

// Interface para a resposta da API de participantes
interface ApiResponse<Participant> {
  status: number;
  data: Participant[] | null;
}

// Função para obter todos os participantes
async function getParticipants(): Promise<ApiResponse<Participant>> {
  const participants = await participantsRepository.fetchParticipants();
  if (!participants || !participants.length) {
    // Retorna o status 204 (NO_CONTENT) quando nenhum participante é encontrado
    return {
      status: httpStatus.NO_CONTENT,
      data: null,
    };
  }
  return {
    status: httpStatus.OK,
    data: participants,
  };
}

// Função para criar um novo participante
async function createParticipant(
  participantData: Omit<PostParticipant, 'createdAt' | 'updatedAt'>,
): Promise<Participant> {
  const now = new Date();
  const participant = await participantsRepository.createParticipant({
    ...participantData,
    createdAt: now,
    updatedAt: now,
  });

  return participant;
}

export const participantsService = {
  getParticipants,
  createParticipant,
};
