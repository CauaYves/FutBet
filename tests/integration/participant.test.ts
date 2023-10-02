
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import httpStatus from 'http-status';
import { fakerParticipant } from '../factories/participant-factory';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app)

describe("POST /participants", async () => {

  it("should", async() => {
    const participant = fakerParticipant()
    console.log(participant)
    const body = {
      
    }
    const response = await server.post("/participants").send(body)
    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
  })

})