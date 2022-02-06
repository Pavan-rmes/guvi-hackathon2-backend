import { client } from "../index.js"
import {ObjectId} from "mongodb"

async function allMovies(){
    const data = await client.db("bookmyshow").collection("movies").find({}).toArray()
    return data
}

async function getMovie(id){
    const data = await client.db("bookmyshow").collection("movies").findOne({"_id":ObjectId(id)})
    return data
}

async function updateSeat(movie,theatrename,movieId,rowid,showTime,seatingid){

    const notselectedTheatre = movie.theater.filter((th)=>th.name !== theatrename)
    const selectedTheatre = movie.theater.filter((th)=>th.name === theatrename)
    const notSelectedTime = selectedTheatre[0].timings.filter((time)=>time.time !== showTime)
    const selectedTime = selectedTheatre[0].timings.filter((time)=>time.time === showTime)
    const notSelctedRows = selectedTime[0].seating.filter((id,index)=> index !== rowid)
    const selectedRows = selectedTime[0].seating.filter((id,index)=> index === rowid)
    const notselctedSeats = selectedRows[0].seats.filter((id,index)=> index !== seatingid)
    const selectedSeat = selectedRows[0].seats.filter((id,index)=> index === seatingid)
    selectedSeat[0].status = true
    selectedSeat[0].blocked = true

    const updatedSeatData = [...notselectedTheatre,{name:theatrename,timings:[...notSelectedTime,{time:showTime,seating:[...notSelctedRows,{row:selectedRows[0].row,seats:[...notselctedSeats,selectedSeat[0]]}]}]}]
    // console.log(updatedSeatData)
    return updatedSeatData
}


async function getmoviesByTheatre(id){

    const theatre = await client.db("bookmyshow").collection("theatres").findOne({"_id":ObjectId(id)})
    const moviedata = await client.db("bookmyshow").collection("movies").find({}).toArray()
    console.log(theatre.theatrename)
    let filterData = []
    console.log(moviedata.length)
    for (let i=0;i<moviedata.length;i++){
        moviedata[i].theater.map((th)=>{
            console.log(th)
           if(th.name === theatre.theatrename){
               console.log("hello")
               filterData.push(moviedata[i])
           }
       })
    }
    return filterData
}

async function getTheatres(){
    const data = await client.db("bookmyshow").collection("theatres").find({}).toArray()
    return data
}

async function getTheatreById(id){
    const data = await client.db("bookmyshow").collection("theatres").findOne({"_id":ObjectId(id)})
    return data
}

async function insertTheatreData(name,location,screens,owner,price){
    const data = {theatrename:name,location:location,noofscreens:screens,theatreowner:owner,pricing:price}
    const res = await client.db("bookmyshow").collection("theatres").insertOne(data)
}


export {allMovies,getMovie,updateSeat,getmoviesByTheatre,getTheatres,insertTheatreData,getTheatreById}