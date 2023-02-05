import app, { init } from "@/app";
import supertest, { SuperTest } from "supertest";
import { cleanDb } from "../helpers";


beforeAll(async()=> {
    await init();
})

beforeEach(async ()=>{
    await cleanDb();
})

const server = supertest(app)