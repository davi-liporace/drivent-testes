import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";
import { number } from "joi";



export async function getHotels(req: AuthenticatedRequest, res: Response){

    const {userId} = req
    try{
        const getHotel = await hotelsService.getHotels(userId)
        return res.status(httpStatus.OK).send(getHotel)
    }
    catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT);
      }
}

export async function getHotelsbyId(req: AuthenticatedRequest, res: Response){
    const {userId} = req
    const {hotelId} = req.query
try{
    const getHotelbyId = await hotelsService.getHotelsById(Number(hotelId), userId)
    return res.status(httpStatus.OK).send(getHotelbyId)
}
catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

}