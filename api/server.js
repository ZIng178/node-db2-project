const express= require('express')
const helmet =require('helmet')
const router=require('../cars/cars-router')

const server=express()

server.use(express.json())
server.use(helmet())
server.use("/", router)

module.exports=server