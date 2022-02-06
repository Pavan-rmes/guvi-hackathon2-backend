import express from "express";
import { ObjectId } from "mongodb";
import { client } from "../index.js";
import { allMovies,getMovie,updateSeat } from "./hlpr.js";

export const AllmoviesRoute = express.Router()

AllmoviesRoute.get("/",async (req,res)=>{
    const movies = await allMovies()
    res.send(movies)
})

AllmoviesRoute.get("/:id",async (req,res)=>{
    const {id} = req.params
    const response = await getMovie(id)
    res.send(response)
})

AllmoviesRoute.post("/",async (req,res)=>{
    const data = req.body
    const response = await client.db("bookmyshow").collection("movies").insertMany(data)
    res.send(response)
})

AllmoviesRoute.put("/:id",async (req,res)=>{
    const {id} = req.params
    const {theatrename,movieId,rowid,showTime,seatingid} = req.body
    const movie = await getMovie(req.body.movieId)
    const updatedSeatData = await updateSeat(movie,theatrename,movieId,rowid,showTime,seatingid)
    const response = await client.db("bookmyshow").collection("movies").updateOne({"_id":ObjectId(id)},{$set:{theater:updatedSeatData}})
    
    res.send("hello")
})