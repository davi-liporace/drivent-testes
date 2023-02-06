import app, { init } from "@/app";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import supertest from "supertest";
import { createEnrollmentWithAddress, createTicket, createTicketType, createUser } from "../factories";
import { createHotel } from "../factories/hotel-factory";
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
    });
    it("should respond with status 402 if ticket is remote", async () => {
      const user = await createUser()
    const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user)
      const ticket = await createTicketType(true)
await createTicket(enrollment.id, ticket.id, TicketStatus.PAID)

      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });
    it("should respond with status 402 if ticket doesn't include hotel", async () => {
      const user = await createUser()
    const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user)
      const ticket = await createTicketType(true,false)
await createTicket(enrollment.id, ticket.id, TicketStatus.PAID)

      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    });
    it("Should respond with status 404 if there's no enrollment for given user", async ()=>{
      const token = await generateValidToken()
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    })
  it("should respond with status 200 and hotel data if there is any hotel", async ()=>{
    const user = await createUser()
    const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user)
      const ticket = await createTicketType(false, true)
await createTicket(enrollment.id, ticket.id, TicketStatus.PAID)

const hotel = await createHotel()
const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`)
expect(response.status).toBe(httpStatus.OK)
expect(response.body).toEqual({
  id:hotel.id,
  name:hotel.name,
  image: hotel.image,
  createdAt: hotel.createdAt.toISOString(),
  updatedAt: hotel.updatedAt.toISOString(),
})
  })
  })
})

describe("GET /hotels/:hotelId", () => {
  /*  describe("When token is invalid", ()=> { */
   it("should respond with status 401 if no token is given", async () => {
     const response = await server.get("/hotels/1");
 
     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
   })
   it("should respond with status 401 if given token is not valid", async () => {
       const token = faker.lorem.word();
   
       const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
   
       expect(response.status).toBe(httpStatus.UNAUTHORIZED);
     });

   
describe("when token is valid", () => {
   it("should respond with status 402 if ticket wasn't paid", async () => {
     const user = await createUser()
   const token = await generateValidToken(user);
     const enrollment = await createEnrollmentWithAddress(user)
     const ticket = await createTicketType(false, true)
await createTicket(enrollment.id, ticket.id, TicketStatus.RESERVED)

     const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
     expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
   });
   it("should respond with status 402 if ticket is remote", async () => {
     const user = await createUser()
   const token = await generateValidToken(user);
     const enrollment = await createEnrollmentWithAddress(user)
     const ticket = await createTicketType(true)
await createTicket(enrollment.id, ticket.id, TicketStatus.PAID)

     const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
     expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
   });
   it("should respond with status 402 if ticket doesn't include hotel", async () => {
     const user = await createUser()
   const token = await generateValidToken(user);
     const enrollment = await createEnrollmentWithAddress(user)
     const ticket = await createTicketType(true,false)
await createTicket(enrollment.id, ticket.id, TicketStatus.PAID)

     const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);
     expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
   });
   it("Should respond with status 404 if there's no enrollment for given user", async ()=>{
     const token = await generateValidToken()
     const response = await server.get("/hotels/1").set("Authorization", `Bearer ${token}`);

     expect(response.status).toBe(httpStatus.NOT_FOUND);
   })
 it("should respond with status 200 and hotel data if there is any hotel", async ()=>{
   const user = await createUser()
   const token = await generateValidToken(user);
     const enrollment = await createEnrollmentWithAddress(user)
     const ticket = await createTicketType(false, true)
await createTicket(enrollment.id, ticket.id, TicketStatus.PAID)

const hotel = await createHotel()
const response = await server.get(`/hotels/${hotel.id}`).set("Authorization", `Bearer ${token}`)
expect(response.status).toBe(httpStatus.OK)
expect(response.body).toEqual({
 id:hotel.id,
 name:hotel.name,
 image: hotel.image,
 createdAt: hotel.createdAt.toISOString(),
 updatedAt: hotel.updatedAt.toISOString(),
 Rooms:[
  {
    id: hotel.Rooms[0].id,
      name: hotel.Rooms[0].name,
      capacity: hotel.Rooms[0].capacity,
      hotelId: hotel.Rooms[0].hotelId,
      createdAt: hotel.Rooms[0].createdAt.toISOString(),
      updatedAt: hotel.Rooms[0].updatedAt.toISOString(),
  }
 ]
})
 })
 })
})


/* jest.setTimeout(50000) */
 