// This module handles all operations with tree objects.

import { treeObj, courseRequirement } from "./serviceTypes";

const convertToTree = (str: string): treeObj => {
    return JSON.parse(str);
  };
  
  const evalTree = (treeObj: treeObj | courseRequirement, coursesTaken: string[]) : boolean => {
    if (!treeObj || Object.keys(treeObj).length === 0) {
      return true;
    }
    const isAnd = "AND" in treeObj;
    const operator = isAnd ? "AND" : "OR";
  
    const reqs = treeObj[operator];
    if (!reqs) {
      return true;
    }
    // and (TRUE): if one is FALSE, return FALSE
    //  or (FALSE): if one is TRUE , return TRUE
    const reqLen = reqs.length;
    for (let i = 0; i < reqLen; i++) {
      let req = reqs[i];
  
      let reqTaken;
      if (_isCourse(req)) {
        reqTaken = _courseInList(req["courseId"], coursesTaken);
      } else {
        reqTaken = evalTree(req, coursesTaken);
      }
      if (reqTaken != isAnd) {
        return !isAnd;
      }
    }
    return isAnd;
  };
  
  function _isCourse(course: any) : boolean {
    return !("AND" in course) && !("OR" in course);
  }
  
  function _courseInList(course: string, l: string[]) : boolean {
    const listLen = l.length;
    for (let i = 0; i < listLen; i++) {
      if (_equalIgnoreSpace(course, l[i])) {
        return true;
      }
    }
    return false;
  }
  
  function _equalIgnoreSpace(input1: string, input2: string) : boolean {
    let s1 = input1.split(" ").join("");
    let s2 = input2.split(" ").join("");
    return s1 === s2;
  }
  
  module.exports = { evalTree, convertToTree };
  