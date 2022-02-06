import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors"
import dotenv from "dotenv"
import {AllmoviesRoute} from "./Routes/usermovies.js"
import {Adminmovies} from "./Routes/adminmovies.js"

dotenv.config()


const Mongodb = process.env.Mongodb
async function createConnection(){
    const client = new MongoClient(Mongodb)
    await client.connect()
    console.log("Db Connected")
    return client
}


export const client = await createConnection()
const app = express()

app.use(cors())
app.use(express.json({limit:"50mb"}))
app.use("/movies",AllmoviesRoute)
app.use("/admin",Adminmovies)

app.listen(process.env.PORT)