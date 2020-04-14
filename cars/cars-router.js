const express = require("express");

const db = require("../data/connection.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving data" });
    });
});

router.get("/:id", (req,res)=>{
    db('cars')
    .where({id: req.params.id})
    .first()
    .then(cars=>{
        if(cars){
            res.status(200).json(cars)
        }else{
            res.status(400).json({message:"car not found"})
        }
    })
    .catch(
        error=>{
            res.status(500).json({message:"Error finding the car with id"})
        }
    )
})

router.post(
  "/",
  (req,
  res) => {
    const data = req.body;
    db("cars")
      .insert(data)
      .then((carid) => {
        db("cars")
          .where({ id: carid[0] })
          .then((newentry) => {
            res.status(201).json(newentry);
          });
      })
      .catch((err) => {
        res.status(500).json({ message: "cannot post data" });
      });
  })
;

router.delete("/:id", (req,res)=>{
    const {id}=req.params;
    db("cars")
    .where({id})
    .del({id})
    .then(deleted=>{
        res.status(200).json(deleted)
    })
    .catch(error=>{
        res.status(500).json({message:"Cannot delete the specific car"})
    })
})

router.put("/:id", (req,res)=>{
    const {id}=req.params;
    const changes=req.body;
    db("cars")
    .where({id})
    .update(changes)
    .then(car=>{
        if(car){
            res.json(car)
        }else{
            res.status(200).json(car)
        }
    })
    .catch(error=>{
        res.status(500).json({message: "cannot update the specific car"})
    })
})

module.exports = router;
