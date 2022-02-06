import express from "express";
import {getTheatres,insertTheatreData,getTheatreById,getmoviesByTheatre} from "./hlpr.js"
import { client } from "../index.js";

export const Adminmovies = express.Router()

Adminmovies.get("/theatres",async (req,res)=>{
    const response = await getTheatres()
    res.send(response)
})

Adminmovies.post("/theatres",async (req,res)=>{
    const {name,location,screens,owner,price} = req.body
    const response = await insertTheatreData(name,location,screens,owner,price)
    res.send(response)
})

Adminmovies.get("/theatres/:id",async (req,res)=>{
    const {id} = req.params
    const response = await getTheatreById(id)
    res.send(response)
})


Adminmovies.get("/movies/:id",async (req,res)=>{
    const {id}= req.params
    console.log(id)
    const response = await getmoviesByTheatre(id)
    res.send(response)
})
// Adminmovies.post("/theatres",async (req,res)=>{
//     const response = await client.db("bookmyshow").collection("theatres").insertMany(req.body)
//     console.log(response)
// })