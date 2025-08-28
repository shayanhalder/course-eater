// const express = require('express');
import express from 'express';
const router = express.Router();

import { fetchCourse } from '../services/api-service.ts';

// Middleware specific to endpoints
router.get('/course', async (req, res) => {
    try {
        let courseId = req.query.courseId;
        const courses = await fetchCourse(courseId);
        res.json(courses);
    } catch (err) {
        console.log(err)
    }
    
});

// TODO: add endpoints

export default router;

// module.exports = router;