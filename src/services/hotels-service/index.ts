import { notFoundError } from "@/errors";
import { paymentRequired } from "@/errors/payment-required";
import hotelRepository from "@/repositories/hotels-repository";
import httpStatus from "http-status";
import ticketService from "../tickets-service";




async function getHotels(userId:number){

    const ticket = await hotelRepository.getTicketByUser(userId)
        if(!ticket){
            throw notFoundError()
        }
        if(ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
            throw paymentRequired()
        }
    const hotelGet = await hotelRepository.findHotel()
    if (!hotelGet){
        throw notFoundError()
    }
    return hotelGet
}

async function getHotelsById(hotelId:number, userId:number){
    const ticket = await ticketService.getTicketByUserId(userId)
    if(!ticket){
        throw notFoundError()
    }
    if(ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
        throw paymentRequired()
    }

    const hotelGetById = await hotelRepository.findHotelById(hotelId)
    if(!hotelGetById){
        throw notFoundError()
    }
    return hotelGetById
}

const hotelsService = {
    getHotels,getHotelsById
}
export default hotelsService