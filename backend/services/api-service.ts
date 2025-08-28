import axios from "axios";
import { fetchCourseResponse, fetchRStringsResponse, fetchGEResponse, fetchPRTreeResponse, fetchPrereqsResponse, fetchCoreqsResponse } from "./serviceTypes";

const endpoint: string = "https://anteaterapi.com/v2/graphql/"

/**
 * Given a courseId String, return a GQL JSON response containing course data.
 * @param {string} courseId  UCI Course ID (ex. COMPSCI151).
 * @returns                  Response data in JSON format.
 */
export async function fetchCourse(courseId: string): Promise<fetchCourseResponse | string> {
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
export async function fetchRStrings(courseId: string): Promise<fetchRStringsResponse | string> {
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

export async function fetchGE(courseId: string): Promise<fetchGEResponse | string> {
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

export async function fetchPRTree(courseId: string): Promise<fetchPRTreeResponse | string> {
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

export async function fetchPrereqs(courses: number[]): Promise<fetchPrereqsResponse | string> {
  if (courses.length === 0) {
    return "ERROR: No courses provided";
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
    // return response.data;
    return response;
  } catch (error) {
    return "ERROR: Requisite fetching";
  }
}

export async function fetchCoreqs(courses: number[]): Promise<fetchCoreqsResponse | string> {
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
    // return response.data;
    return response;
  } catch (error) {
    return "ERROR: Requisite fetching";
  }
}

// module.exports = {
//   fetchCourse,
//   fetchRStrings,
//   fetchGE,
//   fetchPRTree,
//   fetchPrereqs,
//   fetchCoreqs
// };
