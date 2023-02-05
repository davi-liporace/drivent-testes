import { Hotel } from "@prisma/client";
import { prisma } from "@/config"; 
import faker from "@faker-js/faker";
import dayjs from "dayjs";

export function createHotel(params: Partial<Hotel> = {}): Promise<Hotel>{
return prisma.hotel.create({
    data:{
        name: params.name || faker.lorem.word(),
        image: params.image || faker.image.imageUrl(),
        createdAt: params.createdAt || dayjs().subtract(1,"day").toDate(),
        updatedAt: params.updatedAt || dayjs().add(5,"days").toDate(),
    }
})
}