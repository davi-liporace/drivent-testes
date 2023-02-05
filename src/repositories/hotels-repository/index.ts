import { prisma } from "@/config";


async function findHotel(){
    return prisma.hotel.findMany()
}

export async function findHotelById(hotelId:number){
    return prisma.hotel.findFirst({
        where: { id:hotelId,},
        include:{
            Rooms: true,
        }
    })
}


const hotelRepository = {
    findHotel,findHotelById,
}

export default hotelRepository