
import express from 'express';
import { evalTokens, strToClauses } from "../services/requisites";
import { sentenceIsLogic } from "../services/tokenizer";

import {
  fetchRStrings,
  fetchPRTree,
  fetchPrereqs,
  fetchCoreqs,
} from "../services/api-service";

import { evalTree } from "../services/tree";
const router = express.Router();


router.post("/validate-courses", async (req, res) => {
  const courseMatrix : any = req.body["courseMatrix"];

  let pr_coords : any = [];
  let cr_coords : any = [];
  let allCourses : any = new Set();

  // Loop through each quarter
  for (let qIndex in courseMatrix) {
    let courseBufferForNextQuarter = new Set();
    let currQuarter = courseMatrix[qIndex];
    if (currQuarter.length === 0) {
      continue;
    }
    let prData = await fetchPrereqs(currQuarter);
    if (!prData) {
      continue;
    }

    // Check prerequisites for each course in quarter
    for (let cIndex in currQuarter) {
      let currCourseData = prData["data"][`c${cIndex}`];
      let currPR = currCourseData["prerequisiteTree"];


      courseBufferForNextQuarter.add(currCourseData["id"]);
      if (currPR) {
        let reqsMet = evalTree(currPR, [...allCourses]);
        if (!reqsMet) {
          pr_coords.push({ q_loc: qIndex, c_loc: cIndex }); // Add course if req hasn't been met
        }
      }
    }

    for (let item of courseBufferForNextQuarter) {
      allCourses.add(item);
    }
    // After adding the courses in the buffer to the list of all courses,
    // use that allCourse set to check whether the corequisites have been met.
    // This is because corequisites are valid whether they are being taken
    // currently or they have been taken previously.
    
    let crData = await fetchCoreqs(currQuarter);
    if (!crData) {
      continue;
    }
    for (let cIndex in currQuarter) {
      let currCourseData = crData["data"][`c${cIndex}`];
      let currCR = currCourseData["corequisites"];

      if (currCR) {
        let reqsMet = evalTokens(currCR, [...allCourses]);
        let currCoord = { q_loc: qIndex, c_loc: cIndex };
        
        if (!reqsMet) {
          cr_coords.push(currCoord); // Add course if req hasn't been met
        }

      }
    }
    courseBufferForNextQuarter.clear();
  }

  res.json({
    missing_prereqs: pr_coords,
    missing_coreqs: cr_coords
  });
});

export default router;