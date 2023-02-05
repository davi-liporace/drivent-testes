import { prisma } from "@/config";


async function findHotel(){
    return prisma.hotel.findMany()
}

async function findHotelById(hotelId:number){
    return prisma.hotel.findFirst({
        where: { id:hotelId,},
        include:{
            Rooms: true,
        }
    })
}

async function getTicketByUser(userId: number){
    return prisma.ticket.findFirst({
        where:{ Enrollment:{userId}},
        include:{
            Enrollment:true,TicketType:true
        }
    })
}


const hotelRepository = {
    findHotel,findHotelById,getTicketByUser
}

export default hotelRepository