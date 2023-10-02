
import app, { init } from '@/app';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { fakerParticipant } from '../factories/participant-factory';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app)

describe("POST /participants", () => {

  it("should", async() => {
    const participant = fakerParticipant()
    console.log(participant)
    const body = {
      
    }
    const response = await server.post("/participants").send(body)
    console.log(response)
    expect(true).toBe(true)
  })

})