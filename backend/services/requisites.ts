import { toTokens, isSyntax } from "./tokenizer";
import { Symbols } from "./symbols";

/**
 * Separates string into sentences.
 * @param {string} str Input string to split.
 * @returns            Array of sentences.
 */
export const strToClauses = (str: string) : string[] => {
  if (!str) {
    return [];
  }
  const trimmed = str.trim();
  const regex = /(?<!\b(Ph\.D|M\.S|B\.S))\. (?!\d)/;
  const clauses = trimmed.split(regex);
  const cLen = clauses.length;
  for (let i = 0; i < cLen; i++) {
    if (typeof clauses[i] === "undefined") {
      clauses.splice(i, 1);
    }
  }
  return clauses;
};

/**
 * Returns true if the given courses meet the requisites given in the string.
 * @param {string} rStr    Requisite string.
 * @param {*} coursesTaken Array of courses taken.
 * @returns                Whether courses meet the requisites
 */
export const evalTokens = (rStr: string, coursesTaken: string[]) : boolean => {
  let currToken: string;
  let taken: boolean;
  let rTokens: any[] = toTokens(_padParens(rStr));
  let rLen: number = rTokens.length;

  for (let i = 0; i < rLen; i++) {
    currToken = rTokens[i];
    if (!isSyntax(currToken)) {
      taken = coursesTaken.some((course) => {
        return _equalIgnoreCaseSpace(currToken, course);
      });
      rTokens[i] = taken;
    } else if (currToken === Symbols.OR) {
      rTokens[i] = "||";
    } else if (currToken === Symbols.AND) {
      rTokens[i] = "&&";
    }
  }
  let boolStr = rTokens.join(" ");
  return eval(boolStr);
};

/**
 * Pad string with spaces wherever there are parentheses
 * @param {*} str String to pad parentheses.
 * @returns       Padded string.
 */
function _padParens(str: string) : string {
  let result = str;
  const sLen = str.length;
  for (let i = 0; i < sLen; i++) {
    // account for (
    if (str[i] == "(" && str[i + 1] != " ") {
      result = result.slice(0, i + 1) + " " + result.slice(i + 1);
    }
    // account for )
    if (str[i] == ")" && str[i - 1] != " ") {
      result = result.slice(0, i + 1) + " " + result.slice(i + 1);
    }
  }
  return result;
}

/**
 * Returns true if two strings are equal. Case insensitive and white space insensitive.
 * @param {string} input1 String 1.
 * @param {string} input2 String 2.
 * @returns               Equivalence of input1 and input2.
 */
function _equalIgnoreCaseSpace(input1: string, input2: string) : boolean {
  let s1 = input1.replace(/\s+/g, "");
  let s2 = input2.replace(/\s+/g, "");
  return s1.toLowerCase() === s2.toLowerCase();
}

// module.exports = { evalTokens, strToClauses };
