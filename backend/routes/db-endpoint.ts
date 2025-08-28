// const express = require('express');
import express from 'express';
// const connectDB = require("../db/connection.js");
import { connectDB } from "../db/connection.ts";

const router = express.Router();

router.post("/load-schedule-db", async (req, res) => {
  try {
    const client = await connectDB();
    const db = client.db('course-eater')
    const collection = db.collection('schedules')

    const query = { passcode: req.body["passcode"] }
    const data = await collection.findOne(query)

    res.status(200).json({ data: data })
  } catch (err) {
    console.error(`Error: something went wrong while fetching data. ${err}`)
    res.status(404).send(`Error: something went wrong while fetching data. ${err}`)
  }

});


router.put("/save-schedule-db", async (req, res) => {
  try {
    const client = await connectDB();
    const db = client.db('course-eater')
    const collection = db.collection('schedules')

    const filter = { passcode: req.body["passcode"] }
    const update = {
      $set: {
        passcode: req.body["passcode"],
        lastUpdated: (new Date()).toUTCString(),
        scheduleA: req.body["scheduleA"],
        scheduleB: req.body["scheduleB"],
        scheduleC: req.body["scheduleC"],
      }
    }
    const options = { upsert: true };

    const result = await collection.updateOne(filter, update, options)

    res.status(200).send("Data update success!")
  } catch (err) {
    res.status(404).send(`ERROR: something went wrong while updating data: ${err}`)
  }
})


export default router;

// module.exports = router;
