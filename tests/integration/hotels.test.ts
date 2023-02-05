import app, { init } from "@/app";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import supertest, { SuperTest } from "supertest";
import { createEnrollmentWithAddress, createTicket, createTicketType, createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";


beforeAll(async()=> {
    await init();
})

beforeEach(async ()=>{
    await cleanDb();
})

const server = supertest(app)

describe("GET /hotels", () => {
   /*  describe("When token is invalid", ()=> { */
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.get("/hotels");
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    })
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
    
        const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });

    
describe("when token is valid", () => {
    it("should respond with status 402 if ticket wasn't paid", async () => {
      const user = await createUser()
    const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user)
      const ticket = await createTicketType(false, true)
await createTicket(enrollment.id, ticket.id, TicketStatus.RESERVED)

      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });})
})

/* jest.setTimeout(50000) */
 