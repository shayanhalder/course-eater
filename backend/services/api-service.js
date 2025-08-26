const axios = require("axios");

//endpoint = "https://api.peterportal.org/graphql/";
const endpoint = "https://anteaterapi.com/v2/graphql/"
/**
 * Given a courseId String, return a GQL JSON response containing course data.
 * @param {string} courseId  UCI Course ID (ex. COMPSCI151).
 * @returns                  Response data in JSON format.
 */
async function fetchCourse(courseId) {
  try {
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
    return "ERROR: Requisite fetching";
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

async function fetchPrereqs(courses) {
  let dataQuery = "";
  for (courseIndex in courses) {
    dataQuery += `
      c${courseIndex}:course(id:"${courses[courseIndex]}") {
        id
        prerequisiteTree
      }
    `
  }
  dataQuery = `query { ${dataQuery} }`
  console.log(dataQuery)
  
  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      data: {
        query: dataQuery,
      },
    });
    console.log(response)
    console.log(response.data)
    return response.data;
  } catch (error) {
    return "ERROR: Requisite fetching";
  }
}

async function fetchCoreqs(courses) {
  let dataQuery = "";
  for (courseIndex in courses) {
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
