
export interface fetchCourseResponse  {
    id: string;
    description: string;
    prerequisiteText: string;
    corequisites: string;
    restriction: string;
    maxUnits: number;
    school: string;
    department: string;
    geText: string;
}

export interface fetchRStringsResponse {
    prerequisiteText: string;
    corequisites: string;
}

export interface fetchGEResponse {
    geList: string[];
}

export interface fetchPRTreeResponse {
    prerequisiteTree: string;
}

export interface fetchPrereqsResponse {
    prerequisiteTree: string;
}

export interface fetchCoreqsResponse {
    corequisites: string;
}

export interface courseRequirement {
    "coreq": boolean,
    "courseId": string,
    "minGrade": string,
    "prereqType": string
}

export interface treeObj {
    "AND"?: (courseRequirement[] | treeObj[]); 
    "OR"?: (courseRequirement[] | treeObj[]);
}


