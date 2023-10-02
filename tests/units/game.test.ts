import { init } from '@/app';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDb();
});

describe("POST /games unitario", async () => {
  it("should games unitario", () => {
    expect(true).toBe(true)
  })
})