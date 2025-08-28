// const express = require("express");
import express from 'express';

const router = express.Router();

import { fetchGE } from "../services/api-service.ts";

router.get("/ge-met", async (req, res) => {
  const ge = await fetchGE("COMPSCI151");
  console.log(ge);
  res.json({
    message: "hello",
    ge1l: 0,
    ge1u: 0,
    ge2: 0,
    ge3: 0,
    ge4: 0,
    ge5a: 0,
    ge5b: 0,
    ge6: 0,
    ge7: 0,
    ge8: 0,
  });
});

export default router;

// module.exports = router;
