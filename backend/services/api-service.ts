// const axios = require("axios");
import axios from "axios";

//endpoint = "https://api.peterportal.org/graphql/";
const endpoint: string = "https://anteaterapi.com/v2/graphql/"
/**
 * Given a courseId String, return a GQL JSON response containing course data.
 * @param {string} courseId  UCI Course ID (ex. COMPSCI151).
 * @returns                  Response data in JSON format.
 */
export async function fetchCourse(courseId) {
  try {
    // console.log("Fetching course: ", courseId);
    const response = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: `
        query {
          course(id:"${courseId}") {
              id
              description
              prerequisiteText
              corequisites
              restriction
              maxUnits
              school
              department
              geText
          }
      }    
          `,
      },
    });
    // console.log(response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error while fetching course information: ", error);
    return `ERROR while fetching course information: ${error}`;
  }
}

/**
 * Given a courseId String, return a GQL JSON response containing course data.
 * @param {string} courseId
 * @returns
 */
async function fetchRStrings(courseId) {
  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: `
            query {
              course(id:"${courseId}") {
                  prerequisiteText
                  corequisites
              }
            }    
          `,
      },
    });
    return response.data;
  } catch (error) {
    return "ERROR: Requisite fetching";
  }
}

async function fetchGE(courseId) {
  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: `
            query {
              course(id:"${courseId}") {
                  geList
              }
            }    
          `,
      },
    });
    return response.data;
  } catch (error) {
    return "ERROR: Requisite fetching";
  }
}

async function fetchPRTree(courseId) {
  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: `
            query {
              course(id:"${courseId}") {
                  prerequisiteTree
              }
            }    
          `,
      },
    });
    return response.data;
  } catch (error) {
    return "ERROR: Requisite fetching";
  }
}

async function fetchPrereqs(courses: number[]) {
  if (courses.length === 0) {
    return null;
  }
  let dataQuery = "";
  for (let courseIndex in courses) {
    dataQuery += `
      c${courseIndex}:course(id:"${courses[courseIndex]}") {
        id
        prerequisiteTree
      }
    `
  }
  dataQuery = `query { ${dataQuery} }`
  // console.log(dataQuery)
  
  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: dataQuery,
      },
    });
    // console.log(response)
    // console.log(response.data)
    return response.data;
  } catch (error) {
    return "ERROR: Requisite fetching";
  }
}

async function fetchCoreqs(courses: number[]) {
  let dataQuery = "";
  for (let courseIndex in courses) {
    dataQuery += `
      c${courseIndex}:course(id:"${courses[courseIndex]}") {
        id
        corequisites
      }
    `
  }
  dataQuery = `query { ${dataQuery} }`
  
  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: dataQuery,
      },
    });
    return response.data;
  } catch (error) {
    return "ERROR: Requisite fetching";
  }
}

module.exports = {
  fetchCourse,
  fetchRStrings,
  fetchGE,
  fetchPRTree,
  fetchPrereqs,
  fetchCoreqs
};
